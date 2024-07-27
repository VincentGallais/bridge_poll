import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import Carousel from "../../components/Carousel";
import Loading from "../../components/Loading";
import { BackHandler } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useIsFocused } from "@react-navigation/native";
import { ROUTES } from "../../assets/constants";
import FiltersModal from "../../components/FiltersModal";

const defaultMovies = [
  {
    key: "1",
    author: "Vincent",
    date: "20/02/2024",
    answers: 2,
    comments: 200,
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1200x800",
    tags: ["Enchère"],
    description: "Quelle est votre enchère ?",
  },
  {
    key: "2",
    author: "Clara",
    date: "20/02/2024",
    answers: 150,
    comments: 1,
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1200x800",
    tags: ["Entame"],
    description: "Quelle est votre entame ?",
  },
  {
    key: "3",
    author: "Vincent",
    date: "20/02/2024",
    answers: 25,
    comments: 2,
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1200x800",
    tags: ["Enchère"],
    description: "Quelle est votre enchère ?",
  },
  {
    key: "4",
    author: "Vincent",
    date: "20/02/2024",
    answers: 15,
    comments: 7,
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1200x800",
    tags: ["Entame"],
    description: "Quelle est votre entame ?",
  },
  {
    key: "5",
    author: "BRIDGE_POLL",
    date: "99/99/9999",
    answers: 15,
    comments: 5,
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1200x800",
    tags: ["Help Us"],
    description: "Submit to premium subscription",
  },
  // Add more default movies as needed
];

const Quizz = ({ navigation }) => {
  const isFocused = useIsFocused();

  // Modale de filtre sur les quizz
  const [filterOptions, setFilterOptions] = useState({
    quizzDate: "Last Week",
    quizzType: "Lead",
    quizzAfinity: "New",
  });
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const openFilterModal = () => setFilterModalVisible(true);
  const closeFilterModal = () => setFilterModalVisible(false);
  const handleFilterChange = (type, value) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [type]: value,
    }));
  };

  useEffect(() => {
    const backAction = () => {
      if (isFocused) {
        Alert.alert(
          "Quitter l'application",
          "Voulez-vous vraiment quitter l'application?",
          [
            {
              text: "Non",
              onPress: () => null,
              style: "cancel",
            },
            {
              text: "Oui",
              onPress: () => BackHandler.exitApp(),
            },
          ],
          { cancelable: false }
        );
        return true;
      } else {
        navigation.navigate(ROUTES.QUIZZ);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [isFocused, navigation]);

  const [polls, setMovies] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (polls.length === 0) {
      const fetchData = async () => {
        setMovies([
          { key: "empty-left" },
          ...defaultMovies,
          { key: "empty-right" },
        ]);
      };

      fetchData();
    }
  }, [polls]);

  if (polls.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FiltersModal
        modalVisible={filterModalVisible}
        closeModal={closeFilterModal}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
      />

      <Carousel polls={polls} scrollX={scrollX} />

      <TouchableOpacity
        style={{ ...styles.floatingButton, right: 16 }}
        onPress={() => navigation.navigate(ROUTES.PUBLICATIONS)}
      >
        <FeatherIcon name="plus" size={20} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.floatingButton, left: 16 }}
        onPress={openFilterModal}
      >
        <FeatherIcon name="sliders" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Quizz;

export const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#6200ee",
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
