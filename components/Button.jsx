import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { theme } from '../assets/constants/theme'
import Loading from './Loading'

const Button = ({
    buttonStyle,
    textStyle,
    title='',
    onPress=()=>{},
    loading=false,
    hasShadow=true,
}) => {

    const shadowStyle = {
        shadowColor: theme.colors.dark,
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4
    }
    if(loading){
        return (
            <View style={[styles.button, buttonStyle, {backgroundColor: 'white'}]}>
                <Loading />
            </View>

        )
    }
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle, hasShadow && shadowStyle]}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        paddingVertical: 16,
        alignItems: 'center',
        borderCurve: 'continuous',
        borderRadius: theme.radius.xl,
    },
    text: {
        fontSize: 20,
        color: 'white',
        fontWeight: theme.fonts.bold
    }
})

export default Button;