export const formatToUSDCurrency = (
  number: number,
  currency: string = 'USD'
) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(number);
};
