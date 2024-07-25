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

export default function Publications() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState("");
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      const { data, error } = await supabase.from("polls").select("*");
      if (error) {
        console.error("Error fetching polls:", error);
        return;
      }
      setPolls(data);
    };
    fetchPolls();
  }, []);

  useEffect(() => {
    const fetchPolls = async () => {
      const { data, error } = await supabase.from("polls").select("*");
      if (error) {
        console.error("Error fetching polls:", error);
        return;
      }
      setPolls(data);
    };
    fetchPolls();
  }, []);

  const createPoll = async () => {
    setError("");
    if (!question) {
      setError("Please provide the question");
      return;
    }
    const validOptions = options.filter((o) => !!o);
    if (validOptions.length < 2) {
      setError("Please provide at least 2 valid options");
      return;
    }

    const { data, error } = await supabase
      .from("polls")
      .insert([{ question, options: validOptions }])
      .select();
    if (error) {
      Alert.alert("Failed to create the poll");
      console.log(error);
      return;
    } else {
      setPolls([
        ...polls,
        { id: (polls.length + 1).toString(), question, options: validOptions },
      ]);
      setQuestion("");
      setOptions(["", ""]);
      console.warn("Poll successfully created");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Create New Poll</Text>
      <TextInput
        value={question}
        onChangeText={setQuestion}
        placeholder="Type your question here"
        style={styles.input}
      />

      <Text style={styles.label}>Options</Text>
      {options.map((option, index) => (
        <View key={index} style={styles.optionContainer}>
          <TextInput
            value={option}
            onChangeText={(text) => {
              const updated = [...options];
              updated[index] = text;
              setOptions(updated);
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
              const updated = [...options];
              updated.splice(index, 1);
              setOptions(updated);
            }}
            style={styles.removeOptionIcon}
          />
        </View>
      ))}
      <Button title="Add option" onPress={() => setOptions([...options, ""])} />
      <Button title="Create Poll" onPress={createPoll} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.header}>Submited Polls :</Text>
      <FlatList
        data={polls}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.pollItem}>
            <Text style={styles.pollQuestion}>{item.question}</Text>
            <View style={{ flexDirection: "row" }}>
              {item.options.map((option, index) => (
                <Text key={index} style={styles.pollOption}>
                  - {option}
                </Text>
              ))}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No polls created yet</Text>
        }
      />
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
