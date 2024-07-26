import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";
import ProfileImage from "../assets/images/profile.png";
import FiltersModal from "./FiltersModal";
import { COLORS, ROUTES } from "../assets/constants"; // Assurez-vous d'importer ROUTES
import { useAuth } from "../providers/AuthProvider";
import Avatar from '../components/Avatar'

const Header = ({ navigation, page }) => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const { userData } = useAuth();

  const onFilterIconPress = () => {
    setFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.Green500 }}>
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          {page === "home" && (
            <TouchableOpacity onPress={onFilterIconPress}>
              <View style={styles.bellContainer}>
                <FeatherIcon name="sliders" size={20} color="white" />
                {2 > 0 && (
                  <View
                    style={{
                      ...styles.notificationBadge,
                      backgroundColor: "blue",
                    }}
                  >
                    <Text style={styles.notificationText}>{2}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.NOTIFICATIONS)}
          >
            <View style={styles.bellContainer}>
              <FeatherIcon name="bell" size={20} color="white" />
              {userData?.notifications?.length > 0 && (
                <View
                  style={{
                    ...styles.notificationBadge,
                    backgroundColor: "red",
                  }}
                >
                  <Text style={styles.notificationText}>
                    {userData?.notifications?.length}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.PROFILE)}>

            <Avatar 
                uri={userData?.image} 
                size={hp(4.3)}
                rounded={theme.radius.sm}
                style={{borderWidth: 2}}
              />

            <Image
              alt="Profile Picture"
              source={ProfileImage}
              style={{
                ...styles.profileAvatar,
                borderColor: userData?.isAdmin ? "orange" : "#ccc",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FiltersModal
        modalVisible={filterModalVisible}
        closeModal={closeFilterModal}
      />
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
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
    borderWidth: 2,
    borderColor: "#ccc",
  },
});

export default Header;
