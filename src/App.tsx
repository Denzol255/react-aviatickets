import { useEffect } from "react";
import Filters from "./components/filters/Filters";
import { FlightList } from "./components/FlightList";
import { useAppDispatch } from "./hooks/redux";
import { fetchFlights } from "./store/reducers/ActionCreators";
import "./style/App.scss";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFlights());
  }, []);

  return (
    <div className='app'>
      <div className='main'>
        <Filters />
        <FlightList />
      </div>
    </div>
  );
}

export default App;
