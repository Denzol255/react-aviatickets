// Функция форматирования цены и показа знака рубля
export const formatCurrency = (value: number): string =>
  value.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  });
