import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { theme } from '../assets/constants/theme'
import { hp } from '../helpers/common'

const Input = (props) => {
  return (
    <View style={[styles.container, props.containerStyle && props.containerStyle]}>
        {
            props.icon && props.icon
        }
        <TextInput
            style={{flex: 1}}
            placeholderTextColor={theme.colors.textLight}
            ref={props.inputRef && props.inputRef}
            {...props}
        />
    </View>
  )
}

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
        gap: 12
    },
})

export default Input;