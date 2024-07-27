import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  AppState,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { theme } from "../../assets/constants/theme";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import { supabase } from "../../lib/supabase";
import Icon from "../../assets/icons";
import Input from "../../components/Input";
import { ROUTES } from "../../assets/constants";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const Register = ({ navigation }) => {
  const emailRef = useRef("");
  const nameRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!nameRef.current || !emailRef.current || !passwordRef.current) {
      Alert.alert("Sign up", "Please fill all the fields!");
      return;
    }

    let name = nameRef.current.trim();
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name,
        },
      },
    });

    console.log("session: ", session);
    console.log("error: ", error);

    if (error) Alert.alert("Sign up", error.message);
    setLoading(false);
  };

  return (
    <ScreenWrapper bg={"white"}>
      <ScrollView>
        <View style={styles.container}>
          {/* back button */}
          <View>
            <BackButton router={navigation} route={ROUTES.WELCOMESCREEN} />
          </View>

          {/* welcome */}
          <View>
            <Text style={styles.welcomeText}>Lets's </Text>
            <Text style={styles.welcomeText}>Get Started</Text>
          </View>

          {/* form */}
          <View style={styles.form}>
            <Input
              icon={<Icon name="user" size={26} strokeWidth={1.6} />}
              placeholder="Enter your pseudonyme"
              placeholderTextColor={theme.colors.textLight}
              onChangeText={(value) => (nameRef.current = value)}
            />
            <Input
              icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
              placeholder="Enter your email"
              placeholderTextColor={theme.colors.textLight}
              onChangeText={(value) => (emailRef.current = value)}
            />
            <Input
              icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
              secureTextEntry
              placeholder="Enter your password"
              placeholderTextColor={theme.colors.textLight}
              onChangeText={(value) => (passwordRef.current = value)}
            />

            <Button title="Sign up" loading={loading} onPress={onSubmit} />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account!</Text>
            <Pressable onPress={() => navigation.navigate(ROUTES.LOGIN)}>
              <Text
                style={[
                  styles.footerText,
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
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  form: {
    gap: 25,
  },
  input: {
    flexDirection: "row",
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xxl,
    borderCurve: "continuous",
    padding: 18,
    paddingHorizontal: 20,
    gap: 15,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: 16,
  },
});

export default Register;
