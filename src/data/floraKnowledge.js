/**
 * Flora's offline/fallback knowledge base — used for the room-based
 * recommendation menu (always) and for free-text symptom diagnosis
 * only when the AI backend (backend/) is unreachable.
 * Plant/flower names below must match a `name` field in plantsData.js
 * so Flora can link a recommendation straight to its product page.
 */

export const SPACES = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office / Desk'];
export const LIGHT_LEVELS = ['Low light', 'Medium light', 'Bright light'];

// space -> light level -> recommended item names
export const roomRecommendations = {
  'Living Room': {
    'Low light': ['ZZ Plant', 'Pothos', 'Cast Iron Plant'],
    'Medium light': ['Peace Lily', 'Philodendron', 'Calathea'],
    'Bright light': ['Areca Palm', 'Rubber Plant', 'Hibiscus'],
  },
  Bedroom: {
    'Low light': ['Snake Plant', 'ZZ Plant', 'Pothos'],
    'Medium light': ['Peace Lily', 'Dracaena'],
    'Bright light': ['Orchid', 'Aloe Vera'],
  },
  Kitchen: {
    'Low light': ['Pothos', 'Philodendron'],
    'Medium light': ['Mint', 'Lemon Balm'],
    'Bright light': ['Basil', 'Rosemary', 'Lavender'],
  },
  Bathroom: {
    'Low light': ['Pothos', 'ZZ Plant'],
    'Medium light': ['Calathea', 'Boston Fern'],
    'Bright light': ['Boston Fern', 'Areca Palm'],
  },
  'Office / Desk': {
    'Low light': ['Zebra Haworthia', 'Pothos', 'ZZ Plant'],
    'Medium light': ['Echeveria', 'Jade Plant'],
    'Bright light': ['Echeveria', 'Kalanchoe'],
  },
};

// Symptom-based diagnosis. `keywords` are used for free-text matching.
export const symptomDiagnoses = [
  {
    id: 'yellow-leaves',
    label: 'Yellow leaves',
    keywords: ['yellow', 'yellowing', 'pale leaves'],
    advice:
      "Yellow leaves are most often a sign of overwatering. Let the soil dry out between waterings and make sure the pot has drainage holes. If it's only the older, lower leaves turning yellow, that's usually just natural aging — nothing to worry about.",
  },
  {
    id: 'brown-tips',
    label: 'Brown or crispy leaf tips',
    keywords: ['brown', 'crispy', 'crisp tips', 'dry tips'],
    advice:
      "Brown, crispy tips usually point to low humidity, underwatering, or a buildup of salts from tap water or fertilizer. Try watering more consistently, misting occasionally, or flushing the soil with distilled water every couple of months.",
  },
  {
    id: 'drooping',
    label: 'Drooping or wilting',
    keywords: ['droop', 'wilt', 'limp', 'falling over', 'sagging'],
    advice:
      "Drooping can mean both too little AND too much water. Check the soil — if it's bone dry, water thoroughly; if it's soggy, let it dry out and confirm the pot actually drains, since root rot from overwatering is a common cause.",
  },
  {
    id: 'leaf-drop',
    label: 'Leaves falling off',
    keywords: ['falling off', 'dropping leaves', 'leaf drop', 'losing leaves'],
    advice:
      "Sudden leaf drop is often a stress response to a recent move, temperature change, draft, or big shift in light. Keep conditions stable for a few weeks and avoid relocating the plant — most recover once settled.",
  },
  {
    id: 'no-growth',
    label: 'Slow or no growth',
    keywords: ['not growing', 'no growth', 'slow growth', 'stunted'],
    advice:
      "Little to no growth is normal in fall and winter when plants naturally slow down. If it's the growing season, check the plant is getting enough light and consider feeding with a diluted liquid fertilizer every 2–4 weeks.",
  },
  {
    id: 'pests',
    label: 'Visible pests or webbing',
    keywords: ['bug', 'pest', 'insect', 'webbing', 'mites', 'gnats'],
    advice:
      "Common culprits are spider mites, mealybugs, or fungus gnats. Wipe leaves with a damp cloth, isolate the plant from others, and treat weekly with a neem oil spray for 2–3 weeks. Letting the topsoil dry out between waterings also helps against gnats.",
  },
  {
    id: 'mold',
    label: 'Mold or white spots on soil',
    keywords: ['mold', 'mould', 'white spots', 'fungus', 'fuzzy soil'],
    advice:
      "White fuzzy patches on soil are usually harmless surface mold from excess moisture and poor airflow. Scrape off the top layer, let the soil dry out more between waterings, and keep the plant somewhere with better air circulation.",
  },
];

// Easiest, most forgiving items to recommend for beginners.
export const easyCarePlants = [
  'Snake Plant',
  'ZZ Plant',
  'Pothos',
  'Cast Iron Plant',
  'Aloe Vera',
  'Zebra Haworthia',
];
