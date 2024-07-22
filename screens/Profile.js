import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../assets/constants/Colors";
import ProfileImage from "../assets/images/profile.jpg";
import FeatherIcon from "react-native-vector-icons/Feather";

const SECTIONS = [
  {
    header: "Preferences",
    icon: "settings",
    items: [
      {
        id: "language",
        label: "Language",
        type: "input",
      },
    ],
  },
  {
    header: "Help",
    icon: "help-circle",
    items: [
      {
        id: "bla1",
        label: "bla1",
        type: "input",
      },
      {
        id: "bla2",
        label: "bla2",
        type: "input",
      },
      {
        id: "bla3",
        label: "bla3",
        type: "toggle",
      },
    ],
  },
];

const Profile = () => {
  const [form, setForm] = React.useState({
    language: "English",
    bla3: true,
  });
  const [value, setValue] = React.useState(0);
  const { tabs, items } = React.useMemo(() => {
    return {
      tabs: SECTIONS.map(({ header, icon }) => ({
        header,
        icon,
      })),
      items: SECTIONS[value].items,
    };
  }, [value]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.White }}>
      <StatusBar backgroundColor={Colors.Green500} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>blabla</Text>
        </View>

        <View style={styles.profile}>
          <View style={styles.profileHeader}>
            <Image
              alt="Profile Picture"
              source={ProfileImage}
              style={styles.profileAvatar}
            />

            <View style={styles.profileBody}>
              <Text style={styles.profileName}>FR Vincent Gallais</Text>
              <Text style={styles.profileLevel}>Niveau Expert</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 16, gap: 16 }}>
            <Text>15 amis</Text>

            <Text>30 sondages</Text>
          </View>

          <View style={styles.profileActionsContainer}>
            <TouchableOpacity
              onPress={() => {
                //handleOnpress
              }}
              style={styles.profileActionButton}

            >
              <View style={{...styles.profileAction, backgroundColor: "#007bff"}}>
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
              <View style={{...styles.profileAction, backgroundColor: "#28a745"}}>
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
                  //handle onPress
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
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
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
    width: 60,
    height: 60,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 12,
  },
  profileBody: {
    flex: 1,
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
});
