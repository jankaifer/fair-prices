type Flavoured<T, F> = T & { __flavour?: F };
type Branded<T, B> = T & { __brand: B };

type Store = "billa";
type Currency = "CZK" | "EUR";
type Price = {
  amount: number;
  currency: Currency;
};
type QuantityUnit = "piece" | "portion" | "kg" | "l" | "m";
type Quantity = {
  amount: number;
  unit: QuantityUnit;
};
type IsoDate = Flavoured<string, "Date">;
type ItemId<T extends Store> = Flavoured<string, `ItemId<${T}>`>;
// type StoreSpecificDataByStore = {
//   billa: {};
// };
type Item<T extends Store = Store> = {
  store: T;
  id: ItemId<T>;
  name: string;
  description?: string;
  url: string;
  imageUrl: string;
  price: Price;
  quantity: Quantity;
  //   storeSpecificData: StoreSpecificDataByStore[T];
};

type StoreIntegration<T extends Store> = {
  store: T;
  getAllItems: () => Promise<Item<T>[]>;
};
