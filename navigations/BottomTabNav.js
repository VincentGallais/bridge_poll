import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Support from '../screens/Support';
import Quizz from '../screens/Quizz';
import Profile from '../screens/Profile';
import { FontAwesome, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { Colors } from '../assets/constants/Colors';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarHideOnKeyboard: true,
};

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        ...screenOptions,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tab.Screen
        name="Support"
        component={Support}
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
        component={Quizz}
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
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <FontAwesome
                name="user"
                size={24}
                color={focused ? Colors.DarkPurple : Colors.Black}
              />
              <Text style={[styles.label, { color: focused ? Colors.DarkPurple : Colors.Black }]}>
                Profil
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
