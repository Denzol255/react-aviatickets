import { ILeg } from "./ILeg";

export interface IFlight {
  flight: {
    carrier: {
      uid: string;
      caption: string;
    };
    legs: ILeg[];
    price: {
      total: {
        amount: string;
        currency: string;
        currencyCode: string;
      };
    };
  };
  flightToken: string;
}
