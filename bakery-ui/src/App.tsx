import { useEffect, useState } from 'react';
import './App.css';
import { ProductPicker } from './components/ProductPicker';
import { CartList } from './components/CartList';
import { calculateTotal } from './pricing/calculateTotal';
import type { CartItem, Product } from './pricing/types';
import productsData from './data/products-data.json';

const products = productsData.treats as Product[];
const CART_STORAGE_KEY = 'bakery-cart-items';

// If user had previously added items in the cart,
// load them from localStorage so they persist across page reloads.
const loadStoredCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const todayISO = (): string => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
};

const parseDateInput = (value: string): Date => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const App = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(loadStoredCart);
  const [date, setDate] = useState(todayISO());
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAdd = (productId: number, quantity: number) => {
    setTotal(null);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    setTotal(null);
    setCartItems((prev) => prev.map((item) => (item.productId === productId ? { ...item, quantity } : item)));
  };

  const handleRemove = (productId: number) => {
    setTotal(null);
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const handleCalculate = () => {
    setTotal(calculateTotal(parseDateInput(date), cartItems, products));
  };

  return (
    <section id="center">
      <h1>Bakery Cart</h1>

      <div className="date-picker">
        <label htmlFor="cart-date">Date</label>
        <input
          id="cart-date"
          type="date"
          value={date}
          // min={todayISO()} // Left a comment in notes.md as to why I commented this out. 
          onChange={(e) => {
            if (e.target.value < todayISO()) return;
            setDate(e.target.value);
            setTotal(null);
          }}
        />
      </div>

      <div className="cart-app">
        <div className="panel">
          <h2>Products</h2>
          <ProductPicker products={products} onAdd={handleAdd} />
        </div>

        <div className="panel">
          <h2>Cart</h2>
          <CartList
            items={cartItems}
            products={products}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />
        </div>
      </div>

      <div className="calculate-row">
        <button type="button" className="calculate-button" onClick={handleCalculate} disabled={cartItems.length === 0}>
          Calculate
        </button>
        {total !== null && <span className="total">Total: ${total.toFixed(2)}</span>}
      </div>
    </section>
  );
};

export default App;
