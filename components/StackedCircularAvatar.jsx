// StackedCircularAvatar.js
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const StackedCircularAvatar = ({ size = 'small' }) => {
  const sizes = {
    small: 32,
    medium: 48,
    large: 64
  };

  const avatarSize = sizes[size] || sizes.small;
  const marginLeft = -(avatarSize / 4);

  return (
    <View style={[styles.avatarWrapper, { width: avatarSize * 4, height: avatarSize }]}>
      {[...Array(4)].map((_, index) => (
        <Image
          key={index}
          source={{
            uri: `https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80`,
          }}
          style={[styles.avatar, { width: avatarSize, height: avatarSize, marginLeft }]}
        />
      ))}
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
});

export default StackedCircularAvatar;
