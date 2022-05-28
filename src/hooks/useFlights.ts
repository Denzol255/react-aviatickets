import { useMemo } from "react";
import { IFlight } from "../models/IFlight";

// Получение отсортированного и отфильтрованного по цене и компаниям списка перелетов
export const useSortedAndFilteredByPriceAndCompanyFlights = (
  flights: IFlight[],
  sorting: string,
  filterPriceFrom: number,
  filterPriceTo: number,
  companyFilter: Array<string>
) => {
  const sortedFlights = useMemo((): IFlight[] => {
    if (sorting) {
      if (sorting === "increasePrice") {
        return [...flights].sort(
          (a, b) => +a.flight.price.total.amount - +b.flight.price.total.amount
        );
      } else if (sorting === "decreasePrice") {
        return [...flights].sort(
          (a, b) => +b.flight.price.total.amount - +a.flight.price.total.amount
        );
      } else {
        return [...flights].sort((a, b) => {
          return (
            a.flight.legs.reduce((acc, cur) => acc + +cur.duration, 0) -
            b.flight.legs.reduce((acc, cur) => acc + +cur.duration, 0)
          );
        });
      }
    }
    return flights;
  }, [sorting, flights]);

  const sortedAndFilteredFlightsByPriceAndCompany = useMemo(
    (): IFlight[] =>
      sortedFlights
        .filter(
          (flight) =>
            filterPriceFrom <= +flight.flight.price.total.amount &&
            +flight.flight.price.total.amount <= filterPriceTo
        )
        .filter((flight) => {
          if (companyFilter.length) {
            return companyFilter.includes(flight.flight.carrier.caption);
          } else {
            return true;
          }
        }),
    [filterPriceFrom, companyFilter, filterPriceTo, sortedFlights]
  );
  return sortedAndFilteredFlightsByPriceAndCompany;
};

// Получение конечного списка перелетов, отфильтрованного по количеству пересадок для дальнейшего вывода на страницу
export const useFlights = (
  flights: IFlight[],
  sorting: string,
  filterTransfer: Array<boolean>,
  filterPriceFrom: number,
  filterPriceTo: number,
  companyFilter: Array<string>
) => {
  const sortedAndFilteredFlightsByPriceAndCompany =
    useSortedAndFilteredByPriceAndCompanyFlights(
      flights,
      sorting,
      filterPriceFrom,
      filterPriceTo,
      companyFilter
    );
  const sortedAndFiltered = useMemo((): IFlight[] => {
    if (filterTransfer[1]) {
      return sortedAndFilteredFlightsByPriceAndCompany.filter(
        (flight) =>
          flight.flight.legs[0].segments.length === 1 &&
          flight.flight.legs[1].segments.length === 1
      );
    } else if (!filterTransfer[1] && filterTransfer[0]) {
      return sortedAndFilteredFlightsByPriceAndCompany.filter(
        (flight) =>
          (flight.flight.legs[0].segments.length === 1 &&
            flight.flight.legs[1].segments.length === 2) ||
          (flight.flight.legs[0].segments.length === 2 &&
            flight.flight.legs[1].segments.length === 1)
      );
    }

    return sortedAndFilteredFlightsByPriceAndCompany;
  }, [filterTransfer, sortedAndFilteredFlightsByPriceAndCompany]);

  return sortedAndFiltered;
};
