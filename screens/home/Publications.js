import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { createPoll } from "../../services/postService";
import CustomModal from "../../components/CustomModal";

export default function Publications() {
  const [body, setBody] = useState("");
  const [choices, setChoices] = useState(["", ""]);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const [successModalVisible, setsuccessModalVisible] = useState(false);
  const [failModalVisible, setFailModalVisible] = useState(false);

  const handleCreatePoll = async () => {
    setError("");
    if (!body) {
      setError("Please provide the question");
      return;
    }
    const validOptions = choices.filter((o) => !!o);
    if (validOptions.length < 2) {
      setError("Please provide at least 2 valid options");
      return;
    }

    const response = await createPoll({
      body,
      choices,
      userId: user.id,
      visibility: "under_review",
      category: "Bidding",
    });
    if (response.success) {
      setBody("");
      setChoices(["", ""]);
      setsuccessModalVisible(true);
    } else {
      setFailModalVisible(true);
      return;
    }
  };

  return (
    <View style={styles.container}>
      {successModalVisible && (
        <CustomModal
          messageType="success"
          buttonText="Close"
          headerText="Poll successfully created"
          coreText="Our team is currently reviewing it before showing it publicly"
        />
      )}

      {failModalVisible && (
        <CustomModal
          messageType="fail"
          buttonText="Close"
          headerText="Failed to create the poll"
          coreText="Please retry later"
        />
      )}

      <Text style={styles.label}>Create New Poll</Text>
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Type your question here"
        style={styles.input}
      />

      <Text style={styles.label}>Options</Text>
      {choices?.map((option, index) => (
        <View key={index} style={styles.optionContainer}>
          <TextInput
            value={option}
            onChangeText={(text) => {
              const updated = [...choices];
              updated[index] = text;
              setChoices(updated);
            }}
            placeholder={`Option ${index + 1}`}
            style={styles.input}
          />
          <Feather
            name="x"
            size={18}
            color="gray"
            onPress={() => {
              // delete option based index
              const updated = [...choices];
              updated.splice(index, 1);
              setChoices(updated);
            }}
            style={styles.removeOptionIcon}
          />
        </View>
      ))}
      <Button title="Add option" onPress={() => setChoices([...choices, ""])} />
      <Button title="Create Poll" onPress={handleCreatePoll} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    marginTop: 32,
  },
  pollItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  pollQuestion: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  pollOption: {
    fontSize: 16,
    color: "#555",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
  },
  label: {
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  optionContainer: {
    position: "relative",
  },
  removeOptionIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  errorText: {
    color: "crimson",
    marginTop: 10,
  },
});
