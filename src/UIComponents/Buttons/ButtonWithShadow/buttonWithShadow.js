import React from 'react'
import { StyleSheet, Text, View, Dimensions, Platform, TouchableNativeFeedback, TouchableOpacity, PixelRatio  } from 'react-native';

import { Shadow } from 'react-native-neomorph-shadows';

import {Touchable} from '../../../includes/variables'

const buttonWithShadow = (props) => {

    // alert(PixelRatio.getPixelSizeForLayoutSize(45));
    return (
        <Shadow
            useArt
            style={styles.buttonShadow}
            >
            <Touchable disabled={props.disabled} useForeground={true} activeOpacity={0.9} {...props}>    
                <View style={[styles.button, props.disabled ? {backgroundColor:'#CFA280'} : null]}>
                    <Text style={styles.text}>{props.buttonText ? props.buttonText : props.children}</Text>
                </View>
            </Touchable>
        </Shadow>
    )
}

export default buttonWithShadow;

const styles = StyleSheet.create({
    buttonShadow:{
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.7,
        shadowColor: "#C06A46",
        shadowRadius: 25,
        borderRadius: 1000,
        backgroundColor: 'transparent',
        width: 220,
        height:56,
        overflow: 'hidden'
    },
    button:{
        backgroundColor: '#C06A46',
        borderRadius: 1000,
        height:56,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        textAlign: 'center',
        fontSize: 19,
        fontFamily: 'Poppins-SemiBold',
        color: '#fff',
    }
    
})
