import React from "react";

export const ApplicationContext = React.createContext<IApplicationContext>(
  undefined as any as IApplicationContext
);

export interface IApplicationContext {
  // Products
  productsList: Product[];
  setProductsList: (products: Product[]) => void;

  // CartItems
  productsInCart: any;
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (product: Product) => void;

  // Favourite Items
  favouriteProducts: number[];
  addProductToFavourite: (product: Product) => void;
  removeProductFromFavourite: (product: Product) => void;
  isFavouriteProduct: (productId: number) => boolean;
}
