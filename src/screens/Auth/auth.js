import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Svg, { Rect, Path } from "react-native-svg";
import NetInfo from "@react-native-community/netinfo";

import {goToViewWishlistScreen} from '../../includes/functions';

import {dWidth, dHeight} from '../../includes/variables'
import {goToScreen} from '../../includes/functions';
import {signInAuth} from '../../services/AuthServiceProvider';

import ErrorSuccessAlert from '../../components/Alerts/ErrorSuccess/errorSuccessAlert';
import NoConnectionAlert from '../../components/Alerts/noConnection/noConnectionAlert';

let prevComponentId;

export class Auth extends Component {
    unsubscribeNetworkUpdate;
    timeoutAlert;

    state = {
        isLoading:false,
        loginWith: '',
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

        signInAuth('anonymous', false, (parsedRes) =>{
            if(parsedRes.error){
                // console.log(parsedRes.error); 
            }else if (typeof global.launchWithCode == 'string' && global.launchWithCode.trim().length == 6) {
                goToViewWishlistScreen(this.props.componentId,global.launchWithCode)
                global.launchWithCode = '';
            }
        }, (error) => {
            // console.log(error);          
        })
    }

    componentWillUnmount() {
        global.activeComponentId = prevComponentId;
        this.unsubscribeNetworkUpdate();
        clearTimeout(this.timeoutAlert);
    }

    resetAlert = () => {
        this.timeoutAlert = setTimeout(()=>{
            this.setState({alertMessage: {show: false}})
            clearTimeout(this.timeoutAlert);
        }, 4500)
    }
    

    render() {
        this.state.alertMessage.show ? this.resetAlert() : null;
        return (
            <ImageBackground source={{uri: 'signin_bg'}} style={styles.bgImage} resizeMethod='resize' resizeMode='cover'>
                <View style={styles.container}>
                    
                    {/* <Text> Login in..... </Text> */}
                    <View style={styles.logoWrapper}>
                        <Svg
                            width={150}
                            height={150}
                            viewBox="0 0 440 440"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="M140.104 201.878c0 15.366 12.457 27.822 27.822 27.822h11.794c8.852 0 16.028 7.176 16.028 16.028 0 8.852-7.176 16.029-16.028 16.029h-28.346c-24.507 0-44.374-19.867-44.374-44.374V112.552C107 103.411 114.411 96 123.552 96c9.142 0 16.552 7.411 16.552 16.552v89.326z"
                                fill="#515D70"
                            />
                            <Path
                                d="M193.972 151.687a16.764 16.764 0 0115.556 10.516l3.561 8.867c9.781 24.357 44.415 23.917 53.574-.682l2.938-7.89a16.604 16.604 0 0115.561-10.811c11.835 0 19.871 12.028 15.339 22.962l-65.835 158.86a16.576 16.576 0 01-15.313 10.23c-12.008 0-20.031-12.369-15.136-23.333l12.417-27.815a36.336 36.336 0 00.164-29.253l-38.209-88.225c-4.794-11.069 3.32-23.426 15.383-23.426z"
                                fill="#515D70"
                            />
                            <Rect
                                x={296.975}
                                y={224.757}
                                width={37}
                                height={37}
                                rx={18.5}
                                fill="#C06A46"
                            />
                        </Svg>
                    </View>
                    <View style={styles.buttonsWrapper}>
                        <View style={[styles.buttonContainer]}>
                            <TouchableOpacity disabled={(this.state.isLoading || !this.state.hasNetworkConnection) ? true : false} activeOpacity={0.8} onPress={
                                () => this.setState({
                                    isLoading:true,
                                    loginWith: 'google'
                                }, () => {
                                    signInAuth("google", true, ()=> {
                                        this.setState({isLoading:false,loginWith: ''});
                                    }, (error, ignore = false)=>{
                                        this.setState({
                                            isLoading:false,
                                            loginWith: '',
                                            alertMessage:{
                                                show: !ignore,
                                                type: 'error',
                                                title: error.message ? error.message.trim().toLowerCase() == 'user disabled' ? 'This Account Has Been Disabled' : error.message : 'Couldn\'t Sign In',
                                                subtitle: error.message ? error.message.trim().toLowerCase() == 'user disabled' ? 'Kindly contact support to resolve this' : '' : 'Try again or contact support if this continues',
                                            }
                                        });
                                    })
                                }) 
                            } >
                                <View style={[styles.button, styles.whiteButton]}>
                                    <View><Text style={[styles.buttonText, styles.whiteButtonText]}>{ (this.state.isLoading && this.state.loginWith.trim() == 'google') ? 'Please wait...' : 'Continue with Google'}</Text></View>
                                    <View style={styles.svgWrapper}>
                                        <Svg
                                            width={30}
                                            height={30}
                                            viewBox="0 0 75 75"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <Rect width={75} height={75} rx={37.5} fill="#fff" />
                                            <Path
                                                d="M65.001 37.737c0-2.307-.187-3.99-.592-5.736H38.062v10.413h15.465c-.311 2.588-1.995 6.486-5.737 9.105l-.052.348 8.33 6.454.577.057c5.3-4.895 8.356-12.097 8.356-20.64z"
                                                fill="#4285F4"
                                            />
                                            <Path
                                                d="M38.06 65.174c7.577 0 13.937-2.494 18.583-6.797l-8.855-6.86c-2.37 1.653-5.55 2.807-9.728 2.807-7.42 0-13.718-4.895-15.964-11.66l-.329.027-8.662 6.704-.113.314c4.615 9.167 14.093 15.465 25.068 15.465z"
                                                fill="#34A853"
                                            />
                                            <Path
                                                d="M22.097 42.664a17.275 17.275 0 01-.935-5.55c0-1.933.343-3.804.904-5.55l-.015-.372-8.77-6.811-.288.136A28.088 28.088 0 0010 37.114c0 4.52 1.091 8.792 2.993 12.596l9.104-7.046z"
                                                fill="#FBBC05"
                                            />
                                            <Path
                                                d="M38.06 19.903c5.27 0 8.824 2.276 10.85 4.178l7.92-7.732c-4.864-4.521-11.193-7.296-18.77-7.296-10.975 0-20.453 6.298-25.068 15.464l9.073 7.047c2.277-6.766 8.575-11.661 15.995-11.661z"
                                                fill="#EB4335"
                                            />
                                        </Svg>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.buttonContainer]}>
                            <TouchableOpacity disabled={(this.state.isLoading || !this.state.hasNetworkConnection) ? true : false} activeOpacity={0.8} onPress={
                                () => this.setState({
                                    isLoading:true,
                                    loginWith: 'facebook'
                                }, () => {
                                    signInAuth("facebook", true, ()=> {
                                        this.setState({isLoading:false,loginWith: ''});
                                    }, (error, ignore = false)=>{
                                        this.setState({
                                            isLoading:false,
                                            loginWith: '',
                                            alertMessage:{
                                                show: !ignore,
                                                type: 'error',
                                                title: error.message ? error.message.trim().toLowerCase() == 'user disabled' ? 'This Account Has Been Disabled' : error.message : 'Couldn\'t Sign In',
                                                subtitle: error.message ? error.message.trim().toLowerCase() == 'user disabled' ? 'Kindly contact support to resolve this' : '' : 'Try again or contact support if this continues',
                                            }
                                        });
                                    })
                                }) 
                            } >
                                <View style={[styles.button, styles.blueButton]}>
                                    <View><Text style={[styles.buttonText, styles.blueButtonText]}>{ (this.state.isLoading && this.state.loginWith.trim() == 'facebook') ? 'Please wait...' : 'Continue with Facebook'}</Text></View>
                                    <View style={styles.svgWrapper}>
                                        <Svg
                                            width={30}
                                            height={30}
                                            viewBox="0 0 75 76"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <Rect width={75} height={75} rx={37.5} fill="#fff" />
                                            <Path
                                                d="M45.555 75.003v-25.4h7.443l1.114-8.64h-8.557v-5.518c0-2.502.695-4.207 4.283-4.207l4.576-.002v-7.729c-.792-.105-3.508-.34-6.668-.34-6.598 0-11.114 4.027-11.114 11.422v6.373H29.17v8.641h7.462v25.4h8.923z"
                                                fill="#44577C"
                                            />
                                        </Svg>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.buttonContainer, {marginTop: -8}]}>
                            <TouchableOpacity disabled={this.state.isLoading} activeOpacity={0.8} onPress={() => {
                                goToScreen(this.props.componentId, 'com.lysts.screen.home', {}, {
                                    topBar: {
                                        // title: {
                                        //     text: 'go to login'
                                        // },
                                        // // backButton: {
                                        // //     color: '#515D70',
                                        // //     icon: require('../../assets/images/nav-icons/back_arrow.png'),
                                        // // },
                                        // // background: {
                                        // //     color: '#FFFFFF'
                                        // // },
                                        // visible: true,
                                        // drawBehind: false,
                                        // animate: true,
                                    }
                                })
                            }} >
                                <View style={[styles.button]}>
                                    <View><Text style={[styles.buttonText]}>or Search a wishlist code</Text></View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {this.state.hasNetworkConnection ? null : <NoConnectionAlert />}

                {this.state.alertMessage.show ? (<ErrorSuccessAlert 
                    type = {this.state.alertMessage.type}
                    title = {this.state.alertMessage.title}
                    subtitle = {this.state.alertMessage.subtitle}
                /> )
                : null}

            </ImageBackground>
            
        )
    }
}
  
