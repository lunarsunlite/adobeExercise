import { useState } from 'react';
import type { Product } from '../pricing/types';

interface ProductPickerProps {
  products: Product[]
  onAdd: (productId: number, quantity: number) => void
}

const bulkPricingLabel = (product: Product): string | null => {
  if (!product.bulkPricing) return null;
  return `${product.bulkPricing.amount} for $${product.bulkPricing.totalPrice.toFixed(2)}`;
};

export const ProductPicker = ({ products, onAdd }: ProductPickerProps) => {
  const [quantities, setQuantities] = useState<Record<number, string>>({});

  const rawQuantityFor = (productId: number) => quantities[productId] ?? '1';
  const quantityFor = (productId: number) => Math.max(1, Number(quantities[productId]) || 1);

  return (
    <ul className="product-picker">
      {products.map((product) => {
        const bulkLabel = bulkPricingLabel(product);
        return (
          <li key={product.id} className="product-row">
            <div className="product-info">
              <span className="product-name">{product.name}</span>
              <span className="product-price">
                ${product.price.toFixed(2)} each
                {bulkLabel ? ` • ${bulkLabel}` : ''}
              </span>
            </div>
            <input
              type="number"
              min={1}
              value={rawQuantityFor(product.id)}
              onChange={(e) =>
                setQuantities((prev) => ({
                  ...prev,
                  [product.id]: e.target.value,
                }))
              }
              onBlur={() =>
                setQuantities((prev) => ({
                  ...prev,
                  [product.id]: String(quantityFor(product.id)),
                }))
              }
              aria-label={`Quantity of ${product.name}`}
            />
            <button type="button" onClick={() => onAdd(product.id, quantityFor(product.id))}>
              Add to cart
            </button>
          </li>
        );
      })}
    </ul>
  );
};
