import { useNavigation } from "@react-navigation/native";
import { FC, useContext, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { ApplicationContext } from "../../ApplicationContext";
import Colors from "../../constants/Colors";
import CustomButton from "../Button";
import Carousel, { CarouselItem } from "../Carousel";
import FavouriteIconButton from "../FavouriteIconButton";
import { ManropeText } from "../StyledText";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
  const { addProductToCart, productsInCart } = useContext(ApplicationContext);
  const imageArray: CarouselItem[] = product.images.map((imageUrl) => ({
    id: imageUrl,
    imageUrl,
  }));

  const totalReviews = useMemo(
    () => Math.floor(Math.random() * 100),
    [product]
  );

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
    <View style={styles.container}>
      {/* Product name and Brand Details */}
      <View style={styles.productNameContainer}>
        <ManropeText style={styles.productName}>{product.title}</ManropeText>
        {product?.brand && (
          <ManropeText style={styles.productBrand}>{product.brand}</ManropeText>
        )}
      </View>

      {/* Star Rating */}
      <View style={styles.ratingContainer}>
        <StarRating
          rating={product.rating}
          onChange={() => {}}
          starSize={25}
          style={styles.ratingContainer}
        />
        <ManropeText style={styles.reviews}>{totalReviews} Reviews</ManropeText>
      </View>

      {/* Image Carousel */}
      <View style={styles.carouselContainer}>
        <View style={styles.favouriteIconContainer}>
          <FavouriteIconButton product={product} />
        </View>
        <Carousel data={imageArray} />
      </View>

      {/* Pricing Section */}
      <View style={styles.pricingContainer}>
        <View>
          <ManropeText style={styles.strikeThroughText}>
            ${actualPrice}
          </ManropeText>
          <ManropeText style={styles.discountedPriceText}>
            ${discountedPrice}
          </ManropeText>
        </View>
        <ManropeText style={styles.discountChip}>${discount} OFF</ManropeText>
      </View>

      {/* Add To Cart And Buy Now Button */}
      <View style={styles.actionContainer}>
        {isProductAvailableInCart && (
          <ManropeText style={{ textAlign: "center", color: Colors.black60 }}>
            Product is added to cart!
          </ManropeText>
        )}
        <View style={styles.actionButtonContainer}>
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
      <View style={styles.descriptionSection}>
        <ManropeText style={{ fontSize: 25 }}>Details</ManropeText>
        <ScrollView style={styles.descriptionScrollView}>
          <ManropeText style={styles.descriptionText}>
            {product.description}
          </ManropeText>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productNameContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  productName: {
    fontSize: 30,
    opacity: 0.8,
  },
  productBrand: {
    fontSize: 30,
    fontWeight: "bold",
  },

  // Rating
  ratingContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 30,
  },
  starRating: {
    padding: 0,
    margin: 0,
    marginLeft: -10,
  },
  reviews: { fontSize: 20, opacity: 0.5 },

  // Carousel
  carouselContainer: { marginVertical: 20 },
  favouriteIconContainer: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 10,
    height: 50,
    width: 50,
    borderRadius: 15,
    backgroundColor: Colors.black1,
  },

  // Pricing
  pricingContainer: {
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 15,
  },
  strikeThroughText: { textDecorationLine: "line-through", fontSize: 12 },
  discountedPriceText: { fontWeight: "bold", fontSize: 20 },
  discountChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    color: Colors.white,
    fontSize: 16,
  },

  // Actions
  actionContainer: {
    marginVertical: 20,
    gap: 8,
  },
  actionButtonContainer: {
    paddingHorizontal: 30,
    flexDirection: "row",
    gap: 15,
  },

  // Description
  descriptionSection: {
    paddingHorizontal: 30,
    flex: 1,
  },
  descriptionScrollView: {
    flex: 1,
    marginBottom: 30,
  },
  descriptionText: {
    fontSize: 18,
    color: Colors.black60,
  },
});
