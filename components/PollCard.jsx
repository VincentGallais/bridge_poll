import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  Dimensions,
} from "react-native";
import Tags from "./Tags";
import StackedCircularAvatar from "./StackedCircularAvatar";
import AwesomeButton from "react-native-really-awesome-button";
import cardBackgroundImage from "../assets/images/card_background.png";
import Icon from "../assets/icons";
import { createPollAnswer } from "../services/postService";
import AnimatedProgress from "../components/AnimatedProgress";
import { LinearGradient } from "expo-linear-gradient";

const SPACING = 5;
const { width } = Dimensions.get("window");
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.87 : width * 0.9;

const PollCard = ({ item, translateY, user }) => {
  const [userAnswer, setUserAnswer] = useState(null);

  useEffect(() => {
    const answers = item.answers || [];
    const currentUserAnswer = answers.find(
      (answer) => answer.userId === user?.id
    );
    setUserAnswer(currentUserAnswer || null);
  }, [item.answers, user?.id]);

  const buttonWidth = ITEM_SIZE / (item.choices.length + 1);
  const answers = item.answers || [];
  const isSubmittedByUser = item?.author === user?.pseudonyme;

  const handleVote = async (choice) => {
    if (userAnswer) {
      return;
    }
    const newAnswer = {
      userId: user.id,
      pollId: item.key,
      answer: choice,
    };
    const response = await createPollAnswer(newAnswer);
    if (response.success) {
      setUserAnswer(newAnswer);
      item.answers.push(newAnswer);
    } else {
      console.log("Failed to record answer:", response.msg);
    }
  };

  const getGradientColors = (visibility) => {
    switch (visibility) {
      case "gold":
        return ["#FFD700", "#FF8C00"];
      case "diamond":
        return ["#00FFFF", "#0000FF"];
      case "visible":
      default:
        return ["#FFFFFF", "#FFFFFF"];
    }
  };

  return (
    <View style={{ width: ITEM_SIZE }}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        <LinearGradient
          colors={getGradientColors(item.visibility)}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradientBorder}
        >
          <View style={styles.cardContainer}>
            <Image
              source={cardBackgroundImage}
              resizeMode="cover"
              style={styles.backgroundImage}
            />
            <View style={{ position: "absolute", width: "100%" }}>
              <View style={styles.header}>
                <Tags tags={[item.category]} />
                <View style={styles.iconContainer}>
                  <TouchableOpacity style={styles.iconButton}>
                    <Icon
                      name="share"
                      strokeWidth={2.5}
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{
                top: -20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <StackedCircularAvatar size="small" answers={answers.length} />
              <Text style={styles.date}>{item.creationDate}</Text>
            </TouchableOpacity>
            <View style={styles.votingButtonContainer}>
              {userAnswer ? (
                <View>
                  <Text>
                    Affichage des réponses, user_vote_{userAnswer.answer}
                  </Text>
                  <AnimatedProgress
                    widthPct={56}
                    barWidth={200}
                    barColor="green"
                  />
                </View>
              ) : (
                item.choices.map((choice, index) => (
                  <AwesomeButton
                    key={index}
                    width={buttonWidth}
                    height={70}
                    backgroundColor="orange"
                    onPress={() => handleVote(choice)}
                  >
                    {choice}
                  </AwesomeButton>
                ))
              )}
            </View>
            <View style={styles.footer}>
              {isSubmittedByUser ? (
                <Text style={styles.text}>Submitted by you</Text>
              ) : (
                <TouchableOpacity>
                  <Text style={styles.text}>Submitted by {item?.author}</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity>
                <Text style={{ fontSize: 14 }}>{item?.comments} comments</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientBorder: {
    padding: 5,
    borderRadius: 24,
    marginHorizontal: SPACING,
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 24,
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  backgroundImage: {
    width: "100%",
    height: ITEM_SIZE * 1.3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 10,
    marginTop: 10,
    marginLeft: 20,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    width: 48,
    height: 48,
    backgroundColor: "white",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  votingButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 10,
    gap: 8,
  },
  footer: {
    flexDirection: "row",
    margin: 16,
    justifyContent: "space-between",
  },
  date: {
    borderRadius: 9999,
    borderWidth: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    textAlign: "center",
    marginRight: 8,
    lineHeight: 20,
  },
});

export default PollCard;
