import React, { useEffect, useRef, useState } from 'react';
import storeData from '../data/plantsData';
import {
  SPACES,
  LIGHT_LEVELS,
  roomRecommendations,
  symptomDiagnoses,
  easyCarePlants,
} from '../data/floraKnowledge';
import './FloraChat.css';

const API_BASE_URL = import.meta.env.VITE_FLORA_API_URL || 'http://localhost:8000';

const LIKELIHOOD_LABEL = {
  high: 'khả năng cao / likely',
  medium: 'có thể / possible',
  low: 'ít khả năng / unlikely',
};

async function diagnoseWithAI(message, department) {
  const res = await fetch(`${API_BASE_URL}/api/flora/diagnose`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, department }),
  });
  if (!res.ok) {
    throw new Error(`Flora API error: ${res.status}`);
  }
  return res.json();
}

function findItem(name) {
  const departments = Object.keys(storeData);
  for (let d = 0; d < departments.length; d += 1) {
    const dept = departments[d];
    const categories = storeData[dept];
    for (let c = 0; c < categories.length; c += 1) {
      const found = categories[c].items.find((i) => i.name === name);
      if (found) return { item: found, department: dept };
    }
  }
  return null;
}

let messageIdCounter = 0;
function nextId() {
  messageIdCounter += 1;
  return messageIdCounter;
}

