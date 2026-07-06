# Bakery Cart

A shopping cart app for a bakery that computes totals based on unit pricing, volume/bulk
pricing, and date-based sales (a Friday cookie bundle, an October 1st cheesecake discount, and
a Tuesday donut BOGO).

## Tech stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) — dev server and build tool
- [Tailwind CSS](https://tailwindcss.com/) — styling, via the `@tailwindcss/vite` plugin
- [Vitest](https://vitest.dev/) — unit tests for the pricing engine
- [ESLint](https://eslint.org/) — linting

## Getting started

Requires [Node.js](https://nodejs.org/) 20+ and npm.

```bash
npm install
npm run dev
```

The app will be available at http://localhost:5173.

## Other scripts

```bash
npm run build   # type-check and build for production
npm run test    # run the pricing engine unit tests
npm run lint    # lint the project
npm run preview # preview a production build locally
```

## Project structure

- `src/pricing/` — the pricing engine (`calculateTotal.ts`), sale rules (`sales.ts`), and
  types. Pure TypeScript, no UI dependencies.
- `src/components/` — `ProductPicker` (add items to the cart) and `CartList` (view/edit/remove
  cart items).
- `src/data/products-data.json` — product catalog (prices and bulk pricing).
