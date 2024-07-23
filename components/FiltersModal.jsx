// CountryPickerModal.jsx
import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View, Text } from "react-native";

const FiltersModal = ({ modalVisible, closeModal }) => {
  const [quizzDate, setQuizzDate] = useState("Yesterday");
  const [quizzType, setQuizzType] = useState("Lead");

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
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
                quizzDate === "Yesterday" && styles.selectedButton,
              ]}
              onPress={() => setQuizzDate("Yesterday")}
            >
              <Text
                style={
                  quizzDate === "Yesterday"
                    ? styles.selectedButtonText
                    : styles.buttonText
                }
              >
                Yesterday
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
                quizzDate === "Last Year" && styles.selectedButton,
              ]}
              onPress={() => setQuizzDate("Last Year")}
            >
              <Text
                style={
                  quizzDate === "Last Year"
                    ? styles.selectedButtonText
                    : styles.buttonText
                }
              >
                Last Year
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
                quizzType === "Maniement" && styles.selectedButton,
              ]}
              onPress={() => setQuizzType("Maniement")}
            >
              <Text
                style={
                  quizzType === "Maniement"
                    ? styles.selectedButtonText
                    : styles.buttonText
                }
              >
                Maniement
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
