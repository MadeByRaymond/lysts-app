import React from 'react'
import { StyleSheet, View } from 'react-native';

import { Shadow } from 'react-native-neomorph-shadows';
import Svg, { Path } from "react-native-svg"

import {Touchable} from '../../../includes/variables'

const fabButton = (props) => {
    return (
        <View style={styles.floatingView}>
            <Shadow
                useArt
                style={styles.buttonShadow}
                >
                <Touchable useForeground={true} activeOpacity={0.9} {...props}>    
                    <View style={styles.button}>
                        <Svg width={16} height={16} viewBox="0 0 39 39" fill="none">
                            <Path
                                d="M19.521.72v37.44M.8 19.44h37.44"
                                stroke="#fff"
                                strokeWidth={5.76}
                            />
                        </Svg>
                    </View>
                </Touchable>
            </Shadow>
        </View>
    )
}


export default fabButton

const styles = StyleSheet.create({
    floatingView:{
        position: 'absolute',
        right: 37,
        bottom: 18
    },
    buttonShadow:{
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.75,
        shadowColor: "#C06A46",
        shadowRadius: 8,
        borderRadius: 1000,
        backgroundColor: 'transparent',
        width: 60,
        height:60,
        overflow: 'hidden'
    },
    button:{
        backgroundColor: '#C06A46',
        borderRadius: 1000,
        height:60,
        width: 60,
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
