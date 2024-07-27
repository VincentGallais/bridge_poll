import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import CountryPickerModal from "../../components/CountryPickerModal";
import BridgeLevelPickerModal from "../../components/BridgeLevelPickerModal";
import { COLORS } from "../../assets/constants";
import AvatarPickerModal from "../../components/AvatarPickerModal";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../providers/AuthProvider";
import Avatar from "../../components/Avatar";
import Icon from "../../assets/icons";
import { theme } from "../../assets/constants/theme";

const Profile = () => {
  const { userData } = useAuth();
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [userParams, setUserParams] = useState(userData);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [levelModalVisible, setLevelModalVisible] = useState(false);

  const handleCountrySelect = (country) => {
    setUserParams((prevForm) => ({
      ...prevForm,
      country: country,
    }));
    setCountryModalVisible(false);
    console.log("Country Modification");
  };

  const handleLevelSelect = (bridge_level) => {
    setUserParams((prevForm) => ({
      ...prevForm,
      bridge_level: bridge_level,
    }));
    setLevelModalVisible(false);
    console.log("Bridge Level Modification");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.White }}>
      <View style={styles.profile}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <View style={styles.avatarContainer}>
              <Avatar uri={profileImage} size={100} rounded={32} />
              <TouchableOpacity
                style={styles.editIcon}
                onPress={() => setPhotoModalVisible(true)}
              >
                <Icon name="camera" strokeWidth={2.5} size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.profileBody}>
            <TouchableOpacity onPress={() => setCountryModalVisible(true)}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={styles.countryIcon}
                  source={{
                    uri: `https://flagsapi.com/${userParams?.country}/flat/64.png`,
                  }}
                />
                <Text style={styles.profileName}>{userParams?.pseudo}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLevelModalVisible(true)}>
              <Text style={styles.profileLevel}>
                bridge_level_{userParams?.bridge_level}
              </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", marginTop: 6, gap: 16 }}>
              <Text style={{ fontSize: 15 }}>
                {userParams?.friends?.length < 2
                  ? `${userParams?.friends?.length} follower`
                  : `${userParams?.friends?.length} followers`}
              </Text>
              <Text style={{ fontSize: 15 }}>
                {userParams?.published_polls?.length < 2
                  ? `${userParams?.published_polls?.length} sondage`
                  : `${userParams?.published_polls?.length} sondages`}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.profileActionsContainer}>
          <TouchableOpacity
            onPress={() => {
              //handleOnpress
            }}
            style={styles.profileActionButton}
          >
            <View
              style={{ ...styles.profileAction, backgroundColor: "#28a745" }}
            >
              <Text style={styles.profileActionText}>Chercher un joueur</Text>
              <FeatherIcon name="user-plus" color="#fff" size={16} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              supabase.auth.signOut();
            }}
            style={styles.profileActionButton}
          >
            <View
              style={{ ...styles.profileAction, backgroundColor: "orange" }}
            >
              <Text style={styles.profileActionText}>Se déconnecter</Text>
              <FeatherIcon name="user-plus" color="#fff" size={16} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modals */}
      <CountryPickerModal
        visible={countryModalVisible}
        onClose={() => setCountryModalVisible(false)}
        initialSelectedCountry={userParams?.country}
        onSelect={handleCountrySelect}
      />
      <BridgeLevelPickerModal
        visible={levelModalVisible}
        onClose={() => setLevelModalVisible(false)}
        initialSelectedLevel={userParams?.bridge_level}
        onSelect={handleLevelSelect}
      />
      <AvatarPickerModal
        visible={photoModalVisible}
        onClose={() => setPhotoModalVisible(false)}
        setProfileImage={setProfileImage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profile: {
    paddingTop: 12,
    marginBottom: 70,
    backgroundColor: COLORS.White,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
    flex: 1,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    borderWidth: 3,
  },
  profileBody: {
    marginLeft: 32,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#3e3e3e",
  },
  profileLevel: {
    marginTop: 4,
    fontSize: 18,
    color: "#989898",
  },
  profileCountry: {
    marginTop: 4,
    fontSize: 16,
    color: "#989898",
  },
  profileAction: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  profileActionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    marginRight: 8,
  },
  profileContentInner: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  profileTabs: {
    flexDirection: "row",
    paddingVertical: 16,
  },
  profileTabWrapper: {
    flex: 1,
    borderBottomWidth: 2,
    borderColor: "#e5e7eb",
  },
  profileTab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    position: "relative",
    overflow: "hidden",
  },
  profileTabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6b7280",
    marginLeft: 5,
  },
  profileRowWrapper: {
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    height: 50,
    justifyContent: "space-between",
  },
  profileRowLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#2c2c2c",
  },
  profileRowValue: {
    fontSize: 17,
    fontWeight: "500",
    color: "#7f7f7f",
    marginRight: 4,
  },
  profileRowContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },
  profileActionsContainer: {
    flexDirection: "row",
    marginTop: 16,
    paddingHorizontal: 16,
  },
  profileActionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  countryIcon: {
    width: 30,
    height: 30,
    marginRight: 4,
  },
  profileImageContainer: {
    position: "relative",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#f1f1f1",
    borderRadius: 50,
    padding: 5,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  modalButton: {
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 16,
    color: "#007bff",
  },
  removeIconContainer: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  chevronIcon: {
    marginLeft: "auto",
  },
  avatarContainer: {
    height: 100,
    width: 100,
    alignSelf: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: -10,
    padding: 7,
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
});

export default Profile;
