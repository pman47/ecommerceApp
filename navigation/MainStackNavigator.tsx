import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { ApplicationContext, IApplicationContext } from "../ApplicationContext";
import CartScreen from "../screens/CartScreen";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";

const MainStackNavigator = () => {
  const MainStack = createStackNavigator();

  const [productsList, setProductsList] = useState<any[]>([]);

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
      productsList: productsList,
      setProductsList: (products: any[]) => {
        setProductsList(products);
      },
    };
  }
};

export default MainStackNavigator;
