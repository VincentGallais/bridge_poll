import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { IMGS, COLORS } from "../../assets/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../assets/constants";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.Green500 }}>
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <Text
          style={{
            color: COLORS.White,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 32,
          }}
        >
          Welcome to Bridge Poll!
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image
            alt="Welcome Screen Illustration"
            source={IMGS.welcomeScreenIllustration}
            style={styles.illustration}
          />
        </View>

        <View style={{ marginHorizontal: 24 }}>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.REGISTER)} style={styles.signUpButtonContainer}>
            <Text style={styles.buttonFont}>Sign Up</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              marginTop: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 14, marginRight: 6 }}>
              Already have an acount?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.LOGIN)}
            >
              <Text style={{ fontSize: 16, color: COLORS.White }}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  illustration: {
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
  signUpButtonContainer: {
    paddingHorizontal: 8,
    backgroundColor: COLORS.Red500,
    paddingVertical: 8,
    borderRadius: 10,
  },
  buttonFont: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
