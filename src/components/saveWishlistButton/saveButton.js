import React from 'react'
import { StyleSheet, View } from 'react-native'

import * as SaveIcon from '../../SVG_Files/saveSVG/saveSVG';
import {Touchable} from '../../includes/variables';

const saveButton = (props) => {
    let Icon = props.savedStatus == 'loading' ? SaveIcon.Loading :  props.savedStatus == 'saved' ? SaveIcon.Saved : SaveIcon.Unsaved;
    let TouchableView  = props.savedStatus == 'loading' ? View : Touchable;

    let color = props.color ? props.color : '#E76666';
    return (
        <View style={styles.container}>
            <TouchableView hitSlop={{top:20, left:20, bottom:20, right:20}} onPress = {() => {props.saveFunc ? props.saveFunc() : null}}>
                <Icon height={props.height} width={props.width} color={color} />
            </TouchableView>
        </View>
        
    )
}

export default saveButton

const styles = StyleSheet.create({
    container:{
        borderRadius: 5,
        overflow: 'hidden'
    }
})
