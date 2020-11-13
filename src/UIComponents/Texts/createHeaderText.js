import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const createHeaderText = (props) => {
    return (
        <Text style={styles.text}>{props.children}</Text>
    )
}

export default createHeaderText

const styles = StyleSheet.create({
    text:{
        lineHeight: 45,
        color: '#515D70',
        fontSize: 38,
        fontFamily: 'Poppins-SemiBold'
    }
})
