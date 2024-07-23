import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

const notifications = [
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
];

export default function Support() {
  const [saved, setSaved] = useState([]);

  const handleSave = useCallback(
    (id) => {
      if (saved.includes(id)) {
        // remove listing id from the `saved` array
        setSaved(saved.filter((val) => val !== id));
      } else {
        // add listing id to the `saved` array
        setSaved([...saved, id]);
      }
    },
    [saved]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <ScrollView contentContainerStyle={styles.content}>
        {notifications.map(({ id, name, date }, index) => {
          const isSaved = saved.includes(id);

          return (
            <TouchableOpacity
              key={id}
              onPress={() => {
                // handle onPress
              }}
            >
              <View style={styles.card}>
                <View style={styles.cardLikeWrapper}>
                  <TouchableOpacity onPress={() => handleSave(id)}>
                    <View style={styles.cardLike}>
                      <FontAwesome
                        color={isSaved ? "#ea266d" : "#222"}
                        name="heart"
                        solid={isSaved}
                        size={20}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{name}</Text>
                  </View>

                  <Text style={styles.cardDates}>{date}</Text>
                </View>
              </View>
            </TouchableOpacity>
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
  /** Card */
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
  cardLikeWrapper: {
    position: "absolute",
    zIndex: 1,
    top: 12,
    right: 12,
  },
  cardLike: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
});
