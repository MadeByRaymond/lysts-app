import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import * as SaveIcon from '../../SVG_Files/saveSVG/saveSVG';

const saveButton = (props) => {
    let Icon =  props.saved ? SaveIcon.Saved : SaveIcon.Unsaved;
    let color = props.color ? props.color : '#E76666';
    return (
        <Icon height={props.height} width={props.width} color={color} />
    )
}

export default saveButton

const styles = StyleSheet.create({

})
