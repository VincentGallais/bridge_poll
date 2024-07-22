import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function Support() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Support</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Support;
