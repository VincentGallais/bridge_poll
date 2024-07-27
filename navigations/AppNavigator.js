import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTES } from "../assets/constants";
import { Quizz, Notifications, Profile } from "../screens/Index";
import Publications from "../screens/home/Publications";
import { useAuth } from "../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const navigation = useNavigation();
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) {
      navigation.navigate(ROUTES.WELCOMESCREEN);
    }
  }, [user]);

  const screenOptionsWithHeader = (page) => ({
    header: () => <Header navigation={navigation} page={page} />
  });

  return (
    <Stack.Navigator
      screenOptions={{
        animation: "fade",
      }}
      initialRouteName={ROUTES.QUIZZ}
    >
      <Stack.Screen
        navigation={navigation}
        name={ROUTES.QUIZZ}
        component={Quizz}
        options={screenOptionsWithHeader(ROUTES.QUIZZ)}
      />
      <Stack.Screen
        name={ROUTES.PUBLICATIONS}
        component={Publications}
        options={screenOptionsWithHeader(ROUTES.PUBLICATIONS)}
      />
      <Stack.Screen
        name={ROUTES.PROFILE}
        component={Profile}
        options={screenOptionsWithHeader(ROUTES.PROFILE)}
      />
      <Stack.Screen
        name={ROUTES.NOTIFICATIONS}
        component={Notifications}
        options={screenOptionsWithHeader(ROUTES.NOTIFICATIONS)}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;