import { ILeg } from "../models/ILeg";
import { ISegment } from "../models/ISegment";

// Функция получения только необходимой информации о маршруте в 1 сторону
export function getFullInfo(leg: ILeg): ISegment {
  if (leg.segments.length === 1) {
    return { ...leg.segments[0], transfer: 0 };
  } else {
    return {
      ...leg.segments[0],
      arrivalCity: leg.segments[1].arrivalCity,
      arrivalAirport: leg.segments[1].arrivalAirport,
      departureAirport: leg.segments[0].departureAirport,
      departureCity: leg.segments[0].departureCity,
      arrivalDate: leg.segments[1].arrivalDate,
      departureDate: leg.segments[0].departureDate,
      transfer: 1,
    };
  }
}
