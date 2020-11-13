import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native'
import { Navigation } from "react-native-navigation";

import Button from '../../UIComponents/Buttons/ButtonWithShadow/floatingButton';
import InfoForm from '../../components/Forms/profileForms/profileInfoForm';

import {removeExcessWhiteSpace} from '../../includes/functions';

export default class profileInfo extends Component {

    state={
       buttonDisabledStatus: true,
       closeButtonText: 'Close',
       profileInfo:{
          name: {
            value: 'Daisy Obianala',
            focused: false
          },
          displayName: {
            value: 'Daisy Oh',
            focused: false
          },
          email: {
            value: 'daisyobia23@gmail.com',
            focused: false
          },
          phone:{
            value: '+1 555 012 7643',
            focused: false
          }
        },
    }

    validateEmail = (email) =>{
        let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(email);
        return valid;
    }

    

    setInfoState = (parentKey, childKey, childValue) =>{
        let buttonDisabledStatus = this.state.buttonDisabledStatus;
        // if (parentKey == 'name'){
        //     if(typeof childValue == 'boolean'){
        //         if(this.state.profileInfo.name.value.trim() == '' || this.state.profileInfo.name.value.length < 3){buttonDisabledStatus = true;}else{buttonDisabledStatus = false;}
        //     } else if(childValue.toString().trim() == '' || childValue.toString().length < 3)
        //     {buttonDisabledStatus = true;} else {buttonDisabledStatus = false;}
        // }else{
        //     if(this.state.profileInfo.name.value.trim() == '' || this.state.profileInfo.name.value.length < 3){buttonDisabledStatus = true;}else{buttonDisabledStatus = false;}
        // }

        if (parentKey == 'phone' || parentKey == 'displayName'){
            if(typeof childValue == 'boolean'){
                buttonDisabledStatus = this.state.buttonDisabledStatus
                
            }else {
                if(this.state.profileInfo.name.value.trim() == ''
                || !this.validateEmail(this.state.profileInfo.email.value.trim())
                ){buttonDisabledStatus = true;}else{buttonDisabledStatus = false;}
            }
        }else{
            if(typeof childValue == 'boolean'){
                buttonDisabledStatus = this.state.buttonDisabledStatus
            } else {
                if (parentKey == 'name'){
                    if(childValue.toString().trim() == '' 
                      || !this.validateEmail(this.state.profileInfo.email.value.trim())
                    ){buttonDisabledStatus = true;}else{buttonDisabledStatus = false;}
                }else if (parentKey == 'email'){
                    if(this.state.profileInfo.name.value.trim() == ''
                      || !this.validateEmail(childValue.toString().trim())
                    ){buttonDisabledStatus = true;}else{buttonDisabledStatus = false;}
                }else {
                    if(this.state.profileInfo.name.value.trim() == ''
                      || !this.validateEmail(this.state.profileInfo.email.value.trim())
                    ){buttonDisabledStatus = true;}else{buttonDisabledStatus = false;}
                }
            }
            
            
            // if(childValue.toString().trim() == '' || (parentKey == 'email' && childValue.toString().length < 3))
            // {buttonDisabledStatus = true;} else {buttonDisabledStatus = false;}
            
        }

        this.setState((prevState) => {
          return {
            profileInfo: {
                ...prevState.profileInfo,
                [parentKey] : {
                    ...prevState.profileInfo[parentKey],
                    [childKey]: typeof childValue == 'string' ? removeExcessWhiteSpace(childValue) : childValue
                }
            },
            buttonDisabledStatus: buttonDisabledStatus,
            closeButtonText: typeof childValue == 'string' ? 'Cancel' : prevState.closeButtonText
          }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => { Navigation.popToRoot(this.props.componentId)}}>
                        <Text style={styles.cancelText}>{this.state.closeButtonText}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator = {false}>
                    <View style={styles.profileAvatarWrapper}>
                        <View style={styles.avatarWrapper}><Image style={styles.avatar} source={require('../../assets/images/avatars/avatar1.png')} /></View>
                        <View><Text style={styles.changeAvatarText}>Change Profile Photo</Text></View>
                    </View>
                    <View>
                        <InfoForm 
                            infoState = {this.state.profileInfo}
                            setInfoState={this.setInfoState}
                        />
                    </View>
                </ScrollView>
                
                {this.state.buttonDisabledStatus ? null : (<Button onPress={()=>{
                    Keyboard.dismiss();
                    this.setState(prevState => ({
                        buttonDisabledStatus: true,
                        closeButtonText : 'Close',
                        profileInfo: {
                            ...prevState.profileInfo,
                            name: {
                                ...prevState.profileInfo.name,
                                focused: false
                            },
                            displayName: {
                                ...prevState.profileInfo.displayName,
                                focused: false
                            },
                            email: {
                                ...prevState.profileInfo.email,
                                focused: false
                            },
                            phone:{
                                ...prevState.profileInfo.phone,
                                focused: false
                            }
                        }
                    }))
                }}>Save</Button>)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FCFCFC'
    },
    topBar:{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 999,
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor: 'transparent'
    },
    cancelText:{
        color: '#C06A46',
        backgroundColor: '#FCFCFC',
        fontSize: 17,
        fontFamily: 'Poppins-SemiBold'
    },
    profileAvatarWrapper:{
        alignItems: 'center',
        marginTop: 70
    },
    avatarWrapper:{
        paddingTop: 15
    },
    avatar:{
        resizeMode: 'cover',
        height: 150,
        width: 150,
        borderRadius: 1000
    },
    changeAvatarText:{
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: '#515D70',
        paddingTop: 15
    },
})
