import { FC, useContext, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ApplicationContext } from "../ApplicationContext";
import CartItems from "../components/CartScreen/CartItems";
import Checkout from "../components/CartScreen/Checkout";
import GoBackButton from "../components/GoBackButton";
import { ManropeText } from "../components/StyledText";
import Colors from "../constants/Colors";

interface CartScreenProps {}

const CartScreen: FC<CartScreenProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Header />
      <CartItems />
      <Checkout />
    </View>
  );
};

const Header = () => {
  const { productsInCart } = useContext(ApplicationContext);

  const count = useMemo(() => {
    return Object.keys(productsInCart).length;
  }, [productsInCart]);

  return (
    <View style={styles.headerContainer}>
      <GoBackButton />
      <ManropeText style={{ fontSize: 22 }}>
        Shopping Cart ({count})
      </ManropeText>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.white, flex: 1 },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 20,
  },
});
