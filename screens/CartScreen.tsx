import { FC, useContext, useMemo } from "react";
import { Text, View } from "react-native";
import { ApplicationContext } from "../ApplicationContext";
import GoBackButton from "../components/GoBackButton";
import { ManropeText } from "../components/StyledText";

interface CartScreenProps {}

const CartScreen: FC<CartScreenProps> = ({}) => {
  return (
    <View>
      <Header />
    </View>
  );
};

const Header = () => {
  const { productsInCart } = useContext(ApplicationContext);

  const count = useMemo(() => {
    return Object.keys(productsInCart).length;
  }, [productsInCart]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        gap: 20,
      }}
    >
      <GoBackButton />
      <ManropeText style={{ fontSize: 22 }}>
        Shopping Cart ({count})
      </ManropeText>
    </View>
  );
};

export default CartScreen;
