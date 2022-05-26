import { useEffect } from "react";
import "./style/App.scss";
import { FlightList } from "./components/FlightList";
import { useAppDispatch } from "./hooks/redux";
import { fetchFlights } from "./store/reducers/ActionCreators";
import Filters from "./components/Filters";

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
