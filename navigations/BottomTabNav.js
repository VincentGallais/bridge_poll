import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Support from "../screens/Support";
import Quizz from "../screens/Quizz";
import Profile from "../screens/Profile";

import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "../assets/styles";
import { Colors } from "../assets/constants/Colors";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: styles.tabBarStyle
};

const BottomTabNav = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Support"
        component={Support}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <AntDesign
                  name="heart"
                  size={24}
                  color={focused ? Colors.DarkPurple : "#111"}
                />

                <Text style={{ fontSize: 12, color: Colors.DarkPurple }}>
                  Soutenir
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Quizz"
        component={Quizz}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  ...styles.navigation__footer__home,
                  backgroundColor: focused ? Colors.DarkPurple : Colors.Black,
                }}
              >
                <MaterialCommunityIcons name="cards" size={32} color="white" />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome
                  name="user"
                  size={24}
                  color={focused ? Colors.DarkPurple : Colors.Black}
                />

                <Text style={{ fontSize: 12, color: Colors.DarkPurple }}>
                  Profil
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
