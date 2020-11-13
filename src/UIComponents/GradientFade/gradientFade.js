import React from 'react'
import { StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

const Top = (props) => {
    let color = props.color ? props.color : '#ffffff'
    return (
        <LinearGradient colors={[color, color + '00']} style={[styles.linearGradientTop, {...props.style}]} />
    )
}

const Bottom = (props) => {
    let color = props.color ? props.color : '#ffffff'
    return (
        <LinearGradient colors={[color + '00', color]} style={[styles.linearGradientBottom, {...props.style}]} />
    )
}

export {Top, Bottom}

const styles = StyleSheet.create({
    linearGradientTop:{
        height: 30,
        width: '100%',
        position:'absolute', 
        top: 0,
        zIndex: 20
    },
    linearGradientBottom: {
        height: 80,
        width: '100%',
        position:'absolute', 
        bottom: 0,
        zIndex: 20
    }
})
