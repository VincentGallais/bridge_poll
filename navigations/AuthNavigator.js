import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, ForgotPassword, Register, WelcomeScreen } from "../screens/Index";
import { ROUTES } from "../assets/constants";
import BottomTabNavigator from "./AppNavigator";
import AuthProvider, {useAuth} from "../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <AuthProvider>
      <AuthNavigatorInner />
    </AuthProvider>
  );
}

function AuthNavigatorInner() {
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      navigation.navigate(ROUTES.HOME);
    }
  }, [user]);

  return (
    <Stack.Navigator
      initialRouteName={ROUTES.WELCOMESCREEN}
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      <Stack.Screen
        name={ROUTES.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={({ route }) => ({
          title: route.params?.userId || "Forgot Password",
        })}
      />
      <Stack.Screen name={ROUTES.WELCOMESCREEN} component={WelcomeScreen} />
      <Stack.Screen name={ROUTES.REGISTER} component={Register} />
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.HOME} component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
