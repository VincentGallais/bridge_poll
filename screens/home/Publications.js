import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";
import { createPoll } from "../../services/pollService";
import CustomModal from "../../components/CustomModal";

export default function Publications() {
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [choices, setChoices] = useState(["", ""]);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const [successModalVisible, setSuccessModalVisible] = useState(false);
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
      choices: validOptions, // Utiliser les options valides
      userId: user.id,
      visibility: "under_review",
      category,
    });
    if (response.success) {
      setBody("");
      setCategory("");
      setChoices(["", ""]);
      setSuccessModalVisible(true);
    } else {
      setFailModalVisible(true);
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
          onClose={() => setSuccessModalVisible(false)}
        />
      )}

      {failModalVisible && (
        <CustomModal
          messageType="fail"
          buttonText="Close"
          headerText="Failed to create the poll"
          coreText="Please retry later"
          onClose={() => setFailModalVisible(false)}
        />
      )}

      <Text style={styles.label}>Situation</Text>
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Submit cards & bids"
        style={styles.input}
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        value={category}
        onChangeText={setCategory}
        placeholder="Type the category here"
        style={styles.input}
      />

      <Text style={styles.label}>Options</Text>
      {choices.map((option, index) => (
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
          {choices.length > 2 && (
            <Feather
              name="x"
              size={18}
              color="gray"
              onPress={() => {
                const updated = [...choices];
                updated.splice(index, 1);
                setChoices(updated);
              }}
              style={styles.removeOptionIcon}
            />
          )}
        </View>
      ))}

      {choices.length < 4 && (
        <>
          <Button
            title="Add option"
            onPress={() => setChoices([...choices, ""])}
          />
          <View style={styles.buttonSpacer} />
        </>
      )}

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
  errorText: {
    color: "crimson",
    marginTop: 10,
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
    marginBottom: 10,
  },
  removeOptionIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  buttonSpacer: {
    height: 10,
  },
});
