import { useNavigation } from "@react-navigation/native";
import { ShoppingBag } from "lucide-react-native";
import { FC, useMemo, useContext } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { ApplicationContext } from "../ApplicationContext";
import Colors from "../constants/Colors";

interface CartButtonProps {
  variant?: "light" | "dark";
}

const CartButton: FC<CartButtonProps> = ({ variant = "light" }) => {
  const { productsInCart } = useContext(ApplicationContext);
  const count = useMemo(() => {
    return Object.keys(productsInCart).length;
  }, [productsInCart]);
  const navigation: any = useNavigation();

  const navigateToCartScreen = () => {
    navigation.navigate("CartScreen");
  };

  return (
    <View style={{ position: "relative" }}>
      <TouchableOpacity
        onPress={() => navigateToCartScreen()}
        style={styles.cartIconButton}
      >
        <ShoppingBag
          size={25}
          color={variant === "light" ? "white" : Colors.black100}
        />
        <Text style={styles.countText}>{count}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  cartIconButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  countText: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#F9B023",
    color: Colors.white,
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 15,
    fontSize: 15,
  },
});
