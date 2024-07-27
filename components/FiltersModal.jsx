import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View, Text } from "react-native";

const FiltersModal = ({
  modalVisible,
  closeModal,
  filterOptions = {},
  onFilterChange,
}) => {
  // Render buttons
  const renderButton = (type, options) =>
    options.map((option) => (
      <TouchableOpacity
        key={option}
        style={[
          styles.button,
          filterOptions[type] === option && styles.selectedButton,
        ]}
        onPress={() => onFilterChange(type, option)}
      >
        <Text
          style={
            filterOptions[type] === option
              ? styles.selectedButtonText
              : styles.buttonText
          }
        >
          {option}
        </Text>
      </TouchableOpacity>
    ));

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
            {renderButton("quizzDate", ["Last Week", "Last Month", "All"])}
          </View>

          <Text style={styles.subtitle}>Quizz Type</Text>
          <View style={styles.buttonGroup}>
            {renderButton("quizzType", ["Bid", "Lead", "Suit Play"])}
          </View>

          <Text style={styles.subtitle}>Quizz Afinity</Text>
          <View style={styles.buttonGroup}>
            {renderButton("quizzAfinity", ["New", "Followed", "Friends", "All"])}
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
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
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
