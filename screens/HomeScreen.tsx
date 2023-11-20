import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FC, useContext } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { ApplicationContext } from "../ApplicationContext";
import Colors from "../constants/Colors";

interface HomeScreenProps {}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }: any) => {
  const { productsList } = useContext(ApplicationContext);

  console.log("productsList ==>>", productsList);

  return (
    <View>
      <View
        style={{
          backgroundColor: Colors.primary,
          paddingVertical: 20,
          paddingHorizontal: 15,
          marginBottom: 20,
          gap: 20,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: Colors.white, fontSize: 25 }}>Hey, Manish</Text>
          <FontAwesome
            name="info-circle"
            size={25}
            color={"black"}
            style={{ marginRight: 15, opacity: 1 }}
          />
        </View>
        <View>
          <TextInput />
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
