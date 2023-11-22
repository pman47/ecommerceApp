import { FC, useContext } from "react";
import { ScrollView } from "react-native";
import { ApplicationContext } from "../../ApplicationContext";
import CartItem from "./CartItem";

interface CartItemsProps {}

const CartItems: FC<CartItemsProps> = ({}) => {
  const { productsInCart } = useContext(ApplicationContext);

  const productIds = Object.keys(productsInCart);

  return (
    <ScrollView style={{ flex: 1 }}>
      {productIds.map((productId) => {
        return (
          <CartItem
            productDetails={productsInCart[productId]}
            key={productId}
          />
        );
      })}
    </ScrollView>
  );
};

export default CartItems;
