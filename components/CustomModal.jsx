import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "./Button";

const CustomModal = ({ messageType, buttonText, headerText, coreText }) => {
  const messageColors = {
    fail: "#ef4444",
    warning: "#ca8a04",
    success: "#16a34a",
    decision: "#d97706",
    info: "#0284c7",
  };

  const messageIcon = {
    fail: "close",
    warning: "alert-circle-outline",
    success: "check",
    decision: "alert-circle-check-outline",
    info: "information-variant",
  };

  const color = messageColors[messageType] || messageColors.info; // Default to 'info' color if messageType is not found
  const iconName = messageIcon[messageType] || messageIcon.info; // Default to 'info' color if messageType is not found

  return (
    <Modal animationType="slide" visible={true} transparent={true}>
      <Pressable style={styles.container}>
        <View style={styles.modalView}>
          <View style={[styles.modalIcon, { backgroundColor: color }]}>
            <MaterialCommunityIcons name={iconName} size={75} color="white" />
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeaderText}>{headerText}</Text>
            <Text style={styles.modalHeaderMessage}>{coreText}</Text>
            {messageType === "info" || messageType === "success" || messageType === "fail" ? (
              <Button
                title={buttonText}
                buttonStyle={{ width: "100%", backgroundColor: color }}
              />
            ) : (
              <View style={styles.buttonContainer}>
                <Button
                  title="Cancel"
                  buttonStyle={{ width: "48%", backgroundColor: 'gray' }}
                />
                <Button
                  title="Proceed"
                  buttonStyle={{ width: "48%", backgroundColor: color }}
                />
                
              </View>
            )}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalView: {
    backgroundColor: "#f3f4f6",
    width: "100%",
    alignItems: "center",
    paddingTop: 45,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  modalIcon: {
    height: 100,
    width: 100,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -50,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  modalContent: {
    width: "100%",
    alignItems: "center",
    padding: 20,
    gap: 16,
  },
  modalHeaderText: {
    fontWeight: "bold",
    fontSize: 24,
  },
  modalHeaderMessage: {
    fontSize: 18,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
