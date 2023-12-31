import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ApiClient } from "../../api/ApiClient";
import { ApplicationContext } from "../../ApplicationContext";
import { ManropeText } from "../StyledText";
import ProductItem from "./ProductItem";

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

  const LoadProducts = () => {
    if (isLoading) {
      return (
        <ManropeText
          style={{
            textAlign: "center",
            fontSize: 20,
            marginTop: 50,
          }}
        >
          Loading ...
        </ManropeText>
      );
    }
    return (
      <FlatList
        data={productsList}
        renderItem={({ item, index }) => (
          <ProductItem product={item} index={index} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ItemSeparatorComponent={memoizedItemSeparatorComponent}
      />
    );
  };

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
      <LoadProducts />
    </View>
  );
};

export default ProductList;
