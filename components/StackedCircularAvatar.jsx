// StackedCircularAvatar.js
import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

const StackedCircularAvatar = ({ size = 'small', answers = 0 }) => {
  const sizes = {
    small: 38,
    medium: 48,
    large: 64
  };

  const avatarSize = sizes[size] || sizes.small;
  const marginLeft = -(avatarSize / 4);

  return (
    <View style={[styles.avatarWrapper, { width: (avatarSize * Math.min(answers, 4)) + (answers > 4 ? avatarSize : avatarSize - 16), height: avatarSize }]}>
      {[...Array(Math.min(answers, 4))].map((_, index) => (
        <Image
          key={index}
          source={{
            uri: `https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80`,
          }}
          style={[styles.avatar, { width: avatarSize, height: avatarSize, marginLeft }]}
        />
      ))}
      {answers > 4 && (
        <View style={[styles.additionalAvatar, { height: avatarSize, marginLeft, minWidth: avatarSize, padding: sizes[size]/6 }]}>
          <Text style={{...styles.additionalText}}>+ {answers - 4}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    borderRadius: 9999,
    borderWidth: 3,
    borderColor: '#fff',
  },
  additionalAvatar: {
    borderRadius: 9999,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  additionalText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default StackedCircularAvatar;
