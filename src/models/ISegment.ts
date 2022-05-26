export interface ISegment {
  airline: {
    caption: string;
  };
  arrivalAirport: {
    uid: string;
    caption: string;
  };
  arrivalCity: {
    caption: string;
  };
  arrivalDate: string;
  departureAirport: {
    uid: string;
    caption: string;
  };
  departureCity: {
    caption: string;
  };
  departureDate: string;
  transfer?: number;
}
