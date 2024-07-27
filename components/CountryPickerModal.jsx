import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  View,
  Text,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { COUNTRIES } from "../assets/constants";

const CountryPickerModal = ({
  visible,
  onClose,
  onSelect,
  initialSelectedCountry,
}) => {
  const [value, setValue] = useState(() => {
    const index = COUNTRIES.findIndex(
      (country) => country.id === initialSelectedCountry
    );
    return index >= 0 ? index : null;
  });

  useEffect(() => {
    const index = COUNTRIES.findIndex(
      (country) => country.id === initialSelectedCountry
    );
    setValue(index >= 0 ? index : null);
  }, [initialSelectedCountry]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      animationType="fade"
    >
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Choisissez un pays</Text>
            <TouchableOpacity onPress={onClose} style={styles.headerClose}>
              <FeatherIcon color="#1d1d1d" name="x" size={24} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            {COUNTRIES.map(({ id }, index) => {
              const isActive = value === index;
              return (
                <TouchableOpacity
                  key={id}
                  onPress={() => {
                    setValue(index);
                    onSelect(id);
                    onClose();
                  }}
                  style={styles.radioWrapper}
                >
                  <Image
                    alt={`Flag of ${id}`}
                    style={styles.radioImage}
                    source={{ uri: `https://flagsapi.com/${id}/flat/64.png` }}
                  />

                  <View
                    style={[styles.radio, index === 0 && { borderTopWidth: 0 }]}
                  >
                    {/*Todo : Faire la traduction */}
                    <Text style={styles.radioLabel}>{id}</Text>
                    <View
                      style={[
                        styles.radioCheck,
                        isActive && styles.radioCheckActive,
                      ]}
                    >
                      <FontAwesome
                        color="#fff"
                        name="check"
                        style={!isActive && { display: "none" }}
                        size={12}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    maxHeight: 400,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  headerClose: {
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "#1d1d1d",
    paddingLeft: 12,
  },
  content: {
    marginTop: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e8e8e8",
  },
  radio: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#e8e8e8",
    height: 54,
    paddingRight: 24,
  },
  radioWrapper: {
    paddingLeft: 24,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  radioImage: {
    width: 30,
    height: 30,
    marginRight: 12,
  },
  radioLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222222",
    marginBottom: 2,
  },
  radioCheck: {
    width: 22,
    height: 22,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    borderWidth: 1,
    borderColor: "#999B9A",
  },
  radioCheckActive: {
    borderColor: "#007bff",
    backgroundColor: "#007bff",
  },
});

export default CountryPickerModal;
