import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Platform, Text, View } from "react-native";
import { ROUTES } from "../assets/constants";
import { Quizz, Support, Notifications, Profile } from "../screens/Index";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AntDesign } from "@expo/vector-icons";
import FeatherIcon from "react-native-vector-icons/Feather";
import Header from "../components/Header";
import Publications from "../screens/home/Publications";
import { useAuth } from "../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from '../assets/constants';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabNavigator() {
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigation.navigate(ROUTES.WELCOMESCREEN);
    }
  }, [user]);

  return (
    <Tab.Navigator
      backBehavior={"initialRoute"}
      initialRouteName={ROUTES.QUIZZ_TAB}
      screenOptions={({ route }) => ({
        header: () => {
          switch (route.name) {
            case ROUTES.QUIZZ_TAB:
              return (
                <Header
                  navigation={navigation}
                  notificationCount={5}
                  filterCount={2}
                  page="home"
                />
              );
            case ROUTES.SUPPORT:
              return (
                <Header
                  navigation={navigation}
                  notificationCount={5}
                  page="support"
                />
              );
            case ROUTES.PUBLICATIONS:
              return (
                <Header
                  navigation={navigation}
                  notificationCount={5}
                  page="publications"
                />
              );
            default:
              return null;
          }
        },
        headerShown: true,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "orange",
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: "green",
      })}
    >
      <Tab.Screen
        name={ROUTES.SUPPORT}
        component={Support}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <AntDesign
                name="heart"
                size={24}
                color={focused ? COLORS.DarkPurple : "#111"}
              />
              <Text
                style={[
                  styles.label,
                  { color: focused ? COLORS.DarkPurple : "#111" },
                ]}
              >
                Soutenir
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.QUIZZ_TAB}
        component={Quizz}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.navigation__footer__home,
                { backgroundColor: focused ? COLORS.DarkPurple : COLORS.Black },
              ]}
            >
              <MaterialCommunityIcons name="cards" size={32} color="white" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.PUBLICATIONS}
        component={Publications}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <FeatherIcon
                name="edit-3"
                size={24}
                color={focused ? COLORS.DarkPurple : COLORS.Black}
              />
              <Text
                style={[
                  styles.label,
                  { color: focused ? COLORS.DarkPurple : COLORS.Black },
                ]}
              >
                Publications
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "fade_from_bottom",
      }}
    >
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: true, title: "Profil" }}
      />
      <Stack.Screen
        name="Notification"
        component={Notifications}
        options={{ headerShown: true, title: "Notification" }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  navigation__footer__home: {
    alignItems: "center",
    justifyContent: "center",
    width: Platform.OS === "ios" ? 50 : 60,
    height: Platform.OS === "ios" ? 50 : 60,
    top: Platform.OS === "ios" ? -10 : -20,
    borderRadius: Platform.OS === "ios" ? 25 : 30,
  },
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: COLORS.Neutral100,
  },
  label: {
    fontSize: 12,
  },
});
