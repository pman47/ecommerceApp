import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";
import { FC } from "react";
import { TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

interface GoBackButtonProps {}

const GoBackButton: FC<GoBackButtonProps> = ({}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
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
      onPress={handleGoBack}
    >
      <ChevronLeft size={25} color={Colors.black90} />
    </TouchableOpacity>
  );
};

export default GoBackButton;
