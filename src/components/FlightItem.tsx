import { FC } from "react";
import { formatCurrency } from "../functions/formatCurrency";
import { IFlight } from "../models/IFlight";
import LegItem from "./LegItem";

interface FlightItemProps {
  flight: IFlight;
}

const FlightItem: FC<FlightItemProps> = ({ flight }) => {
  const carrier =
    flight.flight.carrier.uid + " " + flight.flight.carrier.caption;
  const price = +flight.flight.price.total.amount;
  const legs = flight.flight.legs;

  return (
    <li className='flight-item'>
      <div className='flight-item__head'>
        <h2 className='flight-item__company'>{carrier}</h2>
        <div className='flight-item__info'>
          <span className='flight-item__price'>{formatCurrency(price)}</span>
          <p className='flight-item__adult'>
            Стоимость для одного взрослого пассажира
          </p>
        </div>
      </div>
      <ul className='flight-item__legs'>
        {legs.map((leg, index) => (
          <LegItem key={index} leg={leg} index={index} />
        ))}
        <button className='flight-item__choose'>Выбрать</button>
      </ul>
    </li>
  );
};

export default FlightItem;
