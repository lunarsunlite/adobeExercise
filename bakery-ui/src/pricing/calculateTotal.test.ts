import { describe, expect, it } from 'vitest';
import { calculateTotal } from './calculateTotal';
import type { CartItem, Product } from './types';
import productsData from '../data/products-data.json';

const products = productsData.treats as Product[];

const BROWNIE = products.find((p) => p.name === 'Brownie')!;
const CHEESECAKE = products.find((p) => p.name === 'Key Lime Cheesecake')!;
const COOKIE = products.find((p) => p.name === 'Cookie')!;
const DONUT = products.find((p) => p.name === 'Mini Gingerbread Donut')!;

// A Wednesday with no active sales, used as the "no sales" baseline date.
const NO_SALE_DATE = new Date(2021, 8, 1); // Sept 1, 2021 (Wednesday)
const A_TUESDAY = new Date(2021, 8, 7); // Sept 7, 2021
const OCTOBER_FIRST_2021 = new Date(2021, 9, 1); // also a Friday

function cart(...items: CartItem[]): CartItem[] {
  return items;
}

describe('calculateTotal', () => {
  it('7 cookies with no sales active totals $7.25', () => {
    const total = calculateTotal(NO_SALE_DATE, cart({ productId: COOKIE.id, quantity: 7 }), products);
    expect(total).toBe(7.25);
  });

  it('1 cookie, 4 brownies, 1 cheesecake with no sales active totals $16.25', () => {
    const total = calculateTotal(
      NO_SALE_DATE,
      cart(
        { productId: COOKIE.id, quantity: 1 },
        { productId: BROWNIE.id, quantity: 4 },
        { productId: CHEESECAKE.id, quantity: 1 },
      ),
      products,
    );
    expect(total).toBe(16.25);
  });

  it('8 cookies with no sales active totals $8.50', () => {
    const total = calculateTotal(NO_SALE_DATE, cart({ productId: COOKIE.id, quantity: 8 }), products);
    expect(total).toBe(8.5);
  });

  it('1 cookie, 1 brownie, 1 cheesecake, 2 donuts with no sales active totals $12.25', () => {
    const total = calculateTotal(
      NO_SALE_DATE,
      cart(
        { productId: COOKIE.id, quantity: 1 },
        { productId: BROWNIE.id, quantity: 1 },
        { productId: CHEESECAKE.id, quantity: 1 },
        { productId: DONUT.id, quantity: 2 },
      ),
      products,
    );
    expect(total).toBe(12.25);
  });

  it('October 1st 2021: 8 cookies + 4 cheesecakes totals $30 (Friday cookie deal + cheesecake discount stack)', () => {
    const total = calculateTotal(
      OCTOBER_FIRST_2021,
      cart({ productId: COOKIE.id, quantity: 8 }, { productId: CHEESECAKE.id, quantity: 4 }),
      products,
    );
    expect(total).toBe(30);
  });

  it('on a Tuesday, 5 donuts totals $1.50', () => {
    const total = calculateTotal(A_TUESDAY, cart({ productId: DONUT.id, quantity: 5 }), products);
    expect(total).toBe(1.5);
  });

  it('Friday cookie deal only kicks in when it is cheaper (7 cookies stays at bulk price)', () => {
    const friday = new Date(2021, 8, 3); // Sept 3, 2021 is a Friday
    const total = calculateTotal(friday, cart({ productId: COOKIE.id, quantity: 7 }), products);
    // 6-for-$6 + 1 at $1.25 = $7.25, cheaper than paying $6 for a partial 8-pack.
    expect(total).toBe(7.25);
  });

  it('Friday cookie deal applies for exactly 8 cookies', () => {
    const friday = new Date(2021, 8, 3);
    const total = calculateTotal(friday, cart({ productId: COOKIE.id, quantity: 8 }), products);
    expect(total).toBe(6.0);
  });

  it('Tuesday donut BOGO handles an even quantity with no leftover', () => {
    const total = calculateTotal(A_TUESDAY, cart({ productId: DONUT.id, quantity: 4 }), products);
    expect(total).toBe(1.0);
  });

  it('cheesecake discount only applies on October 1st, not other days', () => {
    const total = calculateTotal(NO_SALE_DATE, cart({ productId: CHEESECAKE.id, quantity: 1 }), products);
    expect(total).toBe(8.0);
  });
});
