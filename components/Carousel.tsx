import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  PanResponder,
  Animated,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

interface CarouselItem {
  id: number;
  title: string;
}

const data: CarouselItem[] = [
  { id: 1, title: "Item 1" },
  { id: 2, title: "Item 2" },
  { id: 3, title: "Item 3" },
  { id: 4, title: "Item 4" },
  // Add more items as needed
];

const Carousel: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollOffset = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handlePanResponderMove = (_: any, gestureState: { dx: number }) => {
    scrollOffset.setValue(gestureState.dx);
  };

  const handlePanResponderRelease = (_: any, gestureState: { dx: number }) => {
    if (gestureState.dx > 50 && activeIndex > 0) {
      scrollViewRef.current?.scrollTo({
        x: screenWidth * (activeIndex - 1),
        animated: true,
      });
      setActiveIndex(activeIndex - 1);
    } else if (gestureState.dx < -50 && activeIndex < data.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: screenWidth * (activeIndex + 1),
        animated: true,
      });
      setActiveIndex(activeIndex + 1);
    } else {
      scrollViewRef.current?.scrollTo({
        x: screenWidth * activeIndex,
        animated: true,
      });
    }

    scrollOffset.setValue(0);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: handlePanResponderMove,
      onPanResponderRelease: handlePanResponderRelease,
    })
  ).current;

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        {...panResponder.panHandlers}
      >
        {data.map((item, index) => (
          <View key={item.id} style={styles.carouselItem}>
            <Text style={styles.carouselText}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.paginationContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              { opacity: activeIndex === index ? 1 : 0.4 },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselItem: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  carouselText: {
    fontSize: 18,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    backgroundColor: "black",
  },
});

export default Carousel;
