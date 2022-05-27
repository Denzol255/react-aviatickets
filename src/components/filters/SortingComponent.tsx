import { useAppDispatch } from "../../hooks/redux";
import { changeSortingType } from "../../store/reducers/FilterSlice";

const SortingComponent = () => {
  const dispatch = useAppDispatch();

  const sortingValues = [
    {
      value: "increasePrice",
      name: "по возрастанию цены",
    },
    {
      value: "decreasePrice",
      name: "по убыванию цены",
    },
    {
      value: "travelTime",
      name: "по времение в пути",
    },
  ];

  return (
    <div className='filters__filter filter filter-sort'>
      <h3 className='filter-sort__header filter__header filter-header'>
        Сортировать
      </h3>
      <form>
        {sortingValues.map((sort, index) => {
          return (
            <div key={index} className='filter-sort__radio'>
              <label>
                <input
                  type='radio'
                  id={`sort-${index.toString()}`}
                  name='sort'
                  value={sort.value}
                  onChange={(e) => dispatch(changeSortingType(e.target.value))}
                />{" "}
                - {sort.name}
              </label>
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default SortingComponent;
