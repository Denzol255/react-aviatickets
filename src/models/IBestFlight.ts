export interface IBestFlight {
  carrier: ICarrier;
  price: IPrice;
}

export interface ICarrier {
  uid: string;
  caption: string;
  airlineCode: string;
}

export interface IPrice {
  amount: string;
  currency: string;
  currencyCode: string;
}
