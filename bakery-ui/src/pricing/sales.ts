import type { PackOption } from './calculateTotal';

export interface SaleRule {
  name: string
  appliesTo: (productName: string) => boolean
  isActive: (date: Date) => boolean
  /** Extra pack option(s) this sale makes available, given the product's normal unit price. */
  packOptions: (unitPrice: number) => PackOption[]
}

const DAY_FRIDAY = 5;
const DAY_TUESDAY = 2;

const isDayOfWeek = (date: Date, day: number): boolean => {
  return date.getDay() === day;
};

const isOctoberFirst = (date: Date): boolean => {
  return date.getMonth() === 9 && date.getDate() === 1;
};

export const saleRules: SaleRule[] = [
  {
    name: 'Friday cookie bundle',
    appliesTo: (name) => name === 'Cookie',
    isActive: (date) => isDayOfWeek(date, DAY_FRIDAY),
    packOptions: () => [{ amount: 8, price: 6.0 }],
  },
  {
    name: 'October 1st cheesecake discount',
    appliesTo: (name) => name === 'Key Lime Cheesecake',
    isActive: isOctoberFirst,
    packOptions: (unitPrice) => [{ amount: 1, price: unitPrice * 0.75 }],
  },
  {
    name: 'Tuesday donut BOGO',
    appliesTo: (name) => name === 'Mini Gingerbread Donut',
    isActive: (date) => isDayOfWeek(date, DAY_TUESDAY),
    packOptions: (unitPrice) => [{ amount: 2, price: unitPrice }],
  },
];
