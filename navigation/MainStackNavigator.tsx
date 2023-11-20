import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { ApplicationContext, IApplicationContext } from "../ApplicationContext";
import CartScreen from "../screens/CartScreen";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";

const MainStackNavigator = () => {
  const MainStack = createStackNavigator();

  const [_productsList, _setProductsList] = useState<any[]>([]);
  const [_cart, _setCart] = useState<any>({});

  return (
    <ApplicationContext.Provider value={getAppContext()}>
      <MainStack.Navigator>
        <MainStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="ProductDetailsScreen"
          component={ProductDetailsScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </ApplicationContext.Provider>
  );

  function getAppContext(): IApplicationContext {
    return {
      productsList: _productsList,
      setProductsList: (products: any[]) => {
        _setProductsList(products);
      },
      productsInCart: _cart,
      addProductToCart: (product) => {
        const productId = product?.id;
        if (!productId) return;
        const updatedCart = { ..._cart };
        updatedCart[productId].product = product;
        updatedCart[productId].quantity =
          parseInt(updatedCart[productId]?.quantity || "0") + 1;
        _setCart(updatedCart);
      },
      removeProductFromCart: (product) => {
        const productId = product?.id;
        if (!productId) return;
        const updatedCart = { ..._cart };
        if (updatedCart[productId].quantity <= 1) {
          delete updatedCart[productId];
        } else {
          updatedCart[productId].quantity =
            parseInt(updatedCart[productId]?.quantity || "1") - 1;
        }
        _setCart(updatedCart);
      },
    };
  }
};

export default MainStackNavigator;
