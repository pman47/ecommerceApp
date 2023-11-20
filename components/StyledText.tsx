import Colors from "../constants/Colors";
import { Text, TextProps } from "./Themed";

export function ManropeText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[{ fontFamily: "Manrope", color: Colors.textColor }, props.style]}
    />
  );
}
