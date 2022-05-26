import { IBestPrices } from "./IBestPrices";
import { IFlight } from "./IFlight";

export interface IFlightResult {
  result: {
    bestPrices: IBestPrices;
    flights: IFlight[];
  };
}
