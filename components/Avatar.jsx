import { Image, StyleSheet } from 'react-native'
import React from 'react'
import { theme } from '../assets/constants/theme'
import { getUserImageSrc } from '../services/imageService'

const Avatar = ({
    uri, 
    size=20, 
    rounded=theme.radius.md,
    style={}
}) => {
  return (
    <Image
        source={getUserImageSrc(uri)} 
        transition={100}
        style={[styles.avatar, {height: size, width: size, borderRadius: rounded}, style]}
    />
  )
}
const styles = StyleSheet.create({
    avatar: {
        borderCurve: 'continuous',
        borderColor: theme.colors.darkLight,
        borderWidth: 1
    }
})
export default Avatar