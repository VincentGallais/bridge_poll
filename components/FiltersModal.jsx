// CountryPickerModal.jsx
import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View, Text } from "react-native";

const FiltersModal = ({ modalVisible, closeModal }) => {
  const [quizzDate, setQuizzDate] = useState("Last Week");
  const [quizzType, setQuizzType] = useState("Lead");
  const [quizzAfinity, setQuizzAfinity] = useState("Never Seen");

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Filtering Quizz</Text>
          <Text style={styles.subtitle}>Quizz Date</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.button,
                quizzDate === "Last Week" && styles.selectedButton,
              ]}
              onPress={() => setQuizzDate("Last Week")}
            >
              <Text
                style={
                  quizzDate === "Last Week"
                    ? styles.selectedButtonText
                    : styles.buttonText
                }
              >
                Last Week
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                quizzDate === "Last Month" && styles.selectedButton,
              ]}
              onPress={() => setQuizzDate("Last Month")}
            >
              <Text
                style={
                  quizzDate === "Last Month"
                    ? styles.selectedButtonText
                    : styles.buttonText
                }
              >
                Last Month
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                quizzDate === "All" && styles.selectedButton,
              ]}
              onPress={() => setQuizzDate("All")}
            >
              <Text
                style={
                  quizzDate === "All"
                    ? styles.selectedButtonText
                    : styles.buttonText
                }
              >
                All
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Quizz Type</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.button,
                quizzType === "Bid" && styles.selectedButton,
              ]}
              onPress={() => setQuizzType("Bid")}
            >
              <Text
                style={
                  quizzType === "Bid"
                    ? styles.selectedButtonText
                    : styles.buttonText
                }
              >
                Bid
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                quizzType === "Lead" && styles.selectedButton,
              ]}
              onPress={() => setQuizzType("Lead")}
            >
              <Text
                style={
                  quizzType === "Lead"
                    ? styles.selectedButtonText
                    : styles.buttonText
                }
              >
                Lead
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                quizzType === "Suit Play" && styles.selectedButton,
              ]}
              onPress={() => setQuizzType("Suit Play")}
            >
              <Text
                style={
                  quizzType === "Suit Play"
                    ? styles.selectedButtonText
                    : styles.buttonText
                }
              >
                Suit Play
              </Text>
            </TouchableOpacity>
            
          </View>

          <Text style={styles.subtitle}>Quizz Afinity</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.button,
                quizzAfinity === "Never Seen" && styles.selectedButton,
              ]}
              onPress={() => setQuizzAfinity("Never Seen")}
            >
              <Text
                style={
                  quizzAfinity === "Never Seen"
                    ? styles.selectedButtonText
                    : styles.buttonText
                }
              >
                Never Seen
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                quizzAfinity === "Followed" && styles.selectedButton,
              ]}
              onPress={() => setQuizzAfinity("Followed")}
            >
              <Text
                style={
                  quizzAfinity === "Followed"
                    ? styles.selectedButtonText
                    : styles.buttonText
                }
              >
                Followed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                quizzAfinity === "All" && styles.selectedButton,
              ]}
              onPress={() => setQuizzAfinity("All")}
            >
              <Text
                style={
                  quizzAfinity === "All"
                    ? styles.selectedButtonText
                    : styles.buttonText
                }
              >
                All
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FiltersModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 8,
    gap: 8,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "gray",
  },
  selectedButton: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "gray",
  },
  selectedButtonText: {
    color: "white",
  },
  closeButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 20,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});
