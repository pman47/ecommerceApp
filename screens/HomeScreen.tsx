import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Search } from "lucide-react-native";
import { FC, useContext } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { ApplicationContext } from "../ApplicationContext";
import CartButton from "../components/CartButton";
import { ManropeText } from "../components/StyledText";
import Colors from "../constants/Colors";
import FontFamily from "../constants/FontFamily";

interface HomeScreenProps {}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }: any) => {
  const { productsList } = useContext(ApplicationContext);

  return (
    <View>
      <View
        style={{
          backgroundColor: Colors.primary,
          paddingVertical: 20,
          paddingHorizontal: 20,
          marginBottom: 20,
          gap: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ManropeText style={{ fontSize: 25, color: Colors.background }}>
            Hey, Manish
          </ManropeText>
          <CartButton />
        </View>
        <View
          style={{
            marginTop: 20,
            marginBottom: 10,
            backgroundColor: Colors.primaryBlue,
            borderRadius: 50,
            paddingHorizontal: 30,
            paddingVertical: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <Search size={20} color={Colors.white} />
          <TextInput
            style={{
              fontSize: 17,
              color: Colors.white,
              flex: 1,
              fontFamily: FontFamily.Manrope,
            }}
            placeholderTextColor={"rgba(255,255,255,0.5)"}
            placeholder={"Search Products or store"}
          />
        </View>
      </View>
      <Button
        title="Buy Now"
        onPress={() => {
          navigation.navigate("ProductDetailsScreen");
        }}
      />
      <Button
        onPress={() => {
          navigation.navigate("CartScreen");
        }}
        title="Add To Cart"
      />
    </View>
  );
};

export default HomeScreen;
