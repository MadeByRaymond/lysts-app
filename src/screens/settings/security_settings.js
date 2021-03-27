import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Svg, { Circle, Path } from "react-native-svg"
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';

import NoConnectionAlert from '../../components/Alerts/noConnection/noConnectionAlert';

import { dWidth } from '../../includes/variables';

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
    await AsyncStorage.setItem('lystsApp:appStorage:sessionTimeoutLimit', this.state.sessionTimeoutLimit);
  }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleWrapper}><Text style={styles.title}>Switch login method</Text></View>
                <View style={styles.settingsWrapper}>
                  <TouchableOpacity activeOpacity={0.8} onPress={()=>{}}>
                    <View style={styles.settingRow}>
                      <View style={styles.settingSVGWrapper}>
                        <Svg width={35} height={30} viewBox="0 0 52 52" fill="none">
                          <Path
                            d="M11.524 31.424l-1.81 6.758-6.615.14A25.884 25.884 0 010 26c0-4.311 1.049-8.377 2.907-11.957h.002l5.89 1.08 2.58 5.854A15.456 15.456 0 0010.543 26c0 1.909.346 3.737.98 5.424z"
                            fill="#FBBB00"
                          />
                          <Path
                            d="M51.546 21.143c.299 1.573.455 3.197.455 4.857 0 1.862-.196 3.677-.569 5.429a25.994 25.994 0 01-9.154 14.847l-.002-.002-7.418-.378-1.05-6.554a15.496 15.496 0 006.667-7.913H26.572V21.143h24.974z"
                            fill="#518EF8"
                          />
                          <Path
                            d="M42.276 46.274l.001.002A25.89 25.89 0 0126 52C16.1 52 7.49 46.466 3.1 38.321l8.425-6.897C13.72 37.284 19.373 41.456 26 41.456c2.849 0 5.517-.77 7.807-2.115l8.469 6.933z"
                            fill="#28B446"
                          />
                          <Path
                            d="M42.597 5.986l-8.423 6.895A15.369 15.369 0 0026 10.544c-6.777 0-12.536 4.363-14.621 10.433l-8.47-6.934h-.002C7.235 5.7 15.952 0 26.001 0a25.89 25.89 0 0116.596 5.986z"
                            fill="#F14336"
                          />
                        </Svg>
                      </View>
                      <View style={styles.checkSettingsWrapper}>
                        <View style={[styles.settingTextWrapper, {maxWidth: (dWidth - 35 - 25 - 25 - 10 - 40)}]}><Text style={styles.settingText}>Login with Google</Text></View>
                        <View>
                          <Svg width={24} height={24} viewBox="0 0 70 70" fill="none" >
                            <Circle cx={35.158} cy={35.36} r={34.56} fill="#E4E7EA" />
                            <Path
                                d="M17.158 35.36l11.52 11.52 24.48-23.04"
                                stroke="#fff"
                                strokeWidth={5.76}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                          </Svg>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity activeOpacity={0.8} onPress={()=>{}}>
                    <View style={styles.settingRow}>
                      <View style={styles.settingSVGWrapper}>
                        <Svg width={35} height={30} viewBox="0 0 52 52" fill="none">
                          <Path
                            d="M45.5 0h-39A6.507 6.507 0 000 6.5v39C0 49.085 2.915 52 6.5 52h39c3.585 0 6.5-2.915 6.5-6.5v-39C52 2.915 49.085 0 45.5 0z"
                            fill="#1976D2"
                          />
                          <Path
                            d="M43.875 26H35.75v-6.5c0-1.794 1.456-1.625 3.25-1.625h3.25V9.75h-6.5A9.75 9.75 0 0026 19.5V26h-6.5v8.125H26V52h9.75V34.125h4.875L43.875 26z"
                            fill="#FAFAFA"
                          />
                        </Svg>
                      </View>
                      <View style={styles.checkSettingsWrapper}>
                        <View style={[styles.settingTextWrapper, {maxWidth: (dWidth - 35 - 25 - 25 - 10 - 40)}]}><Text style={styles.settingText}>Login with Facebook</Text></View>
                        <View>
                          <Svg width={24} height={24} viewBox="0 0 70 70" fill="none" >
                            <Circle cx={35.158} cy={35.36} r={34.56} fill="#28A664" />
                            <Path
                                d="M17.158 35.36l11.52 11.52 24.48-23.04"
                                stroke="#fff"
                                strokeWidth={5.76}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                          </Svg>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
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
    settingRow:{
        flexDirection:'row',
        alignItems: 'center',
        marginBottom: 20
    },
    settingSVGWrapper:{
        marginRight: 10
    },
    settingTextWrapper:{
        paddingTop: 2
    },
    settingText:{
        color: '#515D70',
        fontSize: 16.5,
        fontFamily: 'Poppins-Regular'
    },
    checkSettingsWrapper:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      width: (dWidth - 35 - 25 - 25 - 10)
    },
    divider:{
        backgroundColor: '#E4E7EA',
        height: 2,
        opacity: 0.5,
        marginTop: 12,
        marginBottom: 30
    },

    credits:{
        alignItems:'center',
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: [{
            translateX: -(111/2)
        }]
        
    }
})
