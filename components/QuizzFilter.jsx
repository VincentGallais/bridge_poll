import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const QuizzFilter = ({ onFilterPress }) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>Filter Area</Text>
        <TouchableOpacity onPress={onFilterPress}>
          <Icon name="sort" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  }
});

export default QuizzFilter;
