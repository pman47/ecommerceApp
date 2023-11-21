import { View, Image } from "react-native";
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApplicationContext } from "../../ApplicationContext";
import Colors from "../../constants/Colors";
import { ManropeText } from "../StyledText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Plus } from "lucide-react-native";

interface ProductItemProps {
  product: Product;
  index: number;
}

const MARGIN_VALUE = 5;

const ProductItem: FC<ProductItemProps> = ({ product, index }) => {
  const { addProductToCart } = useContext(ApplicationContext);
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

  return (
    <View
      style={{
        ...extraStyle,
        flex: 0.5,
        backgroundColor: Colors.background,
        padding: 15,
        borderRadius: 15,
        gap: 10,
      }}
    >
      {/* IMAGE */}
      <Image
        source={{ uri: product.thumbnail, cache: "only-if-cached" }}
        resizeMode={"cover"}
        style={{
          width: "100%",
          aspectRatio: 3 / 2,
          borderRadius: 10,
          backgroundColor: Colors.black20,
        }}
      />

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
