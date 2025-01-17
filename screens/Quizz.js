import * as React from "react";
import { View, Animated, Text, StyleSheet } from "react-native";
import Carousel from "../components/Carousel";

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

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

const Quizz = () => {
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
});
