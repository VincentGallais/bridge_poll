import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Colors } from "../assets/constants/Colors";

const Header = ({ notificationCount, screen }) => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.Green500 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>
          {screen === "quizz" ? "Welcome X" : "My profile"}
        </Text>
        <View style={styles.iconContainer}>
          <FeatherIcon name="user" size={24} color="white" />
          <FeatherIcon name="bell" size={24} color="white" />
          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>{notificationCount}</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginHorizontal: 16,
    paddingVertical: 16,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  iconContainer: {
    position: "relative",
    flexDirection: "row",
    gap: 16,
  },
  notificationBadge: {
    position: "absolute",
    right: -4,
    top: -8,
    backgroundColor: "red",
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default Header;
