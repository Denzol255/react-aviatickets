import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faClock } from "@fortawesome/free-solid-svg-icons";
import { getFullInfo } from "../functions/getFullInfoFromSegments";
import { getHoursAndMinutes } from "../functions/getHoursAndMinutes";
import { getTimeAndDate } from "../functions/getTimeAndDate";
import { ILeg } from "../models/ILeg";

interface LegItemProps {
  leg: ILeg;
  index: number;
}

const LegItem: FC<LegItemProps> = ({ leg, index }) => {
  const fullInfo = getFullInfo(leg);
  const flyDuration = getHoursAndMinutes(leg.duration);
  const [timeDeparture, dateDeparture, timeArrival, dateArrival] =
    getTimeAndDate(fullInfo);

  return (
    <li className='leg-item'>
      <div className='leg-item__route'>
        <div className='leg-item__waypoint waypoint'>
          <span className='waypoint__place'>
            {fullInfo.departureCity?.caption},{" "}
            {fullInfo.departureAirport?.caption}{" "}
          </span>
          <span className='waypoint__code'>
            ({fullInfo.departureAirport.uid})
          </span>
        </div>
        <div className='leg-item__arrow'>
          <FontAwesomeIcon icon={faArrowRightLong}></FontAwesomeIcon>
        </div>
        <div className='leg-item__waypoint'>
          <span className='waypoint__place'>
            {fullInfo.arrivalAirport.caption}{" "}
          </span>
          <span className='waypoint__code'>
            ({fullInfo.arrivalAirport.uid})
          </span>
        </div>
      </div>
      <span className='leg-item__gray-line'></span>
      <div className='leg-item__dates dates'>
        <div className='dates__wrapper'>
          <div className='dates__time'>{timeDeparture}</div>
          <div className='dates__date'>{dateDeparture}</div>
        </div>
        <div className='dates__duration'>
          <div className='dates__clock'>
            <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
          </div>
          <div className='dates__duration-time'>{flyDuration}</div>
        </div>
        <div className='dates__wrapper'>
          <div className='dates__time'>{timeArrival}</div>
          <div className='dates__date'>{dateArrival}</div>
        </div>
      </div>
      <div className='leg-item__transfer'>
        <span className='leg-item__transfer-line'></span>
        {fullInfo.transfer ? (
          <span className='leg-item__transfer-number'>
            {fullInfo.transfer} пересадка
          </span>
        ) : (
          ""
        )}
        <span className='leg-item__transfer-line'></span>
      </div>
      <p className='leg-item__company'>
        Рейс выполняет: {fullInfo.airline.caption}
      </p>
      {index !== 1 ? <span className='leg-item__blue-line'></span> : ""}
    </li>
  );
};

export default LegItem;
