import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useFlights } from "../hooks/useFlights";
import { IFlight } from "../models/IFlight";
import { changeFlightsLimit } from "../store/reducers/FlightSlice";
import FlightItem from "./FlightItem";
import Loader from "./Loader";

export const FlightList = () => {
  // State для перелетов
  const { flights, isLoading, error, flightsLimit } = useAppSelector(
    (state) => state.flightReducer
  );
  // State для фильтров
  const { sorting, transferFilterOptions, priceFilter, companyFilter } =
    useAppSelector((state) => state.filterReducer);
  const dispatch = useAppDispatch();
  // Получение отсортированного и отфильтрованного списка перелетов
  const sortedAndFilteredFlights = useFlights(
    flights,
    sorting.type,
    transferFilterOptions,
    priceFilter.from,
    priceFilter.to,
    companyFilter
  );
  // Функция изменение количества отображаемых перелетов
  const handleLoadData = (): void => {
    dispatch(changeFlightsLimit(5));
  };
  // Функция скрытия кнопки Показать больше при отображении всех перелетов
  const getShowButtonClasses = () =>
    `flights__show-more ${
      sortedAndFilteredFlights.length <= flightsLimit ? "nothing-more" : ""
    }`;

  return (
    <div className='flights'>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='flights__wrapper'>
          {sortedAndFilteredFlights.length ? (
            <ul className='flights__flight-list flight-list'>
              {sortedAndFilteredFlights
                .slice(0, flightsLimit)
                .map((flight: IFlight, index: number) => (
                  <FlightItem
                    key={index + flight.flightToken.slice(0, 10)}
                    flight={flight}
                  />
                ))}
              <button
                className={getShowButtonClasses()}
                onClick={handleLoadData}>
                Показать еще
              </button>
            </ul>
          ) : (
            <p className='flights__empty'>
              Перелёты по вашему запросу отсутствуют
            </p>
          )}
        </div>
      )}
      {error && error}
    </div>
  );
};
