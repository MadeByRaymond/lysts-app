import React from 'react'
import { StyleSheet, View } from 'react-native';

import {dHeight, dWidth} from '../../../includes/variables';

import Button from './buttonWithShadow';

const floatingButton = (props) => {
    return (
        <View style={[styles.floatingView, {...props.floatingViewStyle}]}>
            <Button {...props} />
        </View>
    )
}

export default floatingButton;

const styles = StyleSheet.create({
    floatingView:{
        position: 'absolute',
        width: dWidth,
        alignItems: 'center',
        // bottom: 37
        top: dWidth > 575 ? (dHeight - (37+96)) : (dHeight - (37+56)),
        zIndex: 1000
    }
})
