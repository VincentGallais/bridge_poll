import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, ForgotPassword, Register } from "../screens";
import { ROUTES } from "../assets/constants";
import BottomTabNavigator from "./BottomTabNavigator";
import AuthProvider from "../providers/authProvider";

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <AuthProvider>
      <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.LOGIN}>
        <Stack.Screen
          name={ROUTES.FORGOT_PASSWORD}
          component={ForgotPassword}
          options={({ route }) => ({
            headerTintColor: "#fff",
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: "orange",
            },
            title: route.params.userId,
          })}
        />
        <Stack.Screen
          name={ROUTES.LOGIN}
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={ROUTES.REGISTER} component={Register} />
        <Stack.Screen
          name={ROUTES.QUIZZ}
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </AuthProvider>
  );
}

export default AuthNavigator;
