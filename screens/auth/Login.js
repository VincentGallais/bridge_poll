import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  Button,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTES } from "../../assets/constants";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const Stack = createNativeStackNavigator();

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error){
      Alert.alert("Identifiants incorrects");
    } 
    else {
      navigation.navigate(ROUTES.QUIZZ);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Login" }} />
      <Text style={{ fontWeight: "500" }}>Sign in</Text>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          onChangeText={(text) => setEmail(text.trim())}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
          style={styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={(text) => setPassword(text.trim())}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
          style={styles.input}
        />
      </View>
      <View style={{ marginVertical: 16, marginHorizontal: 16 }}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>

      <View style={{ alignItems: "center", marginVertical: 8 }}>
        <TouchableOpacity
          disabled={loading}
          onPress={() => navigation.navigate(ROUTES.REGISTER)}
        >
          <Text style={styles.signInText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center", marginVertical: 8 }}>
        <TouchableOpacity
          disabled={loading}
          onPress={() =>
            navigation.navigate(ROUTES.FORGOT_PASSWORD, {
              userId: "X0001",
            })
          }
        >
          <Text style={styles.signInText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
});
