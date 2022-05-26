import React from "react";
import { formatCurrency } from "../functions/formatCurrency";
import { getUniqueCompanies } from "../functions/getUniqueCompanies";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IFlight } from "../models/IFlight";
import {
  changeSortingType,
  changeTransferFiltersList,
} from "../store/reducers/FilterSlice";
import { sortFlights } from "../store/reducers/FlightSlice";

const Filters = () => {
  const { bestPrices, flights } = useAppSelector(
    (state) => state.flightReducer
  );
  const { transferFiltersList } = useAppSelector(
    (state) => state.filterReducer
  );
  const dispatch = useAppDispatch();
  const uniqueCompanies = getUniqueCompanies(bestPrices);
  const sortingValues = {
    increasePrice: {
      value: "increasePrice",
      name: "по возрастанию цены",
    },
    decreasePrice: {
      value: "decreasePrice",
      name: "по убыванию цены",
    },
    travelTime: {
      value: "travelTime",
      name: "по времение в пути",
    },
  };

  const getNewSortedList = (value: string): IFlight[] => {
    if (value === "increasePrice") {
      return [...flights].sort(
        (a, b) => +a.flight.price.total.amount - +b.flight.price.total.amount
      );
    } else if (value === "decreasePrice") {
      return [...flights].sort(
        (a, b) => +b.flight.price.total.amount - +a.flight.price.total.amount
      );
    } else if (value === "travelTime") {
      return [...flights].sort((a, b) => {
        return (
          a.flight.legs.reduce((acc, cur) => acc + +cur.duration, 0) -
          b.flight.legs.reduce((acc, cur) => acc + +cur.duration, 0)
        );
      });
    } else {
      return [...flights];
    }
  };

  const handleSortFlights = (value: string): void => {
    const newFlightList = getNewSortedList(value);
    dispatch(changeSortingType(value));
    dispatch(sortFlights(newFlightList));
  };

  const filterTransferValues = {
    direct: {
      value: "direct",
      name: "без пересадок",
    },
    oneConnection: {
      value: "oneConnection",
      name: "1 пересадка",
    },
  };

  const handleTransferFilter = (position: number): void => {
    const newTransferFiltersList = transferFiltersList.map((filter, index) =>
      index === position ? !filter : filter
    );
    dispatch(changeTransferFiltersList(newTransferFiltersList));
    console.log(newTransferFiltersList);
    // Сделать функцию для фильтрации в зависимости от количества трансферов
  };

  return (
    <div className='filters'>
      <div className='filters__filter filter filter-sort'>
        <h3 className='filter-sort__header filter__header filter-header'>
          Сортировать
        </h3>
        <form>
          <div className='filter-sort__radio'>
            <label>
              <input
                type='radio'
                name='sort'
                value={sortingValues.increasePrice.value}
                onChange={(e) => handleSortFlights(e.target.value)}
              />{" "}
              - {sortingValues.increasePrice.name}
            </label>
          </div>
          <div className='filter-sort__radio'>
            <label>
              <input
                type='radio'
                name='sort'
                value={sortingValues.decreasePrice.value}
                onChange={(e) => handleSortFlights(e.target.value)}
              />{" "}
              - {sortingValues.decreasePrice.name}
            </label>
          </div>
          <div className='filter-sort__radio'>
            <label>
              <input
                type='radio'
                name='sort'
                value={sortingValues.travelTime.value}
                onChange={(e) => handleSortFlights(e.target.value)}
              />{" "}
              - {sortingValues.travelTime.name}
            </label>
          </div>
        </form>
      </div>
      <div className='filters__filter filter filter-transfer'>
        <h3 className='filter-transfer__header filter__header filter-header'>
          Фильтровать
        </h3>
        <form>
          <div className='filter-transfer__checkbox'>
            <label>
              <input
                type='checkbox'
                value={filterTransferValues.oneConnection.value}
                checked={transferFiltersList[0]}
                onChange={() => handleTransferFilter(0)}
              />{" "}
              - {filterTransferValues.oneConnection.name}
            </label>
          </div>
          <div className='filter-transfer__checkbox'>
            <label>
              <input
                type='checkbox'
                value={filterTransferValues.direct.value}
                checked={transferFiltersList[1]}
                onChange={() => handleTransferFilter(1)}
              />{" "}
              - {filterTransferValues.direct.name}
            </label>
          </div>
        </form>
      </div>
      <div className='filters__filter filter filter-price'>
        <h3 className='filter-price__header filter__header filter-header'>
          Цена
        </h3>
        <form>
          <div className='filter-price__input'>
            <label>
              От
              <input type='input' />
            </label>
          </div>
          <div className='filter-price__input'>
            <label>
              До
              <input type='input' />
            </label>
          </div>
        </form>
      </div>
      <div className='filters__filter filter filter-companies'>
        <h3 className='filter-companies__header filter__header filter-header'>
          Авиакомпании
        </h3>
        <form>
          {uniqueCompanies.map((company) => (
            <div key={company.carrier.caption}>
              <label>
                <input type='checkbox' /> - {company.carrier.caption} от{" "}
                {formatCurrency(Number(company.price.amount))}
              </label>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default Filters;
