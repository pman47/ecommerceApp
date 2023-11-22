import { Minus, Plus } from "lucide-react-native";
import { FC, useContext, useMemo } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { ApplicationContext } from "../ApplicationContext";
import CustomButton from "../components/Button";
import GoBackButton from "../components/GoBackButton";
import Image from "../components/Image";
import { ManropeText } from "../components/StyledText";
import Colors from "../constants/Colors";

interface CartScreenProps {}

const CartScreen: FC<CartScreenProps> = ({}) => {
  return (
    <View style={{ backgroundColor: Colors.white, flex: 1 }}>
      <Header />
      <CartItems />
      <Checkout />
    </View>
  );
};

const Checkout = () => {
  const { productsInCart } = useContext(ApplicationContext);

  const data: any = useMemo(() => {
    const allProductsIds = Object.keys(productsInCart);
    let amount = 0;
    allProductsIds.forEach((productId) => {
      const { product, quantity } = productsInCart[productId];
      const actualPrice = product.price;
      const discount = actualPrice * (product.discountPercentage / 100);
      const discountedPrice = actualPrice - discount;
      amount += discountedPrice * parseInt(quantity);
    });
    const SubTotal = parseFloat(amount.toString()).toFixed(2).toString();
    const Delivery = 2;
    const Total = (parseInt(SubTotal) + Delivery).toString();
    return {
      Subtotal: SubTotal,
      Delivery: Delivery,
      Total: Total,
    };
  }, [productsInCart]);

  const productsAvailableInCart = useMemo(
    () => Object.keys(productsInCart).length > 0,
    [productsInCart]
  );

  return (
    <View
      style={{
        backgroundColor: Colors.black1,
        margin: 15,
        padding: 15,
        borderRadius: 40,
      }}
    >
      <View
        style={{
          paddingHorizontal: 30,
        }}
      >
        {Object.keys(data).map((title: string) => {
          const value = data[title];
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 5,
              }}
            >
              <ManropeText style={{ color: Colors.black60 }}>
                {title}
              </ManropeText>
              <ManropeText
                style={{
                  fontSize: 16,
                }}
              >
                ${value}
              </ManropeText>
            </View>
          );
        })}
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
        }}
      >
        <CustomButton
          title={"Proceed  To checkout"}
          onPress={() => {}}
          variant="filled"
          disabled={!productsAvailableInCart}
        />
      </View>
    </View>
  );
};

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
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        marginHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.black10,
      }}
    >
      {/* Product Details */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        {/* Image */}
        <Image
          source={{ uri: productDetails.product.thumbnail }}
          style={{ width: 60, aspectRatio: 1 / 1 }}
        />

        {/* Product Name and Price */}
        <View style={{ gap: 2 }}>
          <ManropeText style={{ fontSize: 20, color: Colors.black90 }}>
            {productDetails.product.title}
          </ManropeText>
          <ManropeText style={{ color: Colors.black60 }}>
            ${productDetails.product.price}
          </ManropeText>
        </View>
      </View>

      {/* Quantity */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
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

const RoundIcon = ({ onPress, icon }: any) => {
  return (
    <TouchableOpacity
      style={{
        height: 50,
        width: 50,
        backgroundColor: Colors.black10,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      {icon}
    </TouchableOpacity>
  );
};

const CartItems = () => {
  const { productsInCart } = useContext(ApplicationContext);

  const productIds = Object.keys(productsInCart);

  return (
    <ScrollView style={{ flex: 1 }}>
      {productIds.map((productId) => {
        return (
          <CartItem
            productDetails={productsInCart[productId]}
            key={productId}
          />
        );
      })}
    </ScrollView>
  );
};

const Header = () => {
  const { productsInCart } = useContext(ApplicationContext);

  const count = useMemo(() => {
    return Object.keys(productsInCart).length;
  }, [productsInCart]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        gap: 20,
      }}
    >
      <GoBackButton />
      <ManropeText style={{ fontSize: 22 }}>
        Shopping Cart ({count})
      </ManropeText>
    </View>
  );
};

export default CartScreen;
