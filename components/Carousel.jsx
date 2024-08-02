// Carousel.js
import React from "react";
import { View, Dimensions, Animated, Platform, StyleSheet } from "react-native";
import PollCard from "./PollCard";
import { useAuth } from "../contexts/AuthContext";

const { width, height } = Dimensions.get("window");
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.87 : width * 0.9;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const Carousel = ({ polls, scrollX, getPosts, navigation }) => {
  const { user } = useAuth();
  return (
    <View style={{ ...styles.container, backgroundColor: "green" }}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={polls}
        onEndReached={getPosts}
        onEndReachedThreshold={0}
        keyExtractor={(item) => item.key}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === "ios" ? 0 : 0.88}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ justifyContent: "flex-start" }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.author) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [60, 30, 60],
            extrapolate: "clamp",
          });

          return <PollCard item={item} translateY={translateY} user={user} navigation={navigation}/>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Carousel;
