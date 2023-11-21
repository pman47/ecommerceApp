import { Plus } from "lucide-react-native";
import {
  FC,
  useState,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { ApiClient } from "../../api/ApiClient";
import { ApplicationContext } from "../../ApplicationContext";
import Colors from "../../constants/Colors";
import { ManropeText } from "../StyledText";

const MARGIN_VALUE = 5;

interface ProductListProps {}

const ProductList: FC<ProductListProps> = ({}) => {
  const { productsList, setProductsList } = useContext(ApplicationContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");

  const clearError = () => {
    setError("");
  };

  const fetchProducts = useCallback(async () => {
    if (productsList.length > 0) return;
    clearError();
    try {
      setIsLoading(true);
      const apiClient = new ApiClient();
      const response = await apiClient.getProductsList();
      setProductsList(response?.data?.products || []);
    } catch (error: any) {
      const errorMessage =
        error?.message || "Something went wrong, please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const memoizedItemSeparatorComponent = useMemo(
    () => () => <View style={{ height: MARGIN_VALUE * 2 }} />,
    [MARGIN_VALUE]
  );

  return (
    <View
      style={{
        flex: 1,
        padding: 5,
      }}
    >
      <ManropeText
        style={{
          fontSize: 30,
          marginBottom: 10,
        }}
      >
        Products
      </ManropeText>
      <FlatList
        data={productsList}
        renderItem={({ item, index }) => (
          <ProductItem product={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ItemSeparatorComponent={memoizedItemSeparatorComponent}
      />
    </View>
  );
};

const ProductItem = (props: { product: Product; index: number }) => {
  const { productsInCart, addProductToCart } = useContext(ApplicationContext);
  const { product, index } = props;
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
    console.log("product ==>>", product);
    addProductToCart(product);
  };

  console.log("productsInCart ==>>", productsInCart);

  return (
    <View
      style={{
        ...extraStyle,
        flex: 0.5,
        backgroundColor: Colors.background,
        padding: 15,
        borderRadius: 15,
      }}
    >
      {/* IMAGE */}

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

export default ProductList;
