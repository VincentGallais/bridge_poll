import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Tags from "../../components/Tags";
import StackedCircularAvatar from "../../components/StackedCircularAvatar";
import AnimatedProgress from "../../components/AnimatedProgress";
import Icon from "../../assets/icons";
import AwesomeButton from "react-native-really-awesome-button";
import { calculatePercentage } from "../../helpers/common";

const PollDetails = () => {
  const route = useRoute();
  const { userAnswer, pollDetails, answers } = route.params;

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(pollDetails.comments || []);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, text: newComment }]);
      setNewComment("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Tags tags={[pollDetails.category]} />
        <Text style={styles.date}>{pollDetails.creationDate}</Text>
      </View>
      <Text style={styles.title}>{pollDetails.title}</Text>
      <Text style={styles.description}>{pollDetails.description}</Text>
      <View style={styles.votingContainer}>
        {pollDetails.choices.map((choice, index) => (
          <View key={index} style={styles.progressItem}>
            <Text style={styles.choiceText}>{choice}</Text>
            <View style={styles.progressBarContainer}>
              <AnimatedProgress
                widthPct={calculatePercentage({ choice, answers })}
                barWidth={200}
                barColor={userAnswer?.answer === choice ? "green" : "gray"}
              />
              <Text style={styles.percentageText}>
                {Math.round(calculatePercentage({ choice, answers }))}%
              </Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.commentSection}>
        <Text style={styles.commentSectionTitle}>Comments</Text>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentItem}>
              <Text>{item.text}</Text>
            </View>
          )}
        />
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <Button title="Add Comment" onPress={handleAddComment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  votingContainer: {
    marginBottom: 30,
  },
  progressItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  choiceText: {
    marginRight: 10,
    fontSize: 16,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  percentageText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
  commentSection: {
    marginTop: 20,
  },
  commentSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  commentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default PollDetails;
