import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";

const QuizzFilter = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [quizzDate, setQuizzDate] = useState("Yesterday");
  const [quizzType, setQuizzType] = useState("Lead");
  const [type, setType] = useState({
    Sport: true,
    SUV: true,
    MPV: false,
    Sedan: false,
    Coupe: false,
    Hatchback: false,
  });
  const [capacity, setCapacity] = useState({
    "2 Person": true,
    "4 Person": true,
    "6 Person": false,
    "8 or More": true,
  });

  const handleTypeChange = (key) => {
    setType((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCapacityChange = (key) => {
    setCapacity((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const onFilterPress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={onFilterPress} style={styles.container}>
        <Text style={styles.text}>Apply filters</Text>
        <FeatherIcon color="#000" name="sliders" size={21} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={modalStyles.container}>
          <Text style={modalStyles.title}>Filter</Text>
          <Text style={modalStyles.subtitle}>Quizz Date</Text>
          <View style={modalStyles.buttonGroup}>
            <TouchableOpacity
              style={[
                modalStyles.button,
                quizzDate === "Yesterday" && modalStyles.selectedButton,
              ]}
              onPress={() => setQuizzDate("Yesterday")}
            >
              <Text
                style={
                  quizzDate === "Yesterday"
                    ? modalStyles.selectedButtonText
                    : modalStyles.buttonText
                }
              >
                Yesterday
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                modalStyles.button,
                quizzDate === "Last Month" && modalStyles.selectedButton,
              ]}
              onPress={() => setQuizzDate("Last Month")}
            >
              <Text
                style={
                  quizzDate === "Last Month"
                    ? modalStyles.selectedButtonText
                    : modalStyles.buttonText
                }
              >
                Last Month
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                modalStyles.button,
                quizzDate === "Last Year" && modalStyles.selectedButton,
              ]}
              onPress={() => setQuizzDate("Last Year")}
            >
              <Text
                style={
                  quizzDate === "Last Year"
                    ? modalStyles.selectedButtonText
                    : modalStyles.buttonText
                }
              >
                Last Year
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={modalStyles.subtitle}>Quizz Type</Text>
          <View style={modalStyles.buttonGroup}>
            <TouchableOpacity
              style={[
                modalStyles.button,
                quizzType === "Bid" && modalStyles.selectedButton,
              ]}
              onPress={() => setQuizzType("Bid")}
            >
              <Text
                style={
                  quizzType === "Bid"
                    ? modalStyles.selectedButtonText
                    : modalStyles.buttonText
                }
              >
                Bid
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                modalStyles.button,
                quizzType === "Lead" && modalStyles.selectedButton,
              ]}
              onPress={() => setQuizzType("Lead")}
            >
              <Text
                style={
                  quizzType === "Lead"
                    ? modalStyles.selectedButtonText
                    : modalStyles.buttonText
                }
              >
                Lead
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                modalStyles.button,
                quizzType === "Maniement" && modalStyles.selectedButton,
              ]}
              onPress={() => setQuizzType("Maniement")}
            >
              <Text
                style={
                  quizzType === "Maniement"
                    ? modalStyles.selectedButtonText
                    : modalStyles.buttonText
                }
              >
                Maniement
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={modalStyles.closeButton}
            onPress={closeModal}
          >
            <Text style={modalStyles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "f1f1f1",
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
  },
});

const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "gray",
  },
  selectedButton: {
    backgroundColor: "blue",
  },
  buttonText: {
    color: "gray",
  },
  selectedButtonText: {
    color: "white",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  closeButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default QuizzFilter;
