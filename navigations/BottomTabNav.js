import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Support from '../screens/Support';
import Quizz from '../screens/Quizz';
import Submit from '../screens/Publications';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { Colors } from '../assets/constants/Colorss';
import Header from '../components/Header';
import FeatherIcon from "react-native-vector-icons/Feather";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const SupportStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="SupportScreen"
      component={Support}
      options={{
        header: () => <Header navigation={navigation} notificationCount={5} page="support" />,
      }}
    />
  </Stack.Navigator>
);

const QuizzStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="QuizzScreen"
      component={Quizz}
      options={{
        header: () => <Header navigation={navigation} notificationCount={5} filterCount={2} page="home" />,
      }}
    />
  </Stack.Navigator>
);

const SubmitStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="SubmitScreen"
      component={Submit}
      options={{
        header: () => <Header navigation={navigation} notificationCount={5} page="submit" />,
      }}
    />
  </Stack.Navigator>
);

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Quizz" // Définit Quizz comme écran initial
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tab.Screen
        name="Support"
        component={SupportStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <AntDesign
                name="heart"
                size={24}
                color={focused ? Colors.DarkPurple : '#111'}
              />
              <Text style={[styles.label, { color: focused ? Colors.DarkPurple : '#111' }]}>
                Soutenir
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Quizz"
        component={QuizzStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.navigation__footer__home,
                { backgroundColor: focused ? Colors.DarkPurple : Colors.Black },
              ]}
            >
              <MaterialCommunityIcons name="cards" size={32} color="white" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Submit"
        component={SubmitStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <FeatherIcon
                name="edit-3"
                size={24}
                color={focused ? Colors.DarkPurple : Colors.Black}
              />
              <Text style={[styles.label, { color: focused ? Colors.DarkPurple : Colors.Black }]}>
                Publications
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigation__footer__home: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.OS === 'ios' ? 50 : 60,
    height: Platform.OS === 'ios' ? 50 : 60,
    top: Platform.OS === 'ios' ? -10 : -20,
    borderRadius: Platform.OS === 'ios' ? 25 : 30,
  },
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: Colors.White,
  },
  label: {
    fontSize: 12,
  },
});
