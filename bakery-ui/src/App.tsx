import { useEffect, useState } from 'react';
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
    <section id="center" className="flex grow flex-col items-center gap-5 px-5 py-8">
      <h1>Bakery Cart</h1>

      <div className="flex items-center gap-2.5">
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
          className="rounded-md border border-(--border) bg-(--bg) px-2.5 py-1.5 text-(--text-h) [font:inherit]"
        />
      </div>

      <div className="flex w-full max-w-225 flex-wrap justify-center gap-6">
        <div className="flex-[1_1_360px] rounded-lg border border-(--border) px-5 py-4 text-left">
          <h2>Products</h2>
          <ProductPicker products={products} onAdd={handleAdd} />
        </div>

        <div className="flex-[1_1_360px] rounded-lg border border-(--border) px-5 py-4 text-left">
          <h2>Cart</h2>
          <CartList
            items={cartItems}
            products={products}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleCalculate}
          disabled={cartItems.length === 0}
          className="cursor-pointer rounded-md border-2 border-transparent bg-(--accent-bg) px-6 py-2.5 text-base text-(--accent) transition-colors [font:inherit] hover:border-(--accent-border) disabled:cursor-not-allowed disabled:opacity-50"
        >
          Calculate
        </button>
        {total !== null && <span className="text-xl font-semibold text-(--text-h)">Total: ${total.toFixed(2)}</span>}
      </div>
    </section>
  );
};

export default App;
