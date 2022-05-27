import CompanyFilterComponent from "./CompanyFilterComponent";
import PriceFilterComponent from "./PriceFilterComponent";
import SortingComponent from "./SortingComponent";
import TransferFilterComponent from "./TransferFilterComponent";

const Filters = () => {
  return (
    <div className='filters'>
      <SortingComponent />
      <TransferFilterComponent />
      <PriceFilterComponent />
      <CompanyFilterComponent />
    </div>
  );
};

export default Filters;
