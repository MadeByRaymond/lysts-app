import React from 'react'
import { StyleSheet, TextInput, Keyboard } from 'react-native';
import SelectPicker from 'react-native-picker-select';

export function InputText(props) {
    return (
        <TextInput 
            style={[styles.generalStyle, props.infoState[props.targetKey].focused ? styles.focusedStyle : null, props.style]} 
            value={props.infoState[props.targetKey].value} 
            onChangeText={(val) => {props.setInfoState(props.targetKey, 'value', val)}} 
            onFocus = {(e) => {props.setInfoState(props.targetKey, 'focused', true)}}
            onBlur = {(e) => {props.setInfoState(props.targetKey, 'focused', false)}}
            maxLength = {props.maxLength}
            placeholder= {props.placeholder}
            placeholderTextColor = 'rgba(153, 153, 153, 0.6)'
            underlineColorAndroid="transparent"
            autoFocus={props.autoFocus}
            onKeyPress={({nativeEvent}) => {
                if(props.backspaceEvent){
                    nativeEvent.key == 'Backspace' ? props.backspaceEvent() : null
                }
                
            }}
            keyboardType = {props.keyboardType ? props.keyboardType : 'default'}
        />
    )
}

export function SelectInput(props) {
    return (
        <SelectPicker 
            value = {props.infoState[props.targetKey].value}
            onValueChange={(val) => {
                props.setInfoState(props.targetKey, 'value', val)
                props.selectValueChangeEvent ? props.selectValueChangeEvent() : null;
                Keyboard.dismiss()
            }}
            onOpen={() => {Keyboard.dismiss()}}
            items={props.itemsList}
            placeholder={props.placeholder ? props.placeholder : {}}
            useNativeAndroidPickerStyle = {false}
            style={{
                inputAndroid:{
                    fontSize: 18,
                    fontFamily: 'Poppins-Medium',
                    color: '#515D70',
                    height: 70,
                },
                headlessAndroidContainer:{
                    backgroundColor: "#fff",
                    paddingHorizontal: 18,

                },
                inputAndroidContainer: props.infoState[props.targetKey].focused ? styles.focusedStyle : null

            }}
        />

    )
}

export function TextAreaInput(props) {
    return (
        <TextInput 
            style={[styles.generalStyle, styles.textAreaStyle, props.infoState[props.targetKey].focused ? styles.focusedStyle : null, props.style]} 
            value={props.infoState[props.targetKey].value} 
            onChangeText={(val) => {props.setInfoState(props.targetKey, 'value', val)}} 
            onFocus = {(e) => {props.setInfoState(props.targetKey, 'focused', true)}}
            onBlur = {(e) => {props.setInfoState(props.targetKey, 'focused', false)}}
            placeholder= {props.placeholder}
            placeholderTextColor = 'rgba(153, 153, 153, 0.6)'
            underlineColorAndroid="transparent"
            numberOfLines={20}
            multiline={true}
            maxLength = {props.maxLength}
            autoFocus={props.autoFocus}
            keyboardType = {props.keyboardType ? props.keyboardType : 'default'}
        />
    )
}

export function ItemsInput(props){
    return (
        <TextInput style={[styles.generalStyle, styles.itemsInputStyle, props.inputStyles]} {...props} />
    )
}

const styles = StyleSheet.create({
    generalStyle:{
        backgroundColor: "#fff",
        color: '#515D70',
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        height: 70,
        paddingHorizontal: 18
    },
    focusedStyle:{
        borderBottomColor:'rgba(68, 87, 124, 0.8)',
        borderBottomWidth: 2.5,
    },
    textAreaStyle: {
        height: 150,
        alignItems:'flex-start',
        justifyContent: 'flex-start',
        padding: 18, 
        textAlignVertical: 'top'
    },
    itemsInputStyle:{
       height: 40 ,
       width: '100%',
       paddingVertical:0,
       paddingTop: 3,
       paddingLeft: 14,
       paddingRight: 10
    }
})
