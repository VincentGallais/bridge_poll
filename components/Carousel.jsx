import * as React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  Platform,
  StyleSheet,
} from "react-native";
import Tags from "./Tags";

const { width, height } = Dimensions.get("window");
import StackedCircularAvatar from "./StackedCircularAvatar";
import AwesomeButton from "react-native-really-awesome-button";
import FeatherIcon from "react-native-vector-icons/Feather";

const SPACING = 5;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.81 : width * 0.85;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKGROUND_IMG_HEIGHT = height * 0.65;

const Carousel = ({ movies, scrollX }) => {
  return (
    <View style={{ ...styles.container, backgroundColor: "green" }}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
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
          if (!item.poster) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [40, 10, 40],
            extrapolate: "clamp",
          });

          return (
            <View style={{ width: ITEM_SIZE }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  transform: [{ translateY }],
                  backgroundColor: "white",
                  borderRadius: 34,
                }}
              >
                <View style={{ marginBottom: 16 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginHorizontal: 22,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 14 }}>{item.author}</Text>
                    <Text style={{ fontSize: 14 }}>{item.date}</Text>
                    <FeatherIcon color="#1d1d1d" name="star" size={24} />
                    <FeatherIcon color="#1d1d1d" name="x" size={24} />
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8, justifyContent: 'flex-start', marginLeft: 16, marginVertical: 4 }}>
                    <Tags tags={item.tags} />
                    <Text
                      style={{
                        fontSize: 16,
                      }}
                    >
                      {item.description}
                    </Text>

                    
                  </View>

                  <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis praesentium unde est suscipit velit tenetur?
                  </Text>
                </View>
                <Image
                  source={{ uri: item.poster }}
                  style={{ ...styles.posterImage, height: ITEM_SIZE * 1 }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginHorizontal: 10,
                    marginTop: 16,
                    marginBottom: 24,
                    gap: 8,
                  }}
                >
                  <AwesomeButton
                    width={60}
                    height={60}
                    backgroundColor="orange"
                  >
                    A
                  </AwesomeButton>
                  <AwesomeButton
                    width={60}
                    height={60}
                    backgroundColor="orange"
                  >
                    B
                  </AwesomeButton>
                  <AwesomeButton
                    width={60}
                    height={60}
                    backgroundColor="orange"
                  >
                    C
                  </AwesomeButton>
                  <AwesomeButton width={100} height={60}>
                    Share
                  </AwesomeButton>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginHorizontal: 8,
                  }}
                >
                  <StackedCircularAvatar size="small" answers={item.answers} />
                  <Text style={{ fontSize: 14 }}>20 commentaires</Text>
                </View>
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Carousel;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  posterImage: {
    width: "100%",
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});
