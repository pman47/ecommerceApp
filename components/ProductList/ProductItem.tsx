import { useNavigation } from "@react-navigation/native";
import { Heart, Plus } from "lucide-react-native";
import { FC, useContext, useMemo } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ApplicationContext } from "../../ApplicationContext";
import Colors from "../../constants/Colors";
import Image from "../Image";
import { ManropeText } from "../StyledText";

interface ProductItemProps {
  product: Product;
  index: number;
}

const MARGIN_VALUE = 5;

const ProductItem: FC<ProductItemProps> = ({ product, index }) => {
  const { addProductToCart } = useContext(ApplicationContext);
  const navigation: any = useNavigation();
  const extraStyle = useMemo(() => {
    const value = index % 2;
    if (value) {
      return {
        marginLeft: MARGIN_VALUE,
      };
    }
    return { marginRight: MARGIN_VALUE };
  }, [index % 2]);

  const handleAddToCart = () => {
    addProductToCart(product);
  };

  const navigateToProductDetails = () => {
    navigation.navigate("ProductDetailsScreen", {
      product: product,
    });
  };

  return (
    <View
      style={{
        ...extraStyle,
        flex: 0.5,
        backgroundColor: Colors.background,
        padding: 15,
        borderRadius: 15,
        gap: 10,
        position: "relative",
      }}
    >
      {/* Favourite Icon  */}
      <View
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 10,
        }}
      >
        <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            backgroundColor: Colors.black1,
            justifyContent: "center",
            alignItems: "center",
            borderBottomEndRadius: 25,
          }}
        >
          <Heart size={20} fill={Colors.heartColor} color={Colors.heartColor} />
        </TouchableOpacity>
      </View>

      {/* IMAGE */}
      <TouchableOpacity onPress={navigateToProductDetails}>
        <Image
          source={{ uri: product.thumbnail, cache: "only-if-cached" }}
          resizeMode={"cover"}
        />
      </TouchableOpacity>

      {/* PRODUCT DETAILS */}
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ManropeText style={{ fontWeight: "bold", fontSize: 16 }}>
            ${product.price}
          </ManropeText>
          <TouchableOpacity
            style={{
              height: 30,
              width: 30,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.primary,
              borderRadius: 15,
            }}
            onPress={handleAddToCart}
          >
            <Plus size={15} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <ManropeText
          style={{
            opacity: 0.6,
            fontSize: 14,
          }}
        >
          {product.title}
        </ManropeText>
      </View>
    </View>
  );
};

export default ProductItem;
