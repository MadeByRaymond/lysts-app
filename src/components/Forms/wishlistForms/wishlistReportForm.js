import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'

import * as Input from '../../../UIComponents/Inputs/index';
import {getCategoryDisplay,validateEmail} from '../../../includes/functions';

import {reportReasons} from '../../../includes/datasets';

const Form = (props) => {
    let reportReasonList = [];
    reportReasons.map((item,key) => {
        return reportReasonList.push({
            label: getCategoryDisplay(item),
            value: item,
            key: key,
            color: '#515D70'
        })
    });

    return (
        <ScrollView showsVerticalScrollIndicator = {false}>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}} >
                <View style={[styles.container, props.customFormWrapperStyle ? props.customFormWrapperStyle : null]}>
                    <View style={styles.inputWrapper}><Input.SelectInput targetKey ='reason' {...props} placeholder={{label: 'Reason for report',value: '', color: '#A8AEB7'}} itemsList={reportReasonList} /></View>
                    {(props.showReasonError && ((props.infoState.reason.value == '') || (props.infoState.reason.value == null))) ? (<View style={styles.errorMessageWrapper}><Text style={styles.errorMessage}>Select a reason for report</Text></View>) : null}

                    {(props.userLoggedIn) ? null : (<View style={styles.inputWrapper}><Input.InputText targetKey ='email' {...props} placeholder='Your email' maxLength = {40} keyboardType='email-address' /></View>)}
                    {(props.showEmailError && !validateEmail(props.infoState.email.value) && !props.userLoggedIn) ? (<View style={styles.errorMessageWrapper}><Text style={styles.errorMessage}>Not a valid email address</Text></View>) : null}

                    <View style={styles.inputWrapper}><Input.TextAreaInput targetKey ='message' {...props} placeholder='Tell us more about this...' maxLength = {1000} /></View>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
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
        marginBottom: 16,
    },
    errorMessageWrapper:{
        marginTop: -16,
        marginBottom: 16
    },
    errorMessage:{
        color: '#ff4d40'
    }
})
