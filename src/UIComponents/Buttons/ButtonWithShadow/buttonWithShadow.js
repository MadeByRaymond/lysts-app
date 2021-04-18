import React from 'react'
import { StyleSheet, Text, View, PixelRatio  } from 'react-native';

import Shadow from 'react-native-drop-shadow';

import {Touchable} from '../../../includes/variables'

const buttonWithShadow = (props) => {

    // alert(PixelRatio.getPixelSizeForLayoutSize(45));
    return (
        <Shadow style={styles.buttonShadow}>
            <View style={styles.buttonWrapper}>
                <Touchable disabled={props.disabled} useForeground={true} activeOpacity={0.9} {...props}>    
                    <View style={[styles.button, props.disabled ? {backgroundColor:'#CFA280'} : null]}>
                        <Text style={styles.text}>{props.buttonText ? props.buttonText : props.children}</Text>
                    </View>
                </Touchable>
            </View>
        </Shadow>
    )
}

export default buttonWithShadow;

const styles = StyleSheet.create({
    buttonShadow:{
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.7,
        shadowColor: "#C06A46",
        shadowRadius: 19,
        borderRadius: 1000,
        backgroundColor: 'transparent',
        overflow: 'hidden'
    },
    buttonWrapper:{
        borderRadius: 1000,
        overflow:'hidden'
    },
    button:{
        backgroundColor: '#C06A46',
        borderRadius: 1000,
        height:56,
        width: 220,
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
