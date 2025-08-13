// Utility functions for number formatting in Arabic

/**
 * Formats price in Saudi Riyal with English numerals
 * @param price - The price to format
 * @returns Formatted price string
 */
export function formatPrice(price: number): string {
  return price.toLocaleString('ar-SA');
}

/**
 * Formats price with currency symbol
 * @param price - The price to format
 * @param currency - The currency symbol (default: 'ريال')
 * @returns Formatted price with currency
 */
export function formatPriceWithCurrency(price: number, currency: string = 'ريال'): string {
  const formattedPrice = formatPrice(price);
  return `${formattedPrice} ${currency}`;
}

/**
 * Formats large numbers with English numerals
 * @param num - The number to format
 * @returns Formatted number string
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('ar-SA');
}
