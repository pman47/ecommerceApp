import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FC, useState } from "react";
import { View, Text } from "react-native";
import StarRating from "react-native-star-rating-widget";
import CartButton from "../components/CartButton";
import GoBackButton from "../components/GoBackButton";
import { ManropeText } from "../components/StyledText";
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
      <ProductDetails product={_product} />
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

const ProductDetails = ({ product }: { product: Product }) => {
  return (
    <View
      style={{
        paddingHorizontal: 30,
      }}
    >
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            opacity: 0.8,
          }}
        >
          {product.title}
        </Text>
        {product?.brand && (
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            {product.brand}
          </Text>
        )}
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <StarRating
          rating={product.rating}
          onChange={() => {}}
          starSize={25}
          style={{
            padding: 0,
            margin: 0,
            marginLeft: -10,
          }}
        />
        <ManropeText style={{ fontSize: 20, opacity: 0.5 }}>
          {Math.floor(Math.random() * 100)} Reviews
        </ManropeText>
      </View>
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
