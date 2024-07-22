import * as React from "react";
import { View, Animated, Text, StyleSheet } from "react-native";
import Carousel from "../components/Carousel";
import Header from "../components/Header";
import QuizzFilter from "../components/QuizzFilter";

const defaultMovies = [
  {
    key: "1",
    author: "Vincent",
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1200x800",
    genres: ["Enchère"],
    description: "Quelle est votre enchère ?",
  },
  {
    key: "2",
    author: "Clara",
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1200x800",
    genres: ["Entame"],
    description: "Quelle est votre entame ?",
  },
  {
    key: "3",
    author: "Vincent",
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1200x800",
    genres: ["Enchère"],
    description: "Quelle est votre enchère ?",
  },
  {
    key: "4",
    author: "Vincent",
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1200x800",
    genres: ["Entame"],
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
      <Header notificationCount={3}/>
      <QuizzFilter/>
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
