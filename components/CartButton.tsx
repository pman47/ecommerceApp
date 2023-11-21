import { FC } from "react";
import { ShoppingBag, ShoppingBasket } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface CartButtonProps {}

const CartButton: FC<CartButtonProps> = ({}) => {
  const navigation: any = useNavigation();
  const navigateToCartScreen = () => {
    console.log("HELLO");
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
      <ShoppingBag size={25} color="white" />
    </TouchableOpacity>
  );
};

export default CartButton;