export default Auth;


const styles = StyleSheet.create({
      container:{
          flex:1, 
          // backgroundColor: '#ffffff',
          // justifyContent:'flex-end'
      },
      bgImage: {
        flex: 1,
        width: dWidth,
        height: dHeight,
        resizeMode: "cover",
        justifyContent: "center",
        backgroundColor: '#fff'
      },
  
  
      logoWrapper:{
          flex: 1,
          alignItems:'center',
          paddingTop: '10%'
      },
  
  
      buttonsWrapper:{
          width: dWidth,
          marginBottom: 20
      },
      buttonContainer:{
          alignItems: 'center',
          marginBottom: 15
      },
      button:{
          position: 'relative',
          backgroundColor: 'transparent',
          paddingVertical: 14,
          width: (dWidth - 60),
          borderRadius: 1000
          // marginHorizontal: 30
      },
      whiteButton:{
          backgroundColor: '#ffffff',
          borderColor: '#44577C',
          borderWidth: 1
      },
      blueButton:{
          backgroundColor: '#44577C',
          borderColor: '#44577C',
          borderWidth: 1
      },
      buttonText:{
          fontFamily: 'Poppins-SemiBold',
          fontSize: 16,
          paddingTop: 2,
          textAlign: 'center',
          color: '#C06A46'
      },
      whiteButtonText:{
          color: '#5C5A5C'
      },
      blueButtonText:{
          color: '#FFFFFF'
      },
      svgWrapper:{
          position: 'absolute',
          top: 14,
          right: 20,
          height: '100%',
          justifyContent: 'center',
          // backgroundColor:'blue'
  
      },
      // svg:{
      //     height: 20,
      //     width: 20,
      //     backgroundColor: 'red'
      // }
})
