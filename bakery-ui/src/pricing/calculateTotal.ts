import type { CartItem, Product } from './types';
import { saleRules } from './sales';

export interface PackOption {
  amount: number
  price: number
}

const getPackOptions = (product: Product, date: Date): PackOption[] => {
  const packs: PackOption[] = [{ amount: 1, price: product.price }];

  if (product.bulkPricing) {
    packs.push({ amount: product.bulkPricing.amount, price: product.bulkPricing.totalPrice });
  }

  for (const rule of saleRules) {
    if (rule.appliesTo(product.name) && rule.isActive(date)) {
      packs.push(...rule.packOptions(product.price));
    }
  }

  return packs;
};

/** Cheapest way to buy exactly `quantity` units given a set of pack sizes/prices. */
const minCost = (quantity: number, packs: PackOption[]): number => {
  const cost = new Array<number>(quantity + 1).fill(Infinity);
  cost[0] = 0;

  for (let q = 1; q <= quantity; q++) {
    for (const pack of packs) {
      if (pack.amount <= q) {
        cost[q] = Math.min(cost[q], cost[q - pack.amount] + pack.price);
      }
    }
  }

  return cost[quantity];
};

export const calculateTotal = (date: Date, cartItems: CartItem[], products: Product[]): number => {
  let total = 0;

  for (const item of cartItems) {
    if (item.quantity <= 0) continue;
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;

    const packs = getPackOptions(product, date);
    total += minCost(item.quantity, packs);
  }

  return Math.round(total * 100) / 100;
};
