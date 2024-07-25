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

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({ email, password });

    if (error){
      console.log(error.name, error.code);
      if (error.code === 'anonymous_provider_disabled'){
        Alert.alert("Veuillez fournir un email");
      }
      else if (error.code === 'validation_failed'){
        Alert.alert("Veuillez fournir un email et un mot de passe valides");
      }
      else if (error.code === 'weak_password'){
        Alert.alert("Veuillez fournir un mot de passe d'au moins 6 caractères");
      }
      else if (error.code === 'user_already_exists'){
        Alert.alert("Cet email est déjà utilisé");
      }
      else Alert.alert(error.message);
    } 

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          onChangeText={(text) => setEmail(text.trim())}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={(text) => setPassword(text.trim())}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>
      <View style={{marginVertical: 16, marginHorizontal: 16}}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={signUpWithEmail}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          disabled={loading}
          onPress={() => navigation.navigate(ROUTES.LOGIN)}
        >
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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