import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
import SelectPicker from 'react-native-picker-select';

import NoConnectionAlert from '../../components/Alerts/noConnection/noConnectionAlert';

import { dWidth } from '../../includes/variables';
import {sessionTimeoutLimits} from '../../includes/datasets';

let prevComponentId;

export default class settings extends Component {
  unsubscribeNetworkUpdate;
  state={
    hasNetworkConnection: true,
    sessionTimeoutLimit: 'infinite'

  }

  componentDidMount(){
    this.unsubscribeNetworkUpdate = NetInfo.addEventListener(state => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
      this.setState({hasNetworkConnection: state.isConnected});
    });

    AsyncStorage.getItem('lystsApp:appStorage:sessionTimeoutLimit').then((sessionTimeoutLimit) =>{
      if (typeof sessionTimeoutLimit == 'undefined' || sessionTimeoutLimit == null || sessionTimeoutLimit.trim() == '' ) {
        throw 'Saved Session Timeout Limit Invalid'
      }
      this.setState({sessionTimeoutLimit});
    }).catch(async(e) => {
      if (__DEV__) {
        console.log('Error Loading Session Timeout ==> ', e);
      }
      await AsyncStorage.setItem('lystsApp:appStorage:sessionTimeoutLimit', this.state.sessionTimeoutLimit)
    })

    prevComponentId = global.activeComponentId;
    global.activeComponentId = this.props.componentId;
  }

  componentWillUnmount() {
    global.activeComponentId = prevComponentId;

    this.unsubscribeNetworkUpdate();
  }

  saveSessionLimit = () => {
    AsyncStorage.setItem('lystsApp:appStorage:sessionTimeoutLimit', this.state.sessionTimeoutLimit);
  }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleWrapper}><Text style={styles.title}>Session Timeout Limit</Text></View>
                <View style={styles.settingsWrapper}>
                  <SelectPicker 
                    value = {this.state.sessionTimeoutLimit}
                    onValueChange={(val) => {
                      this.setState({
                        sessionTimeoutLimit:val
                      },()=>{
                        AsyncStorage.setItem('lystsApp:appStorage:sessionTimeoutLimit', this.state.sessionTimeoutLimit)
                      })
                    }}
                    items={sessionTimeoutLimits}
                    placeholder={{}}
                    useNativeAndroidPickerStyle = {true}
                    style={{
                        inputAndroid:{
                          fontSize: 16.5,
                          fontFamily: 'Poppins-Regular',
                          color: '#515D70',
                          height: 50,
                        },
                        headlessAndroidContainer:{
                            backgroundColor: "#fff",
                            paddingHorizontal: 18,
                        },
                        inputAndroidContainer:{
                          fontSize: 16.5,
                          fontFamily: 'Poppins-Regular',
                          color: '#515D70',
                          height: 50,
                          backgroundColor: "#fff",
                          paddingHorizontal: 18,
                        }

                    }}
                  />
                </View>
                {this.state.hasNetworkConnection ? null : <NoConnectionAlert />}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1A2C34',
        backgroundColor: '#FCFCFC'
    },
    titleWrapper:{
      marginTop:30
    },
    title:{
      paddingHorizontal: 25,
      paddingTop: 10,
      paddingBottom: 3,
      color: '#515D70',
      fontSize: 15,
      fontFamily: 'Poppins-Medium'
    },


    settingsWrapper:{
      paddingHorizontal: 25,
      paddingVertical: 20
    },
    settingText:{
        color: '#515D70',
        fontSize: 16.5,
        fontFamily: 'Poppins-Regular'
    },
})
