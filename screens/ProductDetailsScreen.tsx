import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FC, useMemo, useState, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { ApplicationContext } from "../ApplicationContext";
import CustomButton from "../components/Button";
import Carousel, { CarouselItem } from "../components/Carousel";
import CartButton from "../components/CartButton";
import FavouriteIconButton from "../components/FavouriteIconButton";
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
  const { addProductToCart, productsInCart } = useContext(ApplicationContext);
  const imageArray: CarouselItem[] = product.images.map((imageUrl) => ({
    id: imageUrl,
    imageUrl,
  }));

  const { actualPrice, discount, discountedPrice } = useMemo(() => {
    const actualPrice = product.price;
    const discount = product.price * (product.discountPercentage / 100);
    const discountedPrice = product.price - discount;

    return {
      actualPrice,
      discount: parseFloat(discount.toFixed(2)).toString(),
      discountedPrice: parseFloat(discountedPrice.toFixed(2)).toString(),
    };
  }, [product.price, product.discountPercentage]);

  const isProductAvailableInCart = useMemo(() => {
    return !!productsInCart[product.id];
  }, [productsInCart]);

  const handleAddToCart = () => {
    addProductToCart(product);
  };

  const handleBuyNow = () => {
    if (!isProductAvailableInCart) {
      addProductToCart(product);
    }
    navigateToCartScreen();
  };

  const navigation: any = useNavigation();
  const navigateToCartScreen = () => {
    navigation.navigate("CartScreen");
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 30,
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
          paddingHorizontal: 30,
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
      <View style={{ marginVertical: 20 }}>
        <View
          style={{
            position: "absolute",
            top: 15,
            right: 15,
            zIndex: 10,
            height: 50,
            width: 50,
            borderRadius: 15,
            backgroundColor: Colors.black1,
          }}
        >
          <FavouriteIconButton product={product} />
        </View>
        <Carousel data={imageArray} />
      </View>

      {/* Pricing Section */}
      <View
        style={{
          paddingHorizontal: 30,
          flexDirection: "row",
          alignItems: "flex-end",
          gap: 15,
        }}
      >
        <View>
          <ManropeText
            style={{ textDecorationLine: "line-through", fontSize: 12 }}
          >
            ${actualPrice}
          </ManropeText>
          <ManropeText style={{ fontWeight: "bold", fontSize: 20 }}>
            ${discountedPrice}
          </ManropeText>
        </View>
        <ManropeText
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: Colors.primary,
            borderRadius: 15,
            color: Colors.white,
            fontSize: 16,
          }}
        >
          ${discount} OFF
        </ManropeText>
      </View>

      {/* Add To Cart And Buy Now Button */}
      <View
        style={{
          marginVertical: 20,
          gap: 8,
        }}
      >
        {isProductAvailableInCart && (
          <ManropeText style={{ textAlign: "center", color: Colors.black60 }}>
            Product is added to cart!
          </ManropeText>
        )}
        <View
          style={{
            paddingHorizontal: 30,
            flexDirection: "row",
            gap: 15,
          }}
        >
          {!isProductAvailableInCart && (
            <CustomButton
              title="Add To Cart"
              onPress={handleAddToCart}
              variant={"outlined"}
            />
          )}
          <CustomButton title="Buy now" onPress={handleBuyNow} />
        </View>
      </View>

      {/* Description */}
      <View
        style={{
          paddingHorizontal: 30,
          flex: 1,
        }}
      >
        <ManropeText style={{ fontSize: 25 }}>Details</ManropeText>
        <ScrollView
          style={{
            flex: 1,
            marginBottom: 30,
          }}
        >
          <ManropeText
            style={{
              fontSize: 18,
              color: Colors.black60,
            }}
          >
            {product.description}
          </ManropeText>
        </ScrollView>
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
