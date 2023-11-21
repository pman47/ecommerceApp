import { FC } from "react";
import { Image as DefaultImage, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

interface ExtraProps {}

export type ImageProps = ExtraProps & DefaultImage["props"];

const Image: FC<ImageProps> = (props) => {
  const { style: defaultStyles, ...rest } = props;
  return <DefaultImage {...rest} style={[styles.imageStyle, defaultStyles]} />;
};

const styles = StyleSheet.create({
  imageStyle: {
    width: "100%",
    aspectRatio: 3 / 2,
    borderRadius: 10,
    backgroundColor: Colors.black20,
  },
});

export default Image;
