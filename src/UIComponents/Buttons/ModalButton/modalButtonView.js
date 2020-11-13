import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

import Button from './modalButton';

let dsHeight = Dimensions.get("screen").height;
let dsWidth = Dimensions.get("screen").width;

const modalButtonView = (props) => {
    return (
        <View style= {styles.buttonView}>
            <Button 
                {...props}
            />
        </View>
    )
}

export default modalButtonView

const styles = StyleSheet.create({
    buttonView:{
        marginTop: 30,
        marginBottom: 20,
        alignItems: 'center',
        zIndex: 1000
    }
})
