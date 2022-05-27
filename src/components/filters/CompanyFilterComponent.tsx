import { getUniqueCompanies } from "../../functions/getUniqueCompanies";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { formatCurrency } from "../../functions/formatCurrency";
import { changeCompanyFilter } from "../../store/reducers/FilterSlice";
import { ChangeEvent } from "react";

const CompanyFilterComponent = () => {
  const { companyFilter } = useAppSelector((state) => state.filterReducer);
  const { bestPrices } = useAppSelector((state) => state.flightReducer);
  const dispatch = useAppDispatch();
  const uniqueCompanies = getUniqueCompanies(bestPrices);

  const handleCompanyFilter = (event: ChangeEvent<HTMLInputElement>): void => {
    const isChecked = event.target.checked;
    if (isChecked) {
      dispatch(changeCompanyFilter([...companyFilter, event.target.value]));
    } else {
      const index = companyFilter.indexOf(event.target.value);
      const newCompanyFilter = companyFilter.filter(
        (company, idx) => idx !== index
      );
      dispatch(changeCompanyFilter(newCompanyFilter));
    }
  };

  return (
    <div className='filters__filter filter filter-companies'>
      <h3 className='filter-companies__header filter__header filter-header'>
        Авиакомпании
      </h3>
      <form>
        {uniqueCompanies.map((company, index) => (
          <div key={index}>
            <label>
              <input
                type='checkbox'
                id={`company-checkbox-${index.toString()}`}
                name='company-checkbox'
                value={company.carrier.caption}
                onChange={handleCompanyFilter}
              />{" "}
              - {company.carrier.caption} от{" "}
              {formatCurrency(+company.price.amount)}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default CompanyFilterComponent;
