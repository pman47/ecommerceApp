import React from "react";

export const ApplicationContext = React.createContext<IApplicationContext>(
  undefined as any as IApplicationContext
);

export interface IApplicationContext {
  productsList: any[];
  setProductsList: (products: Product[]) => void;

  productsInCart: any;
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (product: Product) => void;
}
