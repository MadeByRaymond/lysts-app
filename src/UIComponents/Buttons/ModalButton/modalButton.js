import React from 'react'
import { StyleSheet, Text, View, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native'

import {Touchable} from '../../../includes/variables'

const modalButton = (props) => {
    return (
        <View style={styles.buttonWrapper}>
            <Touchable useForeground={true} activeOpacity={0.9} {...props}>
                <View style={[styles.button, props.disabled ? styles.buttonDisabled : null]}>
                    <Text style={styles.buttonText}>{props.buttonText}</Text>
                </View>
            </Touchable>
        </View>
    )
}

export default modalButton

const styles = StyleSheet.create({
    buttonWrapper:{
        overflow: 'hidden',
        borderRadius: 1000,
    },
    button: {
        backgroundColor: '#F2F2F2',
        borderRadius: 1000,
        height:56,
        width: 220,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonDisabled:{
        opacity: 0.6
    },
    buttonText:{
        // letterSpacing: 0.6,
        textAlign: 'center',
        fontSize: 19,
        fontFamily: 'Poppins-SemiBold',
        color: '#44577C',
    }
})

