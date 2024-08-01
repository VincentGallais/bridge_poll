import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Keyboard,
  NativeModules,
  TouchableWithoutFeedback,
  AppState,
} from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import { theme } from "../../assets/constants/theme";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import { supabase } from "../../lib/supabase";
import Icon from "../../assets/icons";
import Input from "../../components/Input";
import { ROUTES } from "../../assets/constants";
import FeatherIcon from "react-native-vector-icons/Feather";
import { isPseudonymeTaken } from "../../services/userService";
import CustomModal from "../../components/CustomModal"; // Assurez-vous que le chemin est correct

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
  const pseudonymeRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false); 
  const [errorModalMessage, setErrorModalMessage] = useState("");
  const locale = NativeModules.I18nManager.localeIdentifier
    ?.slice(0, 2)
    ?.toUpperCase();

  const onSubmit = async () => {
    Keyboard.dismiss();

    if (!pseudonymeRef.current || !emailRef.current || !passwordRef.current) {
      setErrorModalMessage("Please fill all the fields!");
      setErrorModalVisible(true);
      return;
    }

    const pseudonyme = pseudonymeRef.current.trim();
    const email = emailRef.current.trim();
    const password = passwordRef.current.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorModalMessage("Please enter a valid email address.");
      setErrorModalVisible(true);
      return;
    }

    setLoading(true);

    // Vérifier si le pseudo est déjà pris
    const { success, isTaken, msg } = await isPseudonymeTaken(pseudonyme);


    if (!success) {
      setLoading(false);
      setErrorModalMessage(msg);
      setErrorModalVisible(true);
      return;
    }

    if (isTaken) {
      setLoading(false);
      setErrorModalMessage("This pseudonyme is already taken. Please choose another one.");
      setErrorModalVisible(true);
      return;
    }

    // Si le pseudo est disponible, procéder à l'inscription
    const {
      data: { session },
      error: signUpError,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          pseudonyme,
          locale,
        },
      },
    });

    if (signUpError) {
      setErrorModalMessage(signUpError.message);
      setErrorModalVisible(true);
    }

    setLoading(false);
  };

  const handleModalClose = () => {
    setErrorModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <ScreenWrapper bg={"white"}>
          <View style={styles.container}>
            {/* back button */}
            <View>
              <BackButton router={navigation} route={ROUTES.WELCOMESCREEN} />
            </View>

            {/* welcome */}
            <View>
              <Text style={styles.welcomeText}>Let's </Text>
              <Text style={styles.welcomeText}>Get Started</Text>
            </View>

            {/* form */}
            <View style={styles.form}>
              <Input
                icon={<Icon name="user" size={26} strokeWidth={1.6} />}
                placeholder="Enter your pseudonyme"
                placeholderTextColor={theme.colors.textLight}
                onChangeText={(value) => (pseudonymeRef.current = value)}
              />
              <Input
                icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
                placeholder="Enter your email"
                placeholderTextColor={theme.colors.textLight}
                onChangeText={(value) => (emailRef.current = value)}
              />
              <View style={styles.passwordContainer}>
                <Input
                  icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
                  secureTextEntry={!showPassword}
                  placeholder="Enter your password"
                  placeholderTextColor={theme.colors.textLight}
                  onChangeText={(value) => (passwordRef.current = value)}
                  style={styles.passwordInput}
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.showPasswordButton}
                >
                  <FeatherIcon
                    color={theme.colors.textLight}
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                  />
                </Pressable>
              </View>

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
        </ScreenWrapper>

        {errorModalVisible && (
          <CustomModal
            messageType="fail"
            buttonText="OK"
            headerText="Sign up"
            coreText={errorModalMessage}
            onClose={handleModalClose}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
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
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    flex: 1,
  },
  showPasswordButton: {
    position: "absolute",
    right: 20,
    top: 17,
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
