import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Colors from "../constants/Colors";
import Image from "./Image";

const { width: screenWidth } = Dimensions.get("window");

export interface CarouselItem {
  id: string;
  imageUrl: string;
}

interface CarouselProps {
  data: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener(event: any) {
        const offsetX = event?.nativeEvent?.contentOffset?.x;
        const index = Math.round(offsetX / screenWidth);
        setActiveIndex(index);
      },
    }
  );

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {data.map((item) => (
          <View key={item.id} style={styles.carouselItem}>
            <Image
              source={{ uri: item.imageUrl }}
              resizeMode={"contain"}
              style={{
                width: "100%",
                aspectRatio: 16 / 9,
              }}
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.paginationContainer}>
        {data.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.paginationDot,
              {
                backgroundColor:
                  activeIndex === index ? "#F9B023" : Colors.black60,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -20,
    paddingStart: 15,
  },
  paginationDot: {
    paddingStart: 20,
    width: 20,
    height: 4,
    marginHorizontal: 5,
    backgroundColor: "#F9B023",
  },
});

export default Carousel;
