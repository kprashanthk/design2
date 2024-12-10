export type RODataType = {
  roNumber: string;
  pendingQuantity: string;
  commodity: string;
  variety: string;
  token: string;
  flags?: {[key: string]: boolean};
  transactionType: string;
  truckNumber: string;
  maxBagsForTruck?: string;
  cropYear?: string;
  stack?: string;
  shed?: string;
  bagType?: string;
  bags?: string;
  tareWeight?: string;
};

export type Option = {
  title: string;
  value: string;
};
