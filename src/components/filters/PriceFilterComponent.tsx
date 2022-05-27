import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  changePriceFrom,
  changePriceTo,
} from "../../store/reducers/FilterSlice";

const PriceFilterComponent = () => {
  const { priceFilter } = useAppSelector((state) => state.filterReducer);
  const dispatch = useAppDispatch();

  return (
    <div className='filters__filter filter filter-price'>
      <h3 className='filter-price__header filter__header filter-header'>
        Цена
      </h3>
      <form>
        <div className='filter-price__input'>
          <label>
            От
            <input
              type='input'
              value={priceFilter.from}
              placeholder='от'
              onChange={(e) => {
                dispatch(changePriceFrom(+e.target.value.replace(/\D/g, "")));
              }}
            />
          </label>
        </div>
        <div className='filter-price__input'>
          <label>
            До
            <input
              type='input'
              value={priceFilter.to}
              placeholder='до '
              onChange={(e) => {
                dispatch(changePriceTo(+e.target.value.replace(/\D/g, "")));
              }}
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default PriceFilterComponent;
