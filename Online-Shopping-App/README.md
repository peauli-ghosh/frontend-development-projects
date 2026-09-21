# Online Shopping App

A responsive e-commerce web application built with React and Vite, featuring product browsing, search, filtering, wishlist management, cart operations, checkout, order history and persistent application state.

## Features

- Responsive e-commerce interface
- Product catalog
- Product search
- Category filtering
- Brand filtering
- Product sorting
- Product detail pages
- Add to cart
- Quantity management
- Remove items from cart
- Wishlist
- Recently viewed products
- Coupon discount
- GST calculation
- Grand total calculation
- Checkout flow
- Editable delivery address
- Order history
- Order cancellation
- Dark mode
- Persistent state using `localStorage`
- Responsive desktop, tablet and mobile layouts
- React Router navigation
- Subject-specific product imagery

## Tech Stack

- React
- Vite
- JavaScript (ES6+)
- React Router
- React Context API
- `useReducer`
- `useMemo`
- Lucide React
- CSS
- Browser `localStorage`

## Project Structure

```text
Online-Shopping-App/
├── src/
│   ├── assets/
│   │   └── hero-shopping.png
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── ProductCard.jsx
│   │   ├── SectionTitle.jsx
│   │   └── Toast.jsx
│   ├── context/
│   │   └── ShopContext.jsx
│   ├── data/
│   │   └── products.js
│   ├── pages/
│   │   ├── BrandsPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CatalogPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── Home.jsx
│   │   ├── OrdersPage.jsx
│   │   ├── ProductPage.jsx
│   │   └── WishlistPage.jsx
│   ├── utils/
│   │   └── productImage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── package-lock.json
├── vercel.json
└── README.md
````

## Main Pages

### Home

The home page provides the main shopping experience with featured products, categories, promotional content and shopping inspiration.

### Catalog

The catalog provides product browsing with search, category, brand and sorting functionality.

### Product Details

Individual product pages display product information, pricing, ratings, delivery information and shopping actions.

### Cart

Users can review products, change quantities, remove items and view subtotal, discounts, GST and the final total.

### Checkout

The checkout page provides delivery information and order confirmation before placing an order.

### Orders

The orders page displays placed orders, ordered products, totals and cancellation options.

### Wishlist

Users can save products to their wishlist and return to them later.

### Brands

The brands page provides brand-based product discovery.

## State Management

The application uses the React Context API and `useReducer()` to manage shared shopping state.

The application manages:

* Cart
* Wishlist
* Recently viewed products
* Orders
* Checkout information
* Application preferences

Important application state is persisted using browser `localStorage`.

## Responsive Design

The interface is designed for:

* Desktop
* Laptop
* Tablet
* Mobile

The layout and components adapt to different screen sizes using responsive CSS.

## Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Deployment

The project is configured for deployment on Vercel.

The included `vercel.json` handles the required SPA routing configuration for React Router.

## Assignment Requirements

This project was developed as an Online Shopping Cart / E-Commerce application using React and Vite.

Core requirements implemented include:

* Product list
* Add to cart
* Remove item
* Quantity update
* Grand total
* Percentage coupon discount
* GST calculation
* React hooks
* Context API
* Shared application state
* Responsive user interface

## Author

**Peauli Ghosh**

BCA (Hons.)
Techno India University, Kolkata

You may also see the unrelated Weather Dashboard changes. **Leave those alone.**

---
