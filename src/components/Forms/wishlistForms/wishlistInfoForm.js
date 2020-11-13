import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'

import * as Input from '../../../UIComponents/Inputs/index';
import {getCategoryDisplay} from '../../../includes/functions';

import {categories} from '../../../includes/datasets';

const Form = (props) => {
    let categoryList = [];
    categories.map((item,key) => {
        return categoryList.push({
            label: getCategoryDisplay(item),
            value: item,
            key: key,
            color: '#515D70'
        })
    });

    return (
        <ScrollView showsVerticalScrollIndicator = {false}>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}} >
                <View style={styles.container}>
                    <View style={styles.inputWrapper}><Input.InputText targetKey ='name' {...props} placeholder='Wishlist Name' maxLength = {35} autoFocus={true} /></View>
                    <View style={styles.inputWrapper}><Input.SelectInput targetKey ='category' {...props} placeholder='Category' itemsList={categoryList} selectedItem ={props.selectedCategory}/></View>
                    <View style={styles.inputWrapper}><Input.TextAreaInput targetKey ='description' {...props} placeholder='Description (optional)' maxLength = {1000} /></View>
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
    }
})
