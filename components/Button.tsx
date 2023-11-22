import { FC, useState } from "react";
import { Pressable as CustomPressable, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { ManropeText } from "./StyledText";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: "filled" | "outlined";
  disabled?: boolean;
}

const CustomButton: FC<CustomButtonProps> = (props) => {
  let { title, onPress, variant, disabled } = props;
  if (!variant) variant = "filled";

  const [pressed, setPressed] = useState<boolean>(false);

  return (
    <CustomPressable
      style={[
        styles.button,
        variant === "filled" ? styles.filled : styles.outlined,
        { opacity: pressed || disabled ? 0.5 : 1 },
      ]}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
    >
      <ManropeText
        style={[
          styles.text,
          variant === "filled" ? styles.textFilled : styles.textOutlined,
        ]}
      >
        {title}
      </ManropeText>
    </CustomPressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderRadius: 20,
    flex: 1,
  },
  filled: {
    backgroundColor: Colors.primary,
  },
  outlined: {
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  textFilled: {
    color: Colors.white,
  },
  textOutlined: {
    color: Colors.primary,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
