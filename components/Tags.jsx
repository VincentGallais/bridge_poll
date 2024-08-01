import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Tags({ tags }) {
  return (
    <View style={styles.tags}>
      {tags?.map((tag, i) => {
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
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 14,
    backgroundColor: '#fff'
  },
  tagText: {
    fontSize: 18, 
    fontWeight: '400',
    color: 'black'
  }
});
