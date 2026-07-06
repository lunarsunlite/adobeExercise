import type { CartItem, Product } from '../pricing/types';

interface CartListProps {
  items: CartItem[]
  products: Product[]
  onQuantityChange: (productId: number, quantity: number) => void
  onRemove: (productId: number) => void
}

export const CartList = ({ items, products, onQuantityChange, onRemove }: CartListProps) => {
  if (items.length === 0) {
    return <p className="text-(--text)">Your cart is empty.</p>;
  }

  return (
    <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
      {items.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return (
          <li key={item.productId} className="flex items-center gap-2.5">
            <span className="grow font-medium text-(--text-h)">{product.name}</span>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => onQuantityChange(item.productId, Math.max(1, Number(e.target.value) || 1))}
              aria-label={`Quantity of ${product.name} in cart`}
              className="w-14 rounded-md border border-(--border) bg-(--bg) px-1.5 py-1 text-(--text-h) [font:inherit]"
            />
            <button
              type="button"
              onClick={() => onRemove(item.productId)}
              className="cursor-pointer rounded-md border border-(--border) bg-transparent px-3.5 py-1.5 text-(--text) transition-colors [font:inherit] hover:border-(--accent-border)"
            >
              Remove
            </button>
          </li>
        );
      })}
    </ul>
  );
};
