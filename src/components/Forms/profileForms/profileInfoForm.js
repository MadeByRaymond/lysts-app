import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'

import * as Input from '../../../UIComponents/Inputs/index';
import {getCategoryDisplay} from '../../../includes/functions';

import {categories} from '../../../includes/datasets';

const Form = (props) => {

    return (
        <View showsVerticalScrollIndicator = {false}>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}} >
                <View style={styles.container}>
                    <View style={styles.inputWrapper}>
                        <View style={styles.label}><Text style={styles.labelText}>Full name</Text></View>
                        <Input.InputText targetKey ='name' {...props} placeholder='' maxLength = {35} autoFocus={false} style={styles.inputStyle} keyboardType = {'default'} />
                    </View>
                    <View style={styles.inputWrapper}>
                        <View style={styles.label}><Text style={styles.labelText}>Display name (as will be displayed on the app)</Text></View>
                        <Input.InputText targetKey ='displayName' {...props} placeholder='' maxLength = {35} autoFocus={false} style={styles.inputStyle} keyboardType = {'default'} />
                    </View>
                    <View style={styles.inputWrapper}>
                        <View style={styles.label}><Text style={styles.labelText}>Contact email</Text></View>
                        <Input.InputText targetKey ='email' {...props} placeholder='' maxLength = {40} autoFocus={false} style={styles.inputStyle} keyboardType = {'email-address'} />
                    </View>
                    <View style={styles.inputWrapper}>
                        <View style={styles.label}><Text style={styles.labelText}>Phone number (optional)</Text></View>
                        <Input.InputText targetKey ='phone' {...props} placeholder='' maxLength = {20} autoFocus={false} style={styles.inputStyle} keyboardType = {'phone-pad'} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Form

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 35,
        paddingVertical: 45,
        paddingBottom: 37+70,
        // backgroundColor: 'red'
    },
    inputWrapper: {
        marginBottom: 15,
        position: 'relative',
    },
    inputStyle:{
        backgroundColor: "#FCFCFC"
    },
    label:{
        position: 'absolute',
        top: -2,
        left: 18,
        zIndex: 999
    },
    labelText:{
        color: '#515D70',
        opacity: 0.8,
        fontSize: 13,
        letterSpacing: 0.5
    }
})
