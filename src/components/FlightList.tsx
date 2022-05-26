import React from "react";
import { useAppSelector } from "../hooks/redux";
import { IFlight } from "../models/IFlight";
import FlightItem from "./FlightItem";
import Loader from "./Loader";

export const FlightList = () => {
  const { flights, isLoading, error } = useAppSelector(
    (state) => state.flightReducer
  );

  console.log(flights);
  return (
    <ul className='flight-list'>
      {isLoading ? (
        <Loader />
      ) : (
        flights
          .slice(0, 10)
          .map((flight: IFlight, index: number) => (
            <FlightItem
              key={index + flight.flightToken.slice(0, 10)}
              flight={flight}
            />
          ))
      )}
      {error && error}
    </ul>
  );
};
