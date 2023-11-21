import { FC } from "react";
import { ShoppingBag, ShoppingBasket } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";

interface CartButtonProps {
  variant?: "light" | "dark";
}

const CartButton: FC<CartButtonProps> = ({ variant = "light" }) => {
  const navigation: any = useNavigation();
  const navigateToCartScreen = () => {
    navigation.navigate("CartScreen");
  };
  return (
    <TouchableOpacity
      onPress={() => navigateToCartScreen()}
      style={{
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ShoppingBag
        size={25}
        color={variant === "light" ? "white" : Colors.black100}
      />
    </TouchableOpacity>
  );
};

export default CartButton;
