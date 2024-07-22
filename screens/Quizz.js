import * as React from "react";
import { View, Animated, Text } from "react-native";
import Carousel from "../components/Carousel";
import { styles } from "../assets/styles";

const defaultMovies = [
  {
    key: "1",
    title: "Default Movie 1",
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1200x800",
    genres: ["Action", "Adventure"],
    description: "This is a default movie description.",
  },
  {
    key: "2",
    title: "Default Movie 2",
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1200x800",
    genres: ["Drama", "Thriller"],
    description: "This is another default movie description.",
  },
  {
    key: "3",
    title: "Default Movie 2",
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1200x800",
    genres: ["Drama", "Thriller"],
    description: "This is another default movie description.",
  },
  {
    key: "4",
    title: "Default Movie 2",
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1200x800",
    genres: ["Drama", "Thriller"],
    description: "This is another default movie description.",
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
