import { IBestFlight } from "./IBestFlight";

export interface IBestPrices {
  DIRECT: {
    bestFlights: IBestFlight[];
  };
  ONE_CONNECTION: {
    bestFlights: IBestFlight[];
  };
}
