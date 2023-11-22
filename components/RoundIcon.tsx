import { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

interface RoundIconProps {
  onPress: () => void;
  icon: any;
}

const RoundIcon: FC<RoundIconProps> = ({ onPress, icon }) => {
  return (
    <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
};

export default RoundIcon;

const styles = StyleSheet.create({
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: Colors.black10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
