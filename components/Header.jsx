import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";
import FiltersModal from "./FiltersModal";
import { COLORS, ROUTES } from "../assets/constants"; // Assurez-vous d'importer ROUTES
import { useAuth } from "../providers/AuthProvider";
import Avatar from "../components/Avatar";
import { theme } from "../assets/constants/theme";
import Loading from "../components/Loading";
import Icon from "../assets/icons";

const Header = ({ navigation, page }) => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const { userData } = useAuth();

  useEffect(() => {
    if (userData) setLoading(false);
  }, [userData]);

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.Green500 }}>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.headerContainer}>
          {page != ROUTES.QUIZZ ? (
            <TouchableOpacity
              style={{
                marginRight: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate(ROUTES.QUIZZ)}
            >
              <Icon
                name="arrowLeft"
                strokeWidth={2.5}
                size={26}
                color="white"
              />

              <Text style={styles.headerText}>Back</Text>
            </TouchableOpacity>
          ) : <Text style={styles.headerText}>Welcome {userData.pseudo}</Text>}

          <View style={styles.iconContainer}>
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

            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.PROFILE)}
            >
              <Avatar
                uri={userData?.image}
                size={40}
                rounded={theme.radius.sm}
                style={{
                  borderWidth: 2,
                  borderColor: userData?.isAdmin ? "orange" : "#ccc",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
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
});

export default Header;
