import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Carousel from "../../components/Carousel";
import Loading from "../../components/Loading";
import { BackHandler } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { ROUTES } from "../../assets/constants";
import FiltersModal from "../../components/FiltersModal";
import { fetchPolls } from "../../services/pollService";
import moment from 'moment';
import CustomModal from "../../components/CustomModal";

var limit = 0;

const Quizz = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [polls, setPolls] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [leaveAppModalVisible, setLeavAppModalVisible] = useState(false);

  const getPolls = async () => {
    if (!hasMore) {
      return null;
    }
    limit += 10; // get 10 more polls every time
    console.log("Fetching polls:", limit);
    let res = await fetchPolls(limit);
  
    if (res.success) {
      if (polls.length === res.data.length || res.data.length <= 10) {
        setHasMore(false);
      }
      const formattedPolls = res.data.map((poll) => {
        return {
          key: poll.id.toString(),
          author: poll.user.pseudonyme,
          date: poll.date,
          answers: poll.pollAnswers,
          comments: poll.pollComments[0]?.count || 0,
          category: poll.category,
          choices: poll.choices,
          description: poll.body,
          visibility: poll.visibility,
          creationDate: moment(poll?.created_at).format('MMM D')
        };
      });
      setPolls((prevPolls) => [...prevPolls, ...formattedPolls]);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        if (isFocused) {
          setLeavAppModalVisible(true);
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
    }, [isFocused, navigation])
  );

  const handleModalClose = () => {
    setLeavAppModalVisible(false);
  };

  const handleProceed = () => {
    BackHandler.exitApp();
  };

  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getPolls(); // Fetch initial polls
  }, []);

  if (polls.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {leaveAppModalVisible && (
        <CustomModal
          messageType="decision"
          buttonText="Quitter"
          headerText="Quitter l'application"
          coreText="Voulez-vous vraiment quitter l'application ?"
          onClose={handleModalClose}
          onProceed={handleProceed}
        />
      )}

      <Carousel
        polls={[{ key: "empty-left" }, ...polls, { key: "empty-right" }]}
        scrollX={scrollX}
        getPolls={getPolls}
        navigation={navigation}
      />
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
