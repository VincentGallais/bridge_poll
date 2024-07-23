import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { Swipeable } from "react-native-gesture-handler";

const initialNotifications = [
  {
    id: 1,
    name: "Notif 1",
    date: "Apr 23",
  },
  {
    id: 2,
    name: "Notif 2",
    date: "Apr 25",
  },
  {
    id: 3,
    name: "Notif 3",
    date: "Apr 22",
  },
  {
    id: 4,
    name: "Notif 4",
    date: "Apr 27",
  },
  {
    id: 5,
    name: "Notif 5",
    date: "Apr 28",
  },
];

export default function Notification() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleDelete = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const renderRightActions = (id) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleDelete(id)}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <ScrollView contentContainerStyle={styles.content}>
        {notifications.map(({ id, name, date }, index) => {
          return (
            <Swipeable
              key={id}
              renderRightActions={() => renderRightActions(id)}
            >
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
              >
                <View style={styles.card}>
                  <View style={styles.cardLike}>
                    <FontAwesome color="#222" name="chevron-right" size={20} />
                  </View>

                  <View style={styles.cardBody}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardTitle}>{name}</Text>
                    </View>

                    <Text style={styles.cardDates}>{date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Swipeable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  card: {
    position: "relative",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardLike: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
    top: 12,
    right: 12,
  },

  cardBody: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#232425",
    marginRight: "auto",
  },

  cardDates: {
    marginTop: 4,
    fontSize: 16,
    color: "#595a63",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "50%",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
