import {
  View,
  StatusBar,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  Easing,
} from "react-native";
import React from "react";
import Button from "../../components/Button";
import { ROUTES } from "../../assets/constants";
import { useNavigation } from "@react-navigation/native";
import welcomeScreenIllustration from "../../assets/images/welcome-screen-illustration.png";

const bgs = ["#A5BBFF", "#DDBEFE", "#FF63ED", "#B98EFF"];
const DATA = [
  {
    key: "3571572",
    title: "Welcome to Bridge Poll !",
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: "",
  },
  {
    key: "3571747",
    title: "Ask bridge question ",
    description:
      "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    image: "",
  },
  {
    key: "3571680",
    title: "Talk with the bridge community",
    description:
      "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    image: "",
  },
  {
    key: "3571603",
    title: "Never stop learning",
    description: "We need to program the open-source IB interface!",
    image: "",
  },
];

const { width, height } = Dimensions.get("screen");
const Indicator = ({ scrollX }) => {
  return (
    <View style={{ position: "absolute", bottom: 30, flexDirection: "row" }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: "#fff",
              margin: 10,
              opacity,
              transform: [{ scale }],
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
    ></Animated.View>
  );
};

const Square = ({ scrollX }) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "0deg", "35deg"],
  });

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });

  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: "#fff",
        borderRadius: 86,
        position: "absolute",
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [{ rotate }, { translateX }],
      }}
    ></Animated.View>
  );
};

const WelcomePage = () => {
  const navigation = useNavigation();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        horizontal
        contentContainerStyle={{ paddingBottom: 100 }}
        pagingEnabled
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          return (
            <View style={{ width }}>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: "center",
                  alignItems: 'center',
                  padding: 20,
                }}
              >
                <Image
                  source={welcomeScreenIllustration}
                  style={{
                    width: width / 2,
                    height: width / 2,
                    resizeMode: "contain",
                    
                  }}
                />
              </View>
              <View style={{ flex: 0.3, paddingHorizontal: 20 }}>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "800",
                    fontSize: 28,
                    marginBottom: 10,
                    textAlign: "left",
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{ fontWeight: "300", textAlign: "left", flex: 1 }}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />

      <View style={{ position: "absolute", bottom: 100, flexDirection: "row", marginHorizontal: 16, gap: 16}}>
        <Button
          title="Login"
          buttonStyle={{ flex: 1 }}
          onPress={() => navigation.navigate(ROUTES.LOGIN)}
        />
        <Button
          title="Create Account"
          buttonStyle={{ flex: 1 }}
          onPress={() => navigation.navigate(ROUTES.REGISTER)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export default WelcomePage;