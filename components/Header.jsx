import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Colors } from "../assets/constants/Colorss";
import ProfileImage from "../assets/images/profile.png";
import FiltersModal from "./FiltersModal";

const Header = ({ navigation, notificationCount, page, filterCount }) => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const onFilterIconPress = () => {
    setFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.Green500 }}>
      <View style={styles.headerContainer}>
        {page === "home" ? (
          <View style={styles.greetingContainer}>
            <Text style={styles.headerText}>Hello</Text>
            <Text
              style={{ ...styles.headerText, fontWeight: "900", marginLeft: 4 }}
            >
              Vincent
            </Text>
          </View>
        ) : page === "publications" ? (
          <Text style={styles.headerText}>Submit a new poll</Text>
        ) : page === "support" ? (
          <Text style={styles.headerText}>Support us !</Text>
        ) : (
          <Text style={styles.headerText}>Unknown Page</Text>
        )}
        <View style={styles.iconContainer}>
          {page === "home" && (
            <TouchableOpacity onPress={onFilterIconPress}>
              <View style={styles.bellContainer}>
                <FeatherIcon name="sliders" size={20} color="white" />
                {filterCount > 0 && (
                  <View
                    style={{
                      ...styles.notificationBadge,
                      backgroundColor: "blue",
                    }}
                  >
                    <Text style={styles.notificationText}>{filterCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <View style={styles.bellContainer}>
              <FeatherIcon name="bell" size={20} color="white" />
              {notificationCount > 0 && (
                <View
                  style={{
                    ...styles.notificationBadge,
                    backgroundColor: "red",
                  }}
                >
                  <Text style={styles.notificationText}>
                    {notificationCount}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              alt="Profile Picture"
              source={ProfileImage}
              style={styles.profileAvatar}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FiltersModal modalVisible={filterModalVisible} closeModal={closeFilterModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    paddingVertical: 8,
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bellContainer: {
    position: "relative",
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginRight: 16,
    borderColor: "#ccc",
    borderRadius: 9999,
    borderWidth: 1,
  },
  notificationBadge: {
    position: "absolute",
    right: 0,
    top: -5,
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
  profileAvatar: {
    width: 42,
    height: 42,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default Header;
