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
import CustomModal from "./CustomModal"; // Assurez-vous d'importer le CustomModal

const SPACING = 5;
const { width } = Dimensions.get("window");
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.87 : width * 0.9;

const PollCard = ({ item, translateY, user }) => {
  const [userAnswer, setUserAnswer] = useState(null);
  const [answers, setAnswers] = useState(item.answers || []);
  const [confirmVoteModalVisible, setConfirmVoteModalVisible] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);

  useEffect(() => {
    const currentUserAnswer = answers.find(
      (answer) => answer.userId === user?.id
    );
    setUserAnswer(currentUserAnswer || null);
  }, [answers, user?.id]);

  const buttonWidth = ITEM_SIZE / (item.choices.length + 1);
  const isSubmittedByUser = item?.author === user?.pseudonyme;

  const handleVote = (choice) => {
    if (userAnswer) {
      return;
    }
    setSelectedChoice(choice);
    setConfirmVoteModalVisible(true);
  };

  const confirmVote = async () => {
    if (!selectedChoice) return;

    const newAnswer = {
      userId: user.id,
      pollId: item.key,
      answer: selectedChoice,
    };
    const response = await createPollAnswer(newAnswer);
    if (response.success) {
      setUserAnswer(newAnswer);
      setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
    } else {
      console.log("Failed to record answer:", response.msg);
    }
    setConfirmVoteModalVisible(false);
    setSelectedChoice(null);
  };

  const cancelVote = () => {
    setConfirmVoteModalVisible(false);
    setSelectedChoice(null);
  };

  const calculatePercentage = (choice) => {
    const totalVotes = answers.length;
    if (totalVotes === 0) return 0;
    const votesForChoice = answers.filter((answer) => answer.answer === choice).length;
    return (votesForChoice / totalVotes) * 100;
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
            <View
              style={{
                top: -20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity>
                <StackedCircularAvatar size="small" answers={answers.length} />
              </TouchableOpacity>
              <Text style={styles.date}>{item.creationDate}</Text>
            </View>
            <View style={styles.votingButtonContainer}>
              {userAnswer ? (
                <View style={styles.progressContainer}>
                  {item.choices.map((choice, index) => (
                    <View key={index} style={styles.progressItem}>
                      <Text style={styles.choiceText}>{choice}</Text>
                      <View style={styles.progressBarContainer}>
                        <AnimatedProgress
                          widthPct={calculatePercentage(choice)}
                          barWidth={200}
                          barColor={userAnswer.answer === choice ? "green" : "gray"}
                        />
                        <Text style={styles.percentageText}>
                          {Math.round(calculatePercentage(choice))}%
                        </Text>
                      </View>
                    </View>
                  ))}
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
      
      {/* Afficher le modal de confirmation */}
      {confirmVoteModalVisible && (
        <CustomModal
          messageType="confirmVote"
          buttonText="Close"
          headerText="Confirm Your Vote"
          coreText={`Are you sure to vote for "${selectedChoice}"?`}
          onClose={cancelVote}
          onProceed={confirmVote}
        />
      )}
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
    paddingHorizontal: 8
  },
  progressContainer: {
    flexDirection: "column",
  },
  progressItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  choiceText: {
    marginRight: 8
  },
  percentageText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
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
