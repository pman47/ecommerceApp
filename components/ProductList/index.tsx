import { FC, useState, useCallback, useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { ApiClient } from "../../api/ApiClient";
import { ApplicationContext } from "../../ApplicationContext";

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

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text>Hello</Text>
    </View>
  );
};

export default ProductList;
