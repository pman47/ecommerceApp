import { Minus, Plus } from "lucide-react-native";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { ApplicationContext } from "../../ApplicationContext";
import Colors from "../../constants/Colors";
import Image from "../Image";
import RoundIcon from "../RoundIcon";
import { ManropeText } from "../StyledText";

interface CartItem {
  product: Product;
  quantity: number;
}

const CartItem = ({ productDetails }: { productDetails: CartItem }) => {
  const { addProductToCart, removeProductFromCart } =
    useContext(ApplicationContext);

  const handleAddProduct = () => {
    addProductToCart(productDetails.product);
  };
  const handleRemoveProduct = () => {
    removeProductFromCart(productDetails.product);
  };

  return (
    <View style={styles.productContainer}>
      {/* Product Details */}
      <View style={styles.productDetailsContainer}>
        {/* Image */}
        <Image
          source={{ uri: productDetails.product.thumbnail }}
          style={{ width: 60, aspectRatio: 1 / 1 }}
        />

        {/* Product Name and Price */}
        <View style={{ gap: 2 }}>
          <ManropeText style={styles.productTitle}>
            {productDetails.product.title}
          </ManropeText>
          <ManropeText style={styles.productPrice}>
            ${productDetails.product.price}
          </ManropeText>
        </View>
      </View>

      {/* Quantity */}
      <View style={styles.actionContainer}>
        <RoundIcon
          icon={<Minus size={25} color={Colors.black90} />}
          onPress={handleRemoveProduct}
        />
        <ManropeText style={{ fontSize: 18 }}>
          {productDetails.quantity}
        </ManropeText>
        <RoundIcon
          icon={<Plus size={25} color={Colors.black90} />}
          onPress={handleAddProduct}
        />
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black10,
  },
  productDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    flexWrap: "wrap",
  },
  productTitle: { fontSize: 16, color: Colors.black90, flexWrap: "wrap" },
  productPrice: { color: Colors.black60 },

  // actions
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
