import * as React from "react";
import {
  View,
  Animated,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import Carousel from "../../components/Carousel";
import Loading from "../../components/Loading";
import { BackHandler } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

const defaultMovies = [
  {
    key: "1",
    author: "Vincent",
    date: "20/02/2024",
    answers: 2,
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
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1200x800",
    tags: ["Entame"],
    description: "Quelle est votre entame ?",
  },
  // Add more default movies as needed
];

const Quizz = () => {
  React.useEffect(() => {
    const backAction = () => {
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
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const [movies, setMovies] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const fetchData = async () => {
      setMovies([
        { key: "empty-left" },
        ...defaultMovies,
        { key: "empty-right" },
      ]);
    };

    if (movies.length === 0) {
      fetchData();
    }
  }, [movies]);

  if (movies.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Carousel movies={movies} scrollX={scrollX} />

      <TouchableOpacity
        style={{...styles.floatingButton, right: 16}}
        onPress={() => {
          /* Action pour le bouton "plus" */
        }}
      >
        <FeatherIcon name="plus" size={20} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={{...styles.floatingButton, left: 16}}
        onPress={() => {
          /* Action pour le bouton "filter" */
        }}
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
