import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Tags({ tags }) {
  return (
    <View style={styles.tags}>
      {tags.map((tag, i) => {
        return (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 4,
  },
  tag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#ccc',
    marginRight: 4,
  },
  tagText: {
    fontSize: 12, 
    opacity: 0.6
  }
});
