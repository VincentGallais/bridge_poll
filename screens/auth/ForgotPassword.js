import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const ForgotPassword = () => {
  const route = useRoute();
  const userId = route.params?.userId;

  return (
    <View style={styles.container}>
      <Text>Forgot Password</Text>
      <Text>Params: {userId ? userId : 'No User ID Provided'}</Text>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
