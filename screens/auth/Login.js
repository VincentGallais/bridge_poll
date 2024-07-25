// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   SafeAreaView,
//   TouchableOpacity,
// } from 'react-native';
// import { ROUTES} from '../../assets/constants';
// import {useNavigation} from '@react-navigation/native';

// const Login = props => {
//   // const {navigation} = props;
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.main}>
//       <View style={styles.container}>
//         <View style={styles.wFull}>
//           <View style={styles.row}>
//             <Text style={styles.brandName}>Bridge Poll</Text>
//           </View>

//           <Text style={styles.loginContinueTxt}>Login in to continue</Text>
//           <TextInput style={styles.input} placeholder="Email" />
//           <TextInput style={styles.input} placeholder="Password" />

//           <View style={styles.loginBtnWrapper}>
//               {/******************** LOGIN BUTTON *********************/}
//               <TouchableOpacity
//                 onPress={() => navigation.navigate(ROUTES.QUIZZ)}
//                 activeOpacity={0.7}
//                 style={styles.loginBtn}>
//                 <Text style={styles.loginText}>Log In</Text>
//               </TouchableOpacity>
//           </View>

//           {/***************** FORGOT PASSWORD BUTTON *****************/}
//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate(ROUTES.FORGOT_PASSWORD, {
//                 userId: 'X0001',
//               })
//             }
//             style={styles.forgotPassBtn}>
//             <Text style={styles.forgotPassText}>Forgot Password?</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.footer}>
//           <Text style={styles.footerText}> Don't have an account? </Text>
//           {/******************** REGISTER BUTTON *********************/}
//           <TouchableOpacity
//             onPress={() => navigation.navigate(ROUTES.REGISTER)}>
//             <Text style={styles.signupBtn}>Sign Up</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   main: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   container: {
//     padding: 15,
//     width: '100%',
//     position: 'relative',
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   brandName: {
//     fontSize: 42,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: '#7d5fff',
//     opacity: 0.9,
//   },
//   loginContinueTxt: {
//     fontSize: 21,
//     textAlign: 'center',
//     color: '#666666',
//     marginBottom: 16,
//     fontWeight: 'bold',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 15,
//     marginVertical: 10,
//     borderRadius: 5,
//     height: 55,
//     paddingVertical: 0,
//   },
//   // Login Btn Styles
//   loginBtnWrapper: {
//     height: 55,
//     marginTop: 12,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.4,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   loginBtn: {
//     textAlign: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     height: 55,
//   },
//   loginText: {
//     color: 'red',
//     fontSize: 16,
//     fontWeight: '400',
//   },
//   forgotPassText: {
//     color: '#7d5fff',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     marginTop: 15,
//   },
//   // footer
//   footer: {
//     position: 'absolute',
//     bottom: 20,
//     textAlign: 'center',
//     flexDirection: 'row',
//   },
//   footerText: {
//     color: '#666666',
//     fontWeight: 'bold',
//   },
//   signupBtn: {
//     color: '#7d5fff',
//     fontWeight: 'bold',
//   },
//   // utils
//   wFull: {
//     width: '100%',
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   mr7: {
//     marginRight: 7,
//   },
// });







import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  Button,
  TextInput,
  Text,
} from 'react-native';
import { supabase } from '../../lib/supabase';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ROUTES} from '../../assets/constants';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});



const Stack = createNativeStackNavigator();

export default function Auth() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    else navigation.navigate(ROUTES.QUIZZ)

    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({ email, password });

    if (error) Alert.alert(error.message);
    else if (!session)
      Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Login' }} />
      <Text style={{ fontWeight: '500' }}>Sign in or Create an account</Text>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          style={styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          style={styles.input}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
});