import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Keyboard } from 'react-native'
import { Navigation } from "react-native-navigation";
import NetInfo from "@react-native-community/netinfo";

import Button from '../../UIComponents/Buttons/ButtonWithShadow/floatingButton';
import InfoForm from '../../components/Forms/profileForms/profileInfoForm';
import ErrorSuccessAlert from '../../components/Alerts/ErrorSuccess/errorSuccessAlert';
import NoConnectionAlert from '../../components/Alerts/noConnection/noConnectionAlert';
import AvatarRender from '../../components/avatarRender/avatarRender';

import {removeExcessWhiteSpace, validateEmail, goToScreen, saveUserData_MongoCRUD} from '../../includes/functions';

import {app as realmApp} from '../../../storage/realm';

let prevComponentId;

export default class profileInfo extends Component {
    user = realmApp.currentUser;
    userData = realmApp.currentUser.customData;
    timeoutAlert;
    unsubscribeNetworkUpdate;

    state={
       buttonDisabledStatus: true,
       savingData: false,
       closeButtonText: 'Close',
       profileInfo:{
          name: {
            value: this.userData.fullName,
            focused: false
          },
          displayName: {
            value: this.userData.displayName,
            focused: false
          },
          email: {
            value: this.userData.contactEmail,
            focused: false
          },
          phone:{
            value: this.userData.contactPhone,
            focused: false
          }
        },
        avatarFeatures: this.userData.avatarFeatures,
        alertMessage:{
            show: false,
            type: '',
            title: '',
            subtitle: '',
        },
        hasNetworkConnection: true,
    }

    componentDidMount(){
        this.unsubscribeNetworkUpdate = NetInfo.addEventListener(state => {
            // console.log("Connection type", state.type);
            // console.log("Is connected?", state.isConnected);
            this.setState({hasNetworkConnection: state.isConnected});
        });

        prevComponentId = global.activeComponentId;
        global.activeComponentId = this.props.componentId;
    }

    componentWillUnmount() {
        global.activeComponentId = prevComponentId;
        
        this.props.onCloseFunc ? this.props.onCloseFunc() : null;
        clearTimeout(this.timeoutAlert);
    }
    

    saveData = async () => {
        saveUserData_MongoCRUD(
            {},
            {
                fullName:this.state.profileInfo.name.value,
                displayName:this.state.profileInfo.displayName.value,
                contactEmail : this.state.profileInfo.email.value,
                contactPhone: this.state.profileInfo.phone.value,
                lastModifiedLog: 'Updated User Information'
            },
            (customUserData) =>  {
                this.props.refreshInfo(customUserData);
                this.setState({
                    buttonDisabledStatus: true,
                    savingData: false,
                    closeButtonText : 'Close',
                    profileInfo:{
                        name: {
                            value: customUserData.fullName,
                            focused: false
                        },
                        displayName: {
                            value: customUserData.displayName,
                            focused: false
                        },
                        email: {
                            value: customUserData.contactEmail,
                            focused: false
                        },
                        phone:{
                            value: customUserData.contactPhone,
                            focused: false
                        }
                    },
                    alertMessage:{
                        show: true,
                        type: 'success',
                        title: 'Saved Successfully!',
                        subtitle: '',
                    }
                })
            }
        ).catch ((error) => {
            this.setState({
                buttonDisabledStatus: false,
                savingData: false,
                alertMessage:{
                    show: true,
                    type: 'error',
                    title: 'Error saving your information',
                    subtitle: '',
                }
            })
        });
    }


    setInfoState = (parentKey, childKey, childValue) =>{
        let buttonDisabledStatus = this.state.buttonDisabledStatus;

        if (parentKey == 'phone' || parentKey == 'displayName'){
            if(typeof childValue == 'boolean'){
                buttonDisabledStatus = this.state.buttonDisabledStatus
                
            }else {
                if(this.state.profileInfo.name.value.trim() == ''
                || !validateEmail(this.state.profileInfo.email.value.trim())
                ){buttonDisabledStatus = true;}else{buttonDisabledStatus = false;}
            }
        }else{
            if(typeof childValue == 'boolean'){
                buttonDisabledStatus = this.state.buttonDisabledStatus
            } else {
                if (parentKey == 'name'){
                    if(childValue.toString().trim() == '' 
                      || !validateEmail(this.state.profileInfo.email.value.trim())
                    ){buttonDisabledStatus = true;}else{buttonDisabledStatus = false;}
                }else if (parentKey == 'email'){
                    if(this.state.profileInfo.name.value.trim() == ''
                      || !validateEmail(childValue.toString().trim())
                    ){buttonDisabledStatus = true;}else{buttonDisabledStatus = false;}
                }else {
                    if(this.state.profileInfo.name.value.trim() == ''
                      || !validateEmail(this.state.profileInfo.email.value.trim())
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

    onAvatarRefresh = (newUserData) => {
        this.setState({
            avatarFeatures: newUserData.avatarFeatures
        })

        this.props.refreshInfo(newUserData)
    }

    resetAlert = () => {
        
        this.timeoutAlert = setTimeout(()=>{
            this.setState({alertMessage: {show: false}})
            clearTimeout(this.timeoutAlert);
        }, 4500)
    }

    render() {
        this.state.savingData ? this.saveData() : null;
        this.state.alertMessage.show ? this.resetAlert() : null;
        return (
            <View style={styles.container}>
                {this.state.alertMessage.show ? (<ErrorSuccessAlert 
                    type = {this.state.alertMessage.type}
                    title = {this.state.alertMessage.title}
                    subtitle = {this.state.alertMessage.subtitle}
                /> )
                : null}
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => { Navigation.popToRoot(this.props.componentId)}}>
                        <Text style={styles.cancelText}>{this.state.closeButtonText}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator = {false}>
                    <View style={styles.profileAvatarWrapper}>
                        <TouchableOpacity useForeground={true} activeOpacity={0.8} onPress={()=>{
                            goToScreen(this.props.componentId,'com.lysts.screen.customizeAvatar',{refreshInfo: this.onAvatarRefresh},{
                                topBar: {
                                    title: {
                                        text: 'Customize Avatar'
                                    },
                                    visible: true,
                                    drawBehind: false,
                                    animate: true,
                                }
                            })
                        }}>
                            <View>
                                <View style={styles.avatarWrapper}>
                                    <View style={styles.avatar}>
                                        <AvatarRender size={150} avatarFeatures={this.state.avatarFeatures} />
                                    </View>
                                </View>
                                <View><Text style={styles.changeAvatarText}>Customize avatar</Text></View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <InfoForm 
                            infoState = {this.state.profileInfo}
                            setInfoState={this.setInfoState}
                        />
                    </View>
                </ScrollView>
                
                {this.state.hasNetworkConnection ? this.state.buttonDisabledStatus ? null : (<Button 
                  disabled = {this.state.savingData}
                  onPress={()=>{
                    Keyboard.dismiss();
                    this.setState(prevState => ({
                        buttonDisabledStatus: false,
                        savingData: true,
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
                }}>{this.state.savingData ? 'Saving...' : 'Save'}</Button>) : <NoConnectionAlert />}
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
