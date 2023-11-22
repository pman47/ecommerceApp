import { FC, useContext, useMemo } from "react";
import { View } from "react-native";
import { ApplicationContext } from "../../ApplicationContext";
import Colors from "../../constants/Colors";
import CustomButton from "../Button";
import { ManropeText } from "../StyledText";

interface CheckoutProps {}

const Checkout: FC<CheckoutProps> = ({}) => {
  const { productsInCart } = useContext(ApplicationContext);

  // Calculating subTotal and total amount
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
              key={title}
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

export default Checkout;
