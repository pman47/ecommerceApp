import { Heart } from "lucide-react-native";
import { FC, useContext, useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { ApplicationContext } from "../ApplicationContext";
import Colors from "../constants/Colors";

interface FavouriteIconButtonProps {
  product: Product;
}

const FavouriteIconButton: FC<FavouriteIconButtonProps> = ({ product }) => {
  const {
    addProductToCart,
    productsInCart,
    isFavouriteProduct,
    addProductToFavourite,
    removeProductFromFavourite,
    favouriteProducts,
  } = useContext(ApplicationContext);

  const isCurrentProductFavourite = useMemo(
    () => isFavouriteProduct(product.id),
    [favouriteProducts]
  );

  const handleFavouriteButtonPress = () => {
    if (isCurrentProductFavourite) {
      removeProductFromFavourite(product);
    } else {
      addProductToFavourite(product);
    }
  };
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={handleFavouriteButtonPress}
    >
      {isCurrentProductFavourite ? (
        <Heart size={20} fill={Colors.heartColor} color={Colors.heartColor} />
      ) : (
        <Heart size={20} color={Colors.black90} />
      )}
    </TouchableOpacity>
  );
};

export default FavouriteIconButton;
