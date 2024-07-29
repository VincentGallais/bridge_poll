import * as React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Tags from "./Tags";

const { width, height } = Dimensions.get("window");
import StackedCircularAvatar from "./StackedCircularAvatar";
import AwesomeButton from "react-native-really-awesome-button";
import FeatherIcon from "react-native-vector-icons/Feather";
import cardBackgroundImage from "../assets/images/card_background.png";
import Icon from "../assets/icons";

const SPACING = 5;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.87 : width * 0.9;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKGROUND_IMG_HEIGHT = height * 0.65;

const Carousel = ({ polls, scrollX }) => {
  return (
    <View style={{ ...styles.container, backgroundColor: "green" }}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={polls}
        onEndReached={() => {
          console.log("Polls end, searching for more");
        }}
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
            outputRange: [60, 30, 60],
            extrapolate: "clamp",
          });

          return (
            <View style={{ width: ITEM_SIZE }}>
              <Animated.View
                style={{ ...styles.cardContainer, transform: [{ translateY }] }}
              >
                <Image
                  source={cardBackgroundImage}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: ITEM_SIZE * 1.3,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                  }}
                />

                <View
                  style={{
                    position: "absolute",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginRight: 10,
                      marginTop: 10,
                      marginLeft: 20,
                    }}
                  >
                    <Tags tags={item.tags} />
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          width: 48,
                          height: 48,
                          backgroundColor: "white",
                          borderRadius: 999,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FeatherIcon
                          color="black"
                          name={"eye-off"}
                          size={24}
                          strokeWidth={2.5}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          width: 48,
                          height: 48,
                          backgroundColor: "white",
                          borderRadius: 999,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon
                          name="share"
                          strokeWidth={2.5}
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          width: 48,
                          height: 48,
                          backgroundColor: "white",
                          borderRadius: 999,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon
                          name="heart"
                          strokeWidth={2.5}
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={{ top: -20 }}>
                  <StackedCircularAvatar size="small" answers={item?.answers} />
                </TouchableOpacity>

                <View style={styles.votingButtonContainer}>
                  <AwesomeButton
                    width={70}
                    height={70}
                    backgroundColor="orange"
                  >
                    A
                  </AwesomeButton>
                  <AwesomeButton
                    width={70}
                    height={70}
                    backgroundColor="orange"
                  >
                    B
                  </AwesomeButton>
                  <AwesomeButton
                    width={70}
                    height={70}
                    backgroundColor="orange"
                  >
                    C
                  </AwesomeButton>
                  <AwesomeButton
                    width={70}
                    height={70}
                    backgroundColor="orange"
                  >
                    D
                  </AwesomeButton>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    margin: 16,
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity>
                    <Text style={{ fontSize: 14 }}>
                      Submited by {item?.author}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={{ fontSize: 14 }}>
                      {item?.comments} commentaires
                    </Text>
                  </TouchableOpacity>
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
  votingButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 10,
    gap: 8,
  },
  cardContainer: {
    marginHorizontal: SPACING,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 4,
    overflow: "hidden",
  },
});
