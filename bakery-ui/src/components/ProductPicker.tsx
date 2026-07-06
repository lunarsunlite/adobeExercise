import { useState } from 'react';
import type { Product } from '../pricing/types';
import Button from './Button';

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
    <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
      {products.map((product) => {
        const bulkLabel = bulkPricingLabel(product);
        return (
          <li key={product.id} className="flex items-center gap-2.5">
            <div className="flex grow flex-col">
              <span className="font-medium text-(--text-h)">{product.name}</span>
              <span className="text-sm">
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
              className="w-14 rounded-md border border-(--border) bg-(--bg) px-1.5 py-1 text-(--text-h) [font:inherit]"
            />
            <Button onClick={() => onAdd(product.id, quantityFor(product.id))} type="primary">Add to cart</Button>
          </li>
        );
      })}
    </ul>
  );
};