function FloraChat({ onSelectPlant }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      pushBot(
        "Hi, I'm Flora 🌸 I can help you pick plants or troubleshoot one that isn't looking its best. What would you like help with?",
        mainMenuOptions()
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  function pushBot(text, options) {
    const id = nextId();
    setMessages((prev) => [...prev, { id, sender: 'bot', text, options }]);
    return id;
  }

  function pushUser(text) {
    setMessages((prev) => [...prev, { id: nextId(), sender: 'user', text }]);
  }

  function removeMessage(id) {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }

  function goToItem(item, department) {
    if (!item) return;
    onSelectPlant(item, department);
  }

  function mainMenuOptions() {
    return [
      { label: '🌿 Recommend plants for my room', onSelect: handleRoomStart },
      { label: '🩺 Diagnose a plant problem', onSelect: handleDiagnoseStart },
      { label: '⭐ Easiest plants to care for', onSelect: handleEasyCare },
    ];
  }

  function handleRoomStart() {
    pushUser('Recommend plants for my room');
    pushBot(
      'Which space are you decorating?',
      SPACES.map((space) => ({ label: space, onSelect: () => handleSpaceChosen(space) }))
    );
  }

  function handleSpaceChosen(space) {
    pushUser(space);
    pushBot(
      'How much natural light does it get?',
      LIGHT_LEVELS.map((light) => ({ label: light, onSelect: () => handleLightChosen(space, light) }))
    );
  }

  function handleLightChosen(space, light) {
    pushUser(light);
    const names = (roomRecommendations[space] && roomRecommendations[space][light]) || [];

    if (names.length === 0) {
      pushBot(
        "I don't have a specific pick for that exact combination yet, but low-maintenance plants like Pothos or a ZZ Plant work almost anywhere."
      );
    } else {
      pushBot(
        `For a ${light.toLowerCase()} ${space.toLowerCase()}, I'd suggest:`,
        names.map((name) => {
          const found = findItem(name);
          return {
            label: name,
            onSelect: () => goToItem(found && found.item, found && found.department),
          };
        })
      );
    }
    pushBot('Anything else I can help with?', mainMenuOptions());
  }

  function handleDiagnoseStart() {
    pushUser('Diagnose a plant problem');
    pushBot(
      "What's going on with your plant? Pick the closest match, or just describe it in the message box below.",
      symptomDiagnoses.map((symptom) => ({
        label: symptom.label,
        onSelect: () => handleSymptomChosen(symptom),
      }))
    );
  }

  function handleSymptomChosen(symptom) {
    pushUser(symptom.label);
    pushBot(symptom.advice);
    pushBot('Anything else I can help with?', mainMenuOptions());
  }

  function handleEasyCare() {
    pushUser('Easiest plants to care for');
    pushBot(
      'These are some of the most forgiving, low-maintenance plants in the shop:',
      easyCarePlants.map((name) => {
        const found = findItem(name);
        return {
          label: name,
          onSelect: () => goToItem(found && found.item, found && found.department),
        };
      })
    );
    pushBot('Anything else I can help with?', mainMenuOptions());
  }

  // Offline/error fallback: the original rule-based keyword matcher.
  // Used when the AI backend is unreachable or returns something unusable.
  function fallbackKeywordMatch(text) {
    const lower = text.toLowerCase();
    const match = symptomDiagnoses.find((symptom) =>
      symptom.keywords.some((keyword) => lower.includes(keyword))
    );

    if (match) {
      pushBot(match.advice);
      pushBot('Anything else I can help with?', mainMenuOptions());
    } else {
      pushBot(
        'I couldn\'t quite match that to something I know yet. Try one of the topics below, or describe the symptom using words like "yellow", "brown tips", "drooping", "pests", or "not growing".',
        mainMenuOptions()
      );
    }
  }

  function renderDiagnosis(result) {
    const { diagnosis, care_steps: careSteps, recommended_items: recommendedItems } = result;

    if (diagnosis && diagnosis.length > 0) {
      const causesText = diagnosis
        .map((d) => `• ${d.cause}${d.likelihood ? ` — ${LIKELIHOOD_LABEL[d.likelihood] || d.likelihood}` : ''}`)
        .join('\n');
      pushBot(causesText);
    }

    if (careSteps && careSteps.length > 0) {
      pushBot(careSteps.map((s) => `• ${s}`).join('\n'));
    }

    if (recommendedItems && recommendedItems.length > 0) {
      pushBot(
        'Gợi ý cho bạn / Suggestions:',
        recommendedItems.map((rec) => {
          const found = findItem(rec.name);
          return {
            label: rec.name,
            onSelect: () => goToItem(found && found.item, (found && found.department) || rec.department),
          };
        })
      );
    }

    if (!diagnosis?.length && !careSteps?.length && !recommendedItems?.length) {
      pushBot(
        "I'm not sure I understood that. Try describing a specific symptom, or pick a topic below.",
        mainMenuOptions()
      );
      return;
    }

    pushBot('Anything else I can help with?', mainMenuOptions());
  }

  async function matchFreeText(text) {
    const typingId = pushBot('🌸 Flora đang phân tích... (thinking)');
    try {
      const result = await diagnoseWithAI(text, undefined);
      removeMessage(typingId);
      renderDiagnosis(result);
    } catch (err) {
      // API not running / network error / bad response — fall back gracefully
      removeMessage(typingId);
      fallbackKeywordMatch(text);
    }
  }

  function handleSend() {
    const text = inputValue.trim();
    if (!text) return;
    pushUser(text);
    setInputValue('');
    matchFreeText(text);
  }

  return (
    <div className="flora-widget">
      {open && (
        <div className="flora-panel" role="dialog" aria-label="Flora plant assistant chat">
          <div className="flora-header">
            <span className="flora-avatar" aria-hidden="true">🌸</span>
            <div className="flora-header-text">
              <p className="flora-name">Flora</p>
              <p className="flora-subtitle">AI plant care assistant</p>
            </div>
            <button className="flora-close" onClick={() => setOpen(false)} aria-label="Close chat">
              ×
            </button>
          </div>

          <div className="flora-messages" ref={scrollRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flora-message ${msg.sender}`}>
                <p className="flora-bubble">{msg.text}</p>
                {msg.options && msg.options.length > 0 && (
                  <div className="flora-options">
                    {msg.options.map((opt, i) => (
                      <button
                        key={`${msg.id}-${i}`}
                        className="flora-option-btn"
                        onClick={opt.onSelect}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flora-input-row">
            <input
              type="text"
              className="flora-input"
              placeholder="Describe your plant issue..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
            />
            <button
              className="flora-send-btn"
              onClick={handleSend}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
          <p className="flora-disclaimer">
            AI-assisted advice, text only — photo upload isn't supported yet.
          </p>
        </div>
      )}

      <button
        className="flora-fab"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? 'Close Flora chat' : 'Open Flora chat'}
      >
        {open ? '×' : '🌸'}
      </button>
    </div>
  );
}

export default FloraChat;
