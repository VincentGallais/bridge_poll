import React from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';

function Support() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Aidez-nous à continuer de développer Bridge Poll</Text>
        <Text style={styles.subtitle}>
          Votre soutien est essentiel pour nous permettre de vous offrir une meilleure expérience. 
          Découvrez comment vous pouvez contribuer et rester informé de nos mises à jour.
        </Text>
        <Button title="En savoir plus" onPress={() => alert('Lien vers plus d\'informations')} color="#007BFF" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default Support;
