import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

import ReportForm from '../Forms/wishlistForms/wishlistReportForm';
import ModalButtonView from '../../UIComponents/Buttons/ModalButton/modalButtonView';
import ErrorSuccessAlert from '../../components/Alerts/ErrorSuccess/errorSuccessAlert';

import {removeExcessWhiteSpace, validateEmail} from '../../includes/functions';
import {dWidth, dHeight} from '../../includes/variables';

export default class reportWishlist extends Component {
    timeoutAlert;
    state={
        showEmailError:false,
        showReasonError: false,
        sendingReport: false,
        reportInfo:{
            reason: {
              value: "",
              focused: false
            },
            email:{
              value: "",
              focused: false
            },
            message:{
              value: "",
              focused: false
            }
        },
        alertMessage:{
            show: false,
            type: '',
            title:'',
            subtitle: ''
        }
    }

    componentWillUnmount(){
        clearTimeout(this.timeoutAlert)
    }

    setInfoState = (parentKey, childKey, childValue) => {
        this.setState({
            reportInfo: {
                ...this.state.reportInfo,
                [parentKey] : {
                    ...this.state.reportInfo[parentKey],
                    [childKey]: typeof childValue == 'string' ? removeExcessWhiteSpace(childValue) : childValue
                }
            }
        })
    };

    resetAlert = () => {
        this.timeoutAlert = setTimeout(()=>{
            this.setState({alertMessage: {show: false}})
            clearTimeout(this.timeoutAlert);
        }, 4500)
      }

    render() {
        this.state.sendingReport ? this.props.reportFunction(
            this.state.reportInfo.reason.value,
            this.state.reportInfo.message.value,
            this.state.reportInfo.email.value,
            () => {this.setState({
                sendingReport: false,
                reportInfo:{
                  reason: {
                    value: "",
                    focused: false
                  },
                  email:{
                    value: "",
                    focused: false
                  },
                  message:{
                    value: "",
                    focused: false
                  }
                }
            })},
            () => {this.setState({
                sendingReport: false,
                alertMessage:{
                    show: true,
                    type: 'error',
                    title:'Report couldn\'t send...',
                    subtitle: 'This could be an issue with the server 😞'
                }
            })}
        ) : null;

        this.state.alertMessage.show ? this.resetAlert() : null;
        
        return (
            <View style={styles.container}>
                <View style={styles.infoTextWrapper}><Text style={styles.infoText}>This will be sent to our support team to investigate. We will contact you in case for any additional information.</Text></View>
                <View style={{flex:1}}>
                  <ReportForm 
                    infoState = {this.state.reportInfo} 
                    setInfoState={this.setInfoState} 
                    showEmailError={this.state.showEmailError} 
                    showReasonError={this.state.showReasonError} 
                    backspaceEvent={() => {this.state.showEmailError ? null : this.setState({showEmailError : true})}} 
                    selectValueChangeEvent={() => {this.state.showReasonError ? null : this.setState({showReasonError : true})}} 
                    customFormWrapperStyle = {{paddingHorizontal: 0, paddingTop: 10}}

                    userLoggedIn = {this.props.userLoggedIn}
                  />
                </View>
                <View style={styles.ModalButtonWrapper}>
                    <ModalButtonView 
                        buttonText = {this.state.sendingReport ? 'Sending...' : 'Send Report'}
                        onPress={() => {
                            let sendingReport = false
                            let showEmailError = false
                            let showReasonError = false
                            
                            if(this.state.reportInfo.reason.value.trim() == ''){
                                sendingReport = false
                                showReasonError = true
                            }else{
                                sendingReport = true
                                showReasonError = false
                            }

                            if(!this.props.userLoggedIn){
                                let validEmail = validateEmail(this.state.reportInfo.email.value);

                                sendingReport = validEmail
                                showEmailError = !validEmail
                            }else{
                                sendingReport = true
                                showEmailError = false
                            }

                            this.setState({sendingReport,showEmailError, showReasonError})
                        }}
                        disabled = {this.state.sendingReport}
                    />
                </View>

                {this.state.alertMessage.show ? (<ErrorSuccessAlert 
                    type = {this.state.alertMessage.type}
                    title = {this.state.alertMessage.title}
                    subtitle = {this.state.alertMessage.subtitle}
                /> )
                : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        // flex:1
        position: 'relative',
        height: dHeight - ((dHeight * 20)/100) - (20 + 5 + 30),
    },
    infoTextWrapper:{
        // backgroundColor: '#F0E3DA',
        // borderColor: '#C06A46',
        // borderWidth: 1,
        // borderStyle: 'solid',
        // borderRadius: 10,
        // marginHorizontal: -20
    },
    infoText:{
        color: '#C06A46',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Poppins-Italic',
        marginTop: 6,
        marginBottom: 6,
    },

    ModalButtonWrapper:{
        position:'absolute',
        bottom: -20,
        width: '100%'
    }
})
