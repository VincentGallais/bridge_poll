import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
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
import CustomModal from "../../components/CustomModal"; // Assurez-vous que le chemin est correct


AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const Login = ({ navigation }) => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");

  const onSubmit = async () => {
    Keyboard.dismiss();

    if (!emailRef.current || !passwordRef.current) {
      setErrorModalMessage("Please fill all the fields!");
      setErrorModalVisible(true);
      return;
    }

    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setErrorModalMessage(error.message);
        setErrorModalVisible(true);
      }
    } catch (error) {
      setErrorModalMessage(error.message);
      setErrorModalVisible(true);
    } finally {
      setLoading(false);
    }
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
              <Text style={styles.welcomeText}>Hey, </Text>
              <Text style={styles.welcomeText}>Welcome Back </Text>
            </View>

            {/* form */}
            <View style={styles.form}>
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
              <Pressable
                onPress={() =>
                  navigation.navigate(ROUTES.FORGOT_PASSWORD, {
                    userId: "X0001",
                  })
                }
              >
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </Pressable>

              {/* button */}
              <Button title="Login" loading={loading} onPress={onSubmit} />
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <Pressable onPress={() => navigation.navigate(ROUTES.REGISTER)}>
                <Text
                  style={[
                    styles.footerText,
                    {
                      color: theme.colors.primaryDark,
                      fontWeight: theme.fonts.semibold,
                    },
                  ]}
                >
                  Sign up
                </Text>
              </Pressable>
            </View>
          </View>
        </ScreenWrapper>

        {/* Custom Modal */}
        {errorModalVisible && (
          <CustomModal
            messageType="fail"
            buttonText="OK"
            headerText="Login"
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

export default Login;
