import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { hp, wp } from "../../helpers/common";
import { theme } from "../../assets/constants/theme";
import Button from "../../components/Button";
import { ROUTES } from "../../assets/constants";
import { useNavigation } from "@react-navigation/native";
import { IMGS, COLORS } from "../../assets/constants";

const WelcomePage = () => {
  const navigation = useNavigation();

  return (
    <ScreenWrapper bg={"white"}>
      <View style={styles.container}>
        {/* welcome image */}
        <Image
          style={styles.welcomeImage}
          resizeMode="contain"
          source={IMGS.welcomeScreenIllustration}
        />

        {/* title */}
        <View style={{ gap: 20 }}>
          <Text style={styles.title}>Bridge Poll !</Text>
          <Text style={styles.punchline}>
            Where every question finds an answers and every bid tells a story.
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            title="Getting Started"
            buttonStyle={{ marginHorizontal: 20 }}
            onPress={() => navigation.navigate(ROUTES.REGISTER)}
          />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Already have an account!</Text>
            <Pressable onPress={() => navigation.navigate(ROUTES.LOGIN)}>
              <Text
                style={[
                  styles.loginText,
                  {
                    color: theme.colors.primaryDark,
                    fontWeight: theme.fonts.semibold,
                  },
                ]}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  welcomeImage: {
    height: 300,
    width: 300,
    alignSelf: "center",
  },
  title: {
    color: theme.colors.text,
    fontSize: 30,
    textAlign: "center",
    fontWeight: theme.fonts.extraBold,
  },
  punchline: {
    textAlign: "center",
    fontSize: 16,
    maxWidth: 300,
    color: theme.colors.text,
  },
  footer: {
    gap: 30,
    width: "100%",
  },

  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  loginText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: 16,
  },
});

export default WelcomePage;
