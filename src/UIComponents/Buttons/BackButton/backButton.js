import React from 'react'
import { StyleSheet, View } from 'react-native'

import Svg, { Path } from "react-native-svg"

import {Touchable} from '../../../includes/variables'

const backButton = (props) => {
    return (
        <View style={styles.buttonWrapper}>
            <Touchable useForeground={true} activeOpacity={0.9} {...props}>
                <View style={styles.button}>
                <Svg viewBox="0 0 24 43" fill="none" height={16} width={44}>
                    <Path
                        d="M19.081 5l-14.4 16.8 14.4 16.8"
                        stroke="#44577C"
                        strokeWidth={8.64}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </Svg>
                </View>
            </Touchable>
        </View>
        
    )
}

export default backButton

const styles = StyleSheet.create({
    buttonWrapper:{
        borderRadius: 9,
        overflow:'hidden'
    },
    button:{
        backgroundColor: '#E4E7EA',
        width: 50,
        height: 50,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
