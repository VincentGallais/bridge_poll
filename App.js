// import BottomTabNav from "./navigations/BottomTabNav";
// import { StatusBar } from "react-native";
// import { Colors } from "./assets/constants/Colors";
// import Profile from './screens/Profile';
// import Notification from './screens/Notification';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useCallback } from "react";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";

import * as React from 'react';
import AuthNavigator from './navigations/AuthNavigator';
import { Text, View } from "react-native";

// SplashScreen.preventAutoHideAsync();
// const Stack = createNativeStackNavigator();

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   black: require("./assets/fonts/Inter-Black.ttf"),
  //   bold: require("./assets/fonts/Inter-Bold.ttf"),
  //   medium: require("./assets/fonts/Inter-Medium.ttf"),
  //   regular: require("./assets/fonts/Inter-Regular.ttf"),
  //   semiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <NavigationContainer>
      {/* {isAuthenticated ? AuthNavigator : DrawerNavigator } */}
      <AuthNavigator />
    </NavigationContainer>
  );

  // return (
  //   <GestureHandlerRootView style={{ flex: 1 }}>
  //     <NavigationContainer onReady={onLayoutRootView}>
  //       <StatusBar backgroundColor={Colors.Green500} />
  //       <Stack.Navigator initialRouteName="BottomTabNavigation">
  //         <Stack.Screen
  //           name="BottomTabNavigation"
  //           component={BottomTabNav}
  //           options={{ headerShown: false }}
  //         />
  //         <Stack.Screen 
  //           name="Profile" 
  //           component={Profile} 
  //           options={{ headerShown: true }}
  //         />
  //         <Stack.Screen 
  //           name="Notification" 
  //           component={Notification} 
  //           options={{ headerShown: true }}
  //         />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   </GestureHandlerRootView>
  // );
}
