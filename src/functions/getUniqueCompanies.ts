import { IBestFlight } from "../models/IBestFlight";
import { IBestPrices } from "../models/IBestPrices";

// Функция получения уникальных компаний из bestPrices
export const getUniqueCompanies = (bestPrices: IBestPrices): IBestFlight[] => {
  // Сортируем по убыванию цены все компании
  const allCompanies = [
    ...bestPrices.ONE_CONNECTION.bestFlights,
    ...bestPrices.DIRECT.bestFlights,
  ].sort((a, b) => +b.price.amount - +a.price.amount);

  // Получаем уникальные компании с наименьшей ценой за билет
  const unioueCompanies = Array.from(
    new Map(
      allCompanies.map((bestFlight) => [bestFlight.carrier.caption, bestFlight])
    ).values()
  );

  return unioueCompanies;
};
