import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProfileImage from "../assets/images/profile.png";
import FeatherIcon from "react-native-vector-icons/Feather";
import CountryPickerModal from "../components/CountryPickerModal";
import { Colors } from "../assets/constants/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../components/Header";
import PhotoModal from "../components/PhotoModal";

const user = {
  countryId: "FR",
  country: "France",
  friendsNbr: 15,
  pollNbr: 30,
  bridgeLevel: "Expert",
  firstName: "Vincent",
  lastName: "Gallais",
  isAdmin: true,
};

const SECTIONS = [
  {
    header: "Preferences",
    icon: "settings",
    items: [
      {
        id: "country",
        label: "Country",
        type: "input",
      },
      {
        id: "level",
        label: "Level",
        type: "input",
      },
      {
        id: "notification",
        label: "Notifications",
        type: "toggle",
      },
    ],
  },
  {
    header: "Mes sondages",
    icon: "plus",
    items: [],
  },
  {
    header: "Mes réponses",
    icon: "plus",
    items: [],
  },
];

const Profile = () => {
  const [photoModalVisible, setPhotoModalVisible] = React.useState(false);
  const [profileImage, setProfileImage] = React.useState(ProfileImage);
  const [form, setForm] = React.useState({
    country: user.country,
    level: user.bridgeLevel,
    notification: true,
  });
  const [value, setValue] = React.useState(0);
  const [countryModalVisible, setCountryModalVisible] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState(user.countryId);

  const { tabs, items } = React.useMemo(() => {
    return {
      tabs: SECTIONS.map(({ header, icon }) => ({
        header,
        icon,
      })),
      items: SECTIONS[value].items,
    };
  }, [value]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country.id); // Update selected country ID
    setForm((prevForm) => ({
      ...prevForm,
      country: country.name,
    }));
    setCountryModalVisible(false); // Close modal after selection
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.White }}>
      <ScrollView>
        <View style={styles.profile}>
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              <Image
                alt="Profile Picture"
                source={profileImage}
                style={{
                  ...styles.profileAvatar,
                  borderColor: user.isAdmin ? "orange" : "#ccc",
                }}
              />

              <TouchableOpacity
                style={styles.cameraIconContainer}
                onPress={() => setPhotoModalVisible(true)}
              >
                <MaterialCommunityIcons
                  name="camera-outline"
                  size={24}
                  color="orange"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.profileBody}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={styles.radioImage}
                  source={{
                    uri: `https://flagsapi.com/${user.countryId}/flat/64.png`,
                  }}
                />
                <Text style={styles.profileName}>
                  {user.firstName} {user.lastName}
                </Text>
              </View>
              <Text style={styles.profileLevel}>
                Bridgeur {user.bridgeLevel}
              </Text>
              <View style={{ flexDirection: "row", marginTop: 6, gap: 16 }}>
                <Text>{user.friendsNbr} amis</Text>
                <Text>{user.pollNbr} sondages</Text>
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
                style={{ ...styles.profileAction, backgroundColor: "#007bff" }}
              >
                <Text style={styles.profileActionText}>Edit Profile</Text>
                <FeatherIcon name="edit-3" color="#fff" size={16} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                //handleOnpress
              }}
              style={styles.profileActionButton}
            >
              <View
                style={{ ...styles.profileAction, backgroundColor: "#28a745" }}
              >
                <Text style={styles.profileActionText}>Add Friend</Text>
                <FeatherIcon name="user-plus" color="#fff" size={16} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileContent}>
          <View style={styles.profileTabs}>
            {tabs.map(({ header, icon }, index) => {
              const isActive = value === index;
              return (
                <View
                  key={index}
                  style={[
                    styles.profileTabWrapper,
                    isActive && { borderColor: "#6366f1" },
                  ]}
                >
                  <TouchableOpacity onPress={() => setValue(index)}>
                    <View style={styles.profileTab}>
                      <FeatherIcon
                        name={icon}
                        size={16}
                        color={isActive ? "#6366f1" : "#6b7280"}
                      />
                      <Text
                        style={[
                          styles.profileTabText,
                          { color: isActive ? "#6366f1" : "#6b7280" },
                        ]}
                      >
                        {header}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          {items.map(({ label, type, id }, index) => (
            <View key={index} style={styles.profileRowWrapper}>
              <TouchableOpacity
                onPress={() => {
                  if (id === "country") {
                    setCountryModalVisible(true);
                  }
                }}
              >
                <View style={styles.profileRow}>
                  <Text style={styles.profileRowLabel}>{label}</Text>

                  <View style={styles.profileRowContent}>
                    {type === "input" && (
                      <Text style={styles.profileRowValue}>{form[id]}</Text>
                    )}

                    {type === "toggle" && (
                      <Switch
                        trackColor={{ true: "#007bff" }}
                        value={form[id]}
                        onValueChange={(value) =>
                          setForm({ ...form, [id]: value })
                        }
                      />
                    )}

                    {["link", "input"].includes(type) && (
                      <FeatherIcon
                        name="chevron-right"
                        color="#7f7f7f"
                        size={20}
                      />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <CountryPickerModal
        visible={countryModalVisible}
        onClose={() => setCountryModalVisible(false)}
        onSelect={handleCountrySelect}
        selectedCountryId={selectedCountry}
      />

      <PhotoModal
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
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: Colors.White,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 9999,
    borderWidth: 3,
  },
  profileBody: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3e3e3e",
  },
  profileLevel: {
    marginTop: 4,
    fontSize: 15,
    color: "#989898",
  },
  profileAction: {
    paddingVertical: 10,
    paddingHorizontal: 10,
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
  profileContent: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  profileTabs: {
    flexDirection: "row",
    padding: 16,
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
    fontSize: 13,
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
  },
  profileRowLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#2c2c2c",
  },
  profileRowValue: {
    fontSize: 15,
    fontWeight: "500",
    color: "#7f7f7f",
    marginRight: 4,
  },
  profileRowContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  profileActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  profileActionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  radioImage: {
    width: 20,
    height: 20,
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
});

export default Profile;
