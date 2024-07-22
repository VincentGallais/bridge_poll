import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.welcomeText}>Bienvenue Vincent</Text>
      <FeatherIcon name="bell" size={24} color="#333" />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginHorizontal: 16,
    paddingVertical: 8, // Optional for added spacing
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

export default Header;
