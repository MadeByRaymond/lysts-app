import React from 'react'
import { StyleSheet, View } from 'react-native'

import Button from './modalButton';

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
