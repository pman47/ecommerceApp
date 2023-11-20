import React from "react";

export const ApplicationContext = React.createContext<IApplicationContext>(
  undefined as any as IApplicationContext
);

export interface IApplicationContext {
  productsList: any[];
  setProductsList: (lessons: any[]) => void;

  productsInCart: any;
  addProductToCart: (product: any) => void;
  removeProductFromCart: (product: any) => void;
}
