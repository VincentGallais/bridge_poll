import { View, TextInput, StyleSheet } from 'react-native'
import React, { forwardRef } from 'react'
import { theme } from '../assets/constants/theme'

const Input = forwardRef((props, ref) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      {props.icon && props.icon}
      <TextInput
        style={{ flex: 1 }}
        placeholderTextColor={theme.colors.textLight}
        ref={ref}
        {...props}
      />
    </View>
  )
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xxl,
    borderCurve: 'continuous',
    paddingHorizontal: 18,
    gap: 12,
  },
});

export default Input;
