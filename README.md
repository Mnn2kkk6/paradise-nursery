# 🌿 Paradise Nursery

**Where Green Meets Serenity** — an e-commerce web app for a plant nursery, built with React, Redux Toolkit, and Vite.

## Features

* **Multi-department storefront** — Plants, Flowers, Pots, Soil & Supplies, and Decor, organized by category (30+ products across all departments).
* **Product detail pages** — each item has its own page with description, care/details info, quantity selector, and Add to Cart / Order Now actions.
* **Shopping cart** — add, increase/decrease quantity, remove items, with live total and item count in the navbar.
* **Flora 🌸 — plant care assistant** — a rule-based chatbot available on every page that:

  * Recommends plants based on room type and light level
  * Diagnoses common plant problems from a symptom list or free-text description
  * Suggests the easiest low-maintenance plants for beginners
  * Links recommendations straight to the matching product page
* **About Us modal** on the landing page.
* Botanical design system: **Fraunces** (display) + **Inter** (body) typography, custom color palette, smooth page/card transitions.

## Tech Stack

* [React 19](https://react.dev/)
* [Redux Toolkit](https://redux-toolkit.js.org/) + [react-redux](https://react-redux.js.org/) for cart state
* [Vite](https://vite.dev/) for dev server and build
* [oxlint](https://oxc.rs/) for linting

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) 18 or later

### Installation

```bash
git clone <your-repo-url>
cd paradise-nursery
npm install
```

### Development

```bash
npm run dev
```

Opens the app at `http://localhost:5173/` with hot reload.

### Build for production

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
paradise-nursery/
├── public/
│   └── # Static assets (favicon, icons)
│
├── src/
│   ├── assets/
│   │   └── # Images
│   │
│   ├── components/
│   │   ├── AboutUs.jsx
│   │   ├── CartItem.jsx
│   │   ├── FloraChat.jsx
│   │   ├── Navbar.jsx
│   │   ├── PlantDetail.jsx
│   │   └── ProductList.jsx
│   │
│   ├── data/
│   │   ├── plantsData.js
│   │   └── floraKnowledge.js
│   │
│   ├── redux/
│   │   ├── CartSlice.jsx
│   │   └── store.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
└── vite.config.js
```

### Key Directories & Files

* `src/components/` — reusable UI components and pages.
* `src/data/` — product catalog and Flora's rule-based knowledge base.
* `src/redux/` — Redux store and shopping cart state management.
* `src/assets/` — application images and other assets.
* `src/App.jsx` — view routing and top-level application state.
* `src/main.jsx` — application entry point.

## Notes

* This is a front-end-only demo project — checkout and Flora are not connected to a real backend or payment processor.
* Product images use [placehold.co](https://placehold.co) placeholders; swap them out in `src/data/plantsData.js` (see the `image` field per item) to use real photos.

## License

This project is for personal/portfolio use.
