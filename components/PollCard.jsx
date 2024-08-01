import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Platform, Dimensions } from "react-native";
import Tags from "./Tags";
import StackedCircularAvatar from "./StackedCircularAvatar";
import AwesomeButton from "react-native-really-awesome-button";
import cardBackgroundImage from "../assets/images/card_background.png";
import Icon from "../assets/icons";
import { createPollAnswer } from "../services/postService";

const SPACING = 5;
const { width } = Dimensions.get("window");
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.87 : width * 0.9;

const PollCard = ({ item, translateY, user }) => {
  const [userAnswer, setUserAnswer] = useState(null);
  useEffect(() => {
    const answers = item.answers || [];
    const currentUserAnswer = answers.find(answer => answer.userId === user?.id);
    setUserAnswer(currentUserAnswer || null);
  }, [item.answers, user?.id]);

  const buttonWidth = ITEM_SIZE / (item.choices.length + 1);
  const answers = item.answers || [];
  
  const handleVote = async (choice) => {
    if (userAnswer) {
      return;
    }

    const newAnswer = {
      userId: user.id,
      pollId: item.key,
      answer: choice
    };

    console.log(newAnswer);

    const response = await createPollAnswer(newAnswer);

    if (response.success) {
      setUserAnswer(newAnswer);
      item.answers.push(newAnswer); 
    } else {
      console.log("Failed to record answer:", response.msg);
    }
  };

  return (
    <View style={{ width: ITEM_SIZE }}>
      <Animated.View style={{ ...styles.cardContainer, transform: [{ translateY }] }}>
        <Image source={cardBackgroundImage} resizeMode="cover" style={styles.backgroundImage} />
        <View style={{ position: "absolute", width: "100%" }}>
          <View style={styles.header}>
            <Tags tags={[item.category]} />
            <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.iconButton}>
                <Icon name="share" strokeWidth={2.5} size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity style={{ alignSelf: 'flex-start', top: -20 }}>
          <StackedCircularAvatar size="small" answers={answers.length} />
        </TouchableOpacity>
        <View style={styles.votingButtonContainer}>
          {userAnswer ? (
            <Text>Vous avez répondu {userAnswer.answer}</Text>
          ) : (
            item.choices.map((choice, index) => (
              <AwesomeButton
                key={index}
                width={buttonWidth}
                height={70}
                backgroundColor="orange"
                onPress={() => handleVote(choice)} // Fonction pour gérer le vote
              >
                {choice}
              </AwesomeButton>
            ))
          )}
        </View>
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={{ fontSize: 14 }}>Submitted by {item?.author}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ fontSize: 14 }}>{item?.comments} comments</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: SPACING,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 4,
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
  }
});

export default PollCard;
