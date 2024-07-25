import React, { useEffect, useState } from "react";
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
import { IMGS } from "../../assets/constants";
import FeatherIcon from "react-native-vector-icons/Feather";
import CountryPickerModal from "../../components/CountryPickerModal";
import BridgeLevelPickerModal from "../../components/BridgeLevelPickerModal";
import { COLORS } from "../../assets/constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AvatarPickerModal from "../../components/AvatarPickerModal";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../providers/AuthProvider";

const Profile = () => {
  const { user, userData } = useAuth();
  const [photoModalVisible, setPhotoModalVisible] = React.useState(false);
  const [profileImage, setProfileImage] = React.useState(IMGS.profile);
  const [userParams, setUserParams] = useState(userData);

  const handleToggleSwitch = (id) => {
    setUserParams((prevParams) => ({
      ...prevParams,
      [id]: !prevParams[id],
    }));
    console.log(`${id} Modification`);
  };

  const handleRemoveQuizz = (id) => {
    setUserParams((prevParams) => ({
      ...prevParams,
      followed_polls: prevParams.followed_polls.filter(
        (quizzId) => quizzId !== id
      ),
    }));
    console.log("Followed Quizz Modification");
  };

  const handleCountrySelect = (country) => {
    setUserParams((prevForm) => ({
      ...prevForm,
      country: country,
    }));
    setCountryModalVisible(false);
    console.log("Country Modification");
  };

  const handleLevelSelect = (bridge_level) => {
    console.log(bridge_level);
    setUserParams((prevForm) => ({
      ...prevForm,
      bridge_level: bridge_level,
    }));
    setLevelModalVisible(false);
    console.log("Bridge Level Modification");
  };

  const [tabIndex, setTabIndex] = React.useState(0);
  const [countryModalVisible, setCountryModalVisible] = React.useState(false);
  const [levelModalVisible, setLevelModalVisible] = React.useState(false);

  const SECTIONS = [
    {
      header: "followed_quizz",
      headerLabel: "Quizz suivis",
      icon: "plus",
      items:
        userParams.followed_polls.length === 0
          ? [{ id: "no_quizz", label: "Aucun quizz suivi", type: "text" }]
          : userParams.followed_polls.map((id) => ({
              id,
              label: `Quizz ${id}`,
              type: "removable",
            })),
    },
    {
      header: "preferences",
      headerLabel: "Préférences",
      icon: "settings",
      items: [
        {
          id: "country",
          label: "Country",
          type: "input",
        },
        {
          id: "bridge_level",
          label: "Bridge level",
          type: "input",
        },
        {
          id: "notifications_allowed",
          label: "Notifications",
          type: "toggle",
        },
      ],
    },
  ];

  const { tabs, items } = React.useMemo(() => {
    return {
      tabs: SECTIONS.map(({ headerLabel, header, icon }) => ({
        headerLabel,
        header,
        icon,
      })),
      items: SECTIONS[tabIndex].items,
    };
  }, [tabIndex, userParams]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.White }}>
      <View style={styles.profile}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image
              alt="Profile Picture"
              source={profileImage}
              style={{
                ...styles.profileAvatar,
                borderColor: userParams.isAdmin ? "orange" : "#ccc",
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
                style={styles.countryIcon}
                source={{
                  uri: `https://flagsapi.com/${userParams.country}/flat/64.png`,
                }}
              />
              <Text style={styles.profileName}>
                {userParams.firstname} {userParams.lastname}
              </Text>
            </View>
            {/* TODO : Convertir id en texte lisible */}
            <Text style={styles.profileLevel}>
              Bridgeur {userParams.bridge_level}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 6, gap: 16 }}>
              <Text style={{ fontSize: 15 }}>
                {userParams.friends.length < 2
                  ? `${userParams.friends.length} ami`
                  : `${userParams.friends.length} amis`}
              </Text>
              <Text style={{ fontSize: 15 }}>
                {userParams.published_polls.length < 2
                  ? `${userParams.published_polls.length} sondage`
                  : `${userParams.published_polls.length} sondages`}
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
              <Text style={styles.profileActionText}>Ajouter un ami</Text>
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

        <View style={{ flex: 1 }}>
          <View style={styles.profileTabs}>
            {tabs.map(({ headerLabel, icon }, index) => {
              const isActive = tabIndex === index;
              return (
                <View
                  key={index}
                  style={[
                    styles.profileTabWrapper,
                    isActive && { borderColor: "#6366f1" },
                  ]}
                >
                  <TouchableOpacity onPress={() => setTabIndex(index)}>
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
                        {headerLabel}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          <View style={styles.profileContentInner}>
            {tabIndex === 0 && (
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {items.map(({ label, type, id }, index) => (
                  <View key={index} style={styles.profileRowWrapper}>
                    {type === "text" ? (
                      <View style={styles.profileRow}>
                        <Text style={styles.profileRowLabel}>{label}</Text>
                      </View>
                    ) : type === "removable" ? (
                      <View style={styles.profileRow}>
                        <TouchableOpacity
                          onPress={() => handleRemoveQuizz(id)}
                          style={styles.removeIconContainer}
                        >
                          <FeatherIcon name="x" color="red" size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => console.log("Ouverture sondage", id)}
                          style={styles.contentContainer}
                        >
                          <Text style={styles.profileRowLabel}>{label}</Text>
                          <FeatherIcon
                            name="chevron-right"
                            color="#7f7f7f"
                            size={20}
                            style={styles.chevronIcon}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          if (id === "country") {
                            setCountryModalVisible(true);
                          } else if (id === "bridge_level") {
                            setLevelModalVisible(true);
                          }
                        }}
                      >
                        <View style={styles.profileRow}>
                          <Text style={styles.profileRowLabel}>{label}</Text>
                          <View style={styles.profileRowContent}>
                            {type === "input" && (
                              <Text style={styles.profileRowValue}>
                                {userParams[id]}
                              </Text>
                            )}
                            {type === "toggle" && (
                              <Switch
                                trackColor={{ true: "#007bff" }}
                                value={userParams[id]}
                                onValueChange={(value) =>
                                  setUserParams({ ...userParams, [id]: value })
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
                    )}
                  </View>
                ))}
              </ScrollView>
            )}

            {tabIndex === 1 &&
              items.map(({ label, type, id }, index) => (
                <View key={index} style={styles.profileRowWrapper}>
                  {type === "text" ? (
                    <View style={styles.profileRow}>
                      <Text style={styles.profileRowLabel}>{label}</Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        if (id === "country") {
                          setCountryModalVisible(true);
                        } else if (id === "bridge_level") {
                          setLevelModalVisible(true);
                        }
                      }}
                    >
                      <View style={styles.profileRow}>
                        <Text style={styles.profileRowLabel}>{label}</Text>

                        {/* Todo : Faire la traduction ici si country ou bridge_level */}
                        <View style={styles.profileRowContent}>
                          {type === "input" && (
                            <Text style={styles.profileRowValue}>
                              {userParams[id]}
                            </Text>
                          )}

                          {type === "toggle" && (
                            <Switch
                              trackColor={{ true: "#007bff" }}
                              value={userParams[id]}
                              onValueChange={() => handleToggleSwitch(id)}
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
                  )}
                </View>
              ))}
          </View>
        </View>
      </View>

      {/* Modals */}
      <CountryPickerModal
        visible={countryModalVisible}
        onClose={() => setCountryModalVisible(false)}
        initialSelectedCountry={userParams.country}
        onSelect={handleCountrySelect}
      />
      <BridgeLevelPickerModal
        visible={levelModalVisible}
        onClose={() => setLevelModalVisible(false)}
        initialSelectedLevel={userParams.bridge_level}
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
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3e3e3e",
  },
  profileLevel: {
    marginTop: 4,
    fontSize: 16,
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
    justifyContent: "center",
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
  },
  profileActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingHorizontal: 16,
  },
  profileActionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  countryIcon: {
    width: 26,
    height: 26,
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
  contentContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  chevronIcon: {
    marginLeft: "auto",
  },
});

export default Profile;
