import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { changeTransferFilterOptions } from "../../store/reducers/FilterSlice";

const TransferFilterComponent = () => {
  const { transferFilterOptions } = useAppSelector(
    (state) => state.filterReducer
  );
  const dispatch = useAppDispatch();
  const filterTransferValues = [
    {
      value: "oneConnection",
      name: "1 пересадка",
    },
    {
      value: "direct",
      name: "без пересадок",
    },
  ];

  const handleTransferFilter = (position: number): void => {
    const newTransferFilterOptions = transferFilterOptions.map(
      (filter, index) => (index === position ? !filter : filter)
    );
    dispatch(changeTransferFilterOptions(newTransferFilterOptions));
  };

  return (
    <div className='filters__filter filter filter-transfer'>
      <h3 className='filter-transfer__header filter__header filter-header'>
        Фильтровать
      </h3>
      <form>
        {filterTransferValues.map((filterValue, index) => (
          <div key={index} className='filter-transfer__checkbox'>
            <label>
              <input
                type='checkbox'
                id={`transfer-checkbox-${index.toString()}`}
                name='transfer-checkbox'
                value={filterValue.value}
                checked={transferFilterOptions[index]}
                onChange={() => handleTransferFilter(index)}
              />{" "}
              - {filterValue.name}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default TransferFilterComponent;
