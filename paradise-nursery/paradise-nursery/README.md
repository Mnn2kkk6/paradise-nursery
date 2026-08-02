# Paradise Nursery

Paradise Nursery is a React + Redux single-page e-commerce application for an
online houseplant shop. It includes a landing page, an "About Us" section, a
product listing page organized by category, and a fully functional shopping
cart built with Redux Toolkit.

## Project Name

**Paradise Nursery** — "Where Green Meets Serenity"

## Features

- **Landing page** with the company name, tagline, background image, and a
  "Get Started" button that leads to the product listing.
- **About Us** section with details about the company.
- **Product listing page** showing houseplants grouped into categories
  (Air Purifying Plants, Aromatic Plants, Succulents & Cacti), each with a
  thumbnail, name, price, and an "Add to Cart" button.
- **Navbar** with links to Home, Plants, and Cart, plus a live cart item
  count.
- **Shopping cart page** showing each item's thumbnail, name, unit price,
  quantity controls, subtotal, a delete button, the total cart amount, a
  "Continue Shopping" button, and a "Checkout" button (shows "Coming Soon").
- **Redux Toolkit** cart slice managing add, increment, decrement, and
  remove actions.

## Tech Stack

- React (Vite)
- Redux Toolkit + React-Redux
- CSS

## Getting Started

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal (typically
`http://localhost:5173`).

## Project Structure

```
src/
├── App.jsx                 # Landing page + view routing
├── App.css                 # Landing page styles (incl. background image)
├── main.jsx                # App entry point, wraps App in Redux Provider
├── components/
│   ├── AboutUs.jsx         # Company details modal
│   ├── ProductList.jsx     # Product listing page
│   ├── ProductList.css
│   ├── CartItem.jsx        # Shopping cart page
│   └── CartItem.css
├── redux/
│   ├── CartSlice.jsx       # Redux slice for the shopping cart
│   └── store.jsx           # Redux store configuration
└── data/
    └── plantsData.js       # Plant catalog data
```
