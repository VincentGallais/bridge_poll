import React from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
} from "react-native";
import ImagePicker from "react-native-image-picker";

const PhotoModal = ({ visible, onClose, setProfileImage }) => {
  const handleImagePicker = (source) => {
    const options = {
      title: "Select Photo",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker[source](options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        setProfileImage({ uri: response.uri });
      }
    });
  };

  const handleDeleteImage = () => {
    Alert.alert(
      "Delete Photo",
      "Are you sure you want to delete this photo?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => setProfileImage(null),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Choose an option</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              handleImagePicker("launchCamera");
              onClose();
            }}
          >
            <Text style={styles.modalButtonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              handleImagePicker("launchImageLibrary");
              onClose();
            }}
          >
            <Text style={styles.modalButtonText}>Choose from Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              handleDeleteImage();
              onClose();
            }}
          >
            <Text style={styles.modalButtonText}>Delete Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default PhotoModal;
