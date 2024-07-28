import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, ForgotPassword, Register, WelcomeScreen } from "../screens/Index";
import { ROUTES } from "../assets/constants";
import BottomTabNavigator from "./AppNavigator";
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import { getUserData } from '../services/userService'

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

const MainLayout = ()=>{
const {setAuth, setUserData} = useAuth();
const navigation = useNavigation();

    useEffect(() => {
        // triggers automatically when auth state changes
        supabase.auth.onAuthStateChange((_event, session) => {
        console.log('session: ', session?.user?.id);
        if (session) {
            setAuth(session?.user);
            updateUserData(session?.user); // update user like image, phone, bio
            navigation.navigate(ROUTES.HOME);
        } else {
            setAuth(null);
            navigation.navigate(ROUTES.WELCOMESCREEN);
        }
        })
    }, []);

    const updateUserData = async (user)=>{
        let res = await getUserData(user.id);
        if(res.success) setUserData(res.data);
    }

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
