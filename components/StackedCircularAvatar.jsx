// StackedCircularAvatar.js
import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

const StackedCircularAvatar = ({ size = 'small', additionalUsers = 0 }) => {
  const sizes = {
    small: 32,
    medium: 48,
    large: 64
  };

  const avatarSize = sizes[size] || sizes.small;
  const marginLeft = -(avatarSize / 4);

  return (
    <View style={[styles.avatarWrapper, { width: (avatarSize * 4) + (additionalUsers > 0 ? avatarSize : 0), height: avatarSize }]}>
      {[...Array(4)].map((_, index) => (
        <Image
          key={index}
          source={{
            uri: `https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80`,
          }}
          style={[styles.avatar, { width: avatarSize, height: avatarSize, marginLeft }]}
        />
      ))}
      {additionalUsers > 0 && (
        <View style={[styles.additionalAvatar, { width: avatarSize, height: avatarSize, marginLeft }]}>
          <Text style={styles.additionalText}>+{additionalUsers}</Text>
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
