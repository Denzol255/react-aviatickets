import React from "react";
import { formatCurrency } from "../functions/formatCurrency";
import { getUniqueCompanies } from "../functions/getUniqueCompanies";
import { useAppSelector } from "../hooks/redux";

const Filters = () => {
  const { bestPrices } = useAppSelector((state) => state.flightReducer);

  console.log(bestPrices);

  const uniqueCompanies = getUniqueCompanies(bestPrices);

  return (
    <div className='filters'>
      <div className='filters__filter filter filter-sort'>
        <h3 className='filter-sort__header filter__header filter-header'>
          Сортировать
        </h3>
        <form>
          <div className='filter-sort__radio'>
            <label>
              <input type='radio' /> - по возрастанию цены
            </label>
          </div>
          <div className='filter-sort__radio'>
            <label>
              <input type='radio' /> - по убыванию цены
            </label>
          </div>
          <div className='filter-sort__radio'>
            <label>
              <input type='radio' /> - по времение в пути
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
              <input type='checkbox' /> - 1 пересадка
            </label>
          </div>
          <div className='filter-transfer__checkbox'>
            <label>
              <input type='checkbox' /> - без пересадок
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
