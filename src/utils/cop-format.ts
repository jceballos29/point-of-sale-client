const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
});

export const formatCurrency = (value: number) => currencyFormatter.format(value);