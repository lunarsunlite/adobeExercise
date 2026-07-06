import type { CartItem, Product } from '../pricing/types';

interface CartListProps {
  items: CartItem[]
  products: Product[]
  onQuantityChange: (productId: number, quantity: number) => void
  onRemove: (productId: number) => void
}

export const CartList = ({ items, products, onQuantityChange, onRemove }: CartListProps) => {
  if (items.length === 0) {
    return <p className="cart-empty">Your cart is empty.</p>;
  }

  return (
    <ul className="cart-list">
      {items.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return (
          <li key={item.productId} className="cart-row">
            <span className="product-name">{product.name}</span>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => onQuantityChange(item.productId, Math.max(1, Number(e.target.value) || 1))}
              aria-label={`Quantity of ${product.name} in cart`}
            />
            <button type="button" className="remove-button" onClick={() => onRemove(item.productId)}>
              Remove
            </button>
          </li>
        );
      })}
    </ul>
  );
};
