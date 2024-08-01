import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import CountryPickerModal from "../../components/CountryPickerModal";
import BridgeLevelPickerModal from "../../components/BridgeLevelPickerModal";
import { COLORS } from "../../assets/constants";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from "../../components/Avatar";
import Icon from "../../assets/icons";
import { theme } from "../../assets/constants/theme";
import * as ImagePicker from "expo-image-picker";
import { uploadFile } from "../../services/imageService";
import { updateUser } from "../../services/userService";
import Loading from "../../components/Loading";

const Profile = () => {
  const { user: currentUser, setUserData } = useAuth();
  const [user, setUser] = useState({
    pseudonyme: "",
    image: null,
    bridgeLevel: null,
    locale: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setUser({
        pseudonyme: currentUser.pseudonyme || "",
        bridgeLevel: currentUser.bridgeLevel || "",
        locale: currentUser.locale || "en",
        image: currentUser.image || null,
        isAdmin: currentUser.isAdmin ||false,
      });
    }
  }, [currentUser]);

  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [levelModalVisible, setLevelModalVisible] = useState(false);

  const handleCountrySelect = (locale) => {
    setUser((prevForm) => ({
      ...prevForm,
      locale: locale,
    }));
    setCountryModalVisible(false);
    updateUserData({ locale });
  };
  
  const handleLevelSelect = (bridgeLevel) => {
    setUser((prevForm) => ({
      ...prevForm,
      bridgeLevel: bridgeLevel,
    }));
    setLevelModalVisible(false);
    updateUserData({ bridgeLevel });
  };

  const updateUserData = async (updatedData) => {
    const res = await updateUser(currentUser?.id, updatedData);
    if (res.success) {
      setUserData({ ...currentUser, ...updatedData });
    } else {
      Alert.alert("Erreur", "La mise à jour a échoué. Veuillez réessayer.");
    }
  };

  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setUser((prevParams) => ({
        ...prevParams,
        image: imageUri,
      }));

      let userData = { ...user, image: imageUri };

      setLoading(true);
      let imageResult = await uploadFile("profiles", imageUri, true);
      if (imageResult.success) {
        userData.image = imageResult.data;
      } else {
        userData.image = null;
      }

      const res = await updateUser(currentUser?.id, userData);
      setLoading(false);
      if (res.success) {
        setUserData({ ...currentUser, ...userData });
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.White }}>
      <View style={styles.profile}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <View style={styles.avatarContainer}>
              {loading ? (
                <Loading />
              ) : (
                <>
                  <Avatar
                    uri={user?.image}
                    size={100}
                    rounded={32}
                    style={{
                      borderWidth: 5,
                      borderColor: user?.isAdmin ? "orange" : "#ccc",
                    }}
                  />
                  <TouchableOpacity
                    style={styles.cameraIcon}
                    onPress={onPickImage}
                  >
                    <Icon name="camera" strokeWidth={2.5} size={20} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
          <View style={styles.profileBody}>
            <TouchableOpacity onPress={() => setCountryModalVisible(true)}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={styles.countryIcon}
                  source={{
                    uri: `https://flagsapi.com/${user?.locale}/flat/64.png`,
                  }}
                />
                <Text style={styles.profileName}>{user?.pseudonyme}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLevelModalVisible(true)}>
              <Text style={styles.profileLevel}>
                {`bridge_level_${user?.bridgeLevel ? user.bridgeLevel : "undefined"}`}
              </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", marginTop: 6, gap: 16 }}>
              <Text style={{ fontSize: 16 }}>0 followers</Text>
              <Text style={{ fontSize: 16 }}>0 polls</Text>
            </View>
          </View>
        </View>

        <View style={styles.profileActionsContainer}>
          <TouchableOpacity
            onPress={() => {
              console.log("Searching for a player ...");
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
              <Icon name="logout" strokeWidth={2.5} size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 26, marginHorizontal: 26 }}>
          <Text>Mes sondages publiés :</Text>
          <ScrollView>
            <Text>Sondage testBids</Text>
          </ScrollView>
        </View>
      </View>

      {/* Modals */}
      <CountryPickerModal
        visible={countryModalVisible}
        onClose={() => setCountryModalVisible(false)}
        initialSelectedCountry={user?.locale}
        onSelect={handleCountrySelect}
      />
      <BridgeLevelPickerModal
        visible={levelModalVisible}
        onClose={() => setLevelModalVisible(false)}
        initialSelectedLevel={user?.bridgeLevel}
        onSelect={handleLevelSelect}
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
  avatarContainer: {
    height: 100,
    width: 100,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraIcon: {
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
