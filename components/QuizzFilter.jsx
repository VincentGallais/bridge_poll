import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";
import FiltersModal from "../components/FiltersModal";

const QuizzFilter = () => {
  const [modalVisible, setModalVisible] = useState(false);

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

      <FiltersModal modalVisible={modalVisible} closeModal={closeModal}/>
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

export default QuizzFilter;
