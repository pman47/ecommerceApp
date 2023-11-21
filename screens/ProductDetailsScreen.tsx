import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FC, useState } from "react";
import { View } from "react-native";
import CartButton from "../components/CartButton";
import GoBackButton from "../components/GoBackButton";
import Colors from "../constants/Colors";

const ProductDetailsScreen: FC<ProductDetailsScreenProps> = ({ route }) => {
  const [_product] = useState(route.params.product);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      <Header />
    </View>
  );
};

const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
      }}
    >
      <GoBackButton />
      <CartButton variant="dark" />
    </View>
  );
};

export default ProductDetailsScreen;

type ProductDetailsScreenRouteProp = RouteProp<
  MainStackParamList,
  "ProductDetailsScreen"
>;

type GetStartedNavigationProp = StackNavigationProp<
  MainStackParamList,
  "ProductDetailsScreen"
>;

type ProductDetailsScreenProps = {
  navigation: GetStartedNavigationProp;
  route: ProductDetailsScreenRouteProp;
};
