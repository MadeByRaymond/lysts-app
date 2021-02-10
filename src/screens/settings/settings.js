import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Svg, { Rect, Circle, Path } from "react-native-svg"
import debounce from 'lodash.debounce';
import { Navigation } from "react-native-navigation";

import {app as realmApp} from '../../../storage/realm'
import {loginRoot} from '../../../App';

import CreditSVG from '../../SVG_Files/UI_SVG/Credits/credits';
import NavHeader from '../../components/Headers/profileNavHeader';

import {goToScreen} from '../../includes/functions'

export default class settings extends Component {

  state={
    loggingOut: false
  }

    goToScreenHandler = (screenName, title='', screenProps = {}, screenOptions = {}) => {
      let screenOptionsObject = {
        topBar: {
          title: {
              text: title
          },
          visible: true,
          drawBehind: false,
          animate: true,
        },
        ...screenOptions
      }
      goToScreen(this.props.componentId,screenName, screenProps, screenOptionsObject)
    }
    // goToScreenHandler = debounce((screenName, title='', screenProps = null, screenOptions = null) =>{
    //     // alert('ddd')
    //     Navigation.push(this.props.componentId, {
    //       component: {
    //         name: screenName, // Push the screen registered with the 'Settings' key
    //         options: { // Optional options object to configure the screen
    //           bottomTabs: {
    //             animate: false,
    //             visible: false
    //           },
    //           topBar: {
    //             title: {
    //                 text: title
    //             },
    //             visible: true,
    //             drawBehind: false,
    //             animate: true,
    //           },
    //           ...screenOptions
    //         },
    //         passProps: screenProps
    //       }
    //     });
    //   }, 1000, {leading: true,trailing: false})

    logoutHandler = () => {
      realmApp.currentUser.logOut().then(()=>{
        Navigation.setRoot(loginRoot);
      }).catch(() => {
        this.setState({loggingOut: false}, () => {alert('Error with login you out')})
      })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.credits}>
                    <CreditSVG width={111} height={48} />
                </View>
                <NavHeader 
                  onPressFunc={()=>{Navigation.popToRoot(this.props.componentId)}}
                  avatarImage = {this.props.avatarImage}
                  theme = 'Theme2'
                />
                <View style={styles.titleWrapper}><Text style={styles.title}>App Settings</Text></View>
                <ScrollView 
                  contentContainerStyle={styles.settingsScroll}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                  overScrollMode = 'auto'
                >
                  <View style={styles.settingsWrapper}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.goToScreenHandler("com.lysts.screen.securitySettings", "Security")}}>
                      <View style={styles.settingRow}>
                        <View style={styles.settingSVGWrapper}>
                          <Svg width={35} height={30} viewBox="0 0 60 44" fill="none">
                              <Path
                                  d="M4.166.883h11.612a.915.915 0 110 1.831H4.166a2.334 2.334 0 00-2.331 2.332v4.901h56.213V5.046a2.334 2.334 0 00-2.332-2.332H14.183a.915.915 0 110-1.83h41.533a4.167 4.167 0 014.163 4.162v34.637a4.167 4.167 0 01-4.163 4.163H4.166a4.167 4.167 0 01-4.162-4.163V5.046A4.168 4.168 0 014.166.883zm0 41.132h51.55a2.334 2.334 0 002.332-2.332V11.778H1.835v27.905a2.334 2.334 0 002.331 2.332z"
                                  fill="#846F75"
                              />
                              <Path
                                  d="M53.163 5.316a.915.915 0 110 1.831h-1.901a.915.915 0 110-1.83h1.9zM14.311 7.147h-1.9a.915.915 0 110-1.83h1.9a.915.915 0 110 1.83zM6.6 7.147a.915.915 0 110-1.83h1.9a.915.915 0 110 1.83H6.6z"
                                  fill="#846F75"
                              />
                              <Path
                                  d="M20.876 36.098a8.907 8.907 0 008.107-5.226h13.133c.393 0 .78-.13 1.093-.37l2.45-1.872a1.81 1.81 0 00.708-1.43c0-.558-.264-1.092-.707-1.43l-2.451-1.873c-.314-.239-.701-.37-1.093-.37H28.983a8.906 8.906 0 00-8.85-5.194c-4.466.37-8.048 4.173-8.153 8.654a8.833 8.833 0 002.532 6.427 8.83 8.83 0 006.364 2.684zm21.24-10.841c.015 0 .03.005.044.015l2.45 1.872a.07.07 0 01.027.056c0 .021-.01.042-.027.055l-2.451 1.873a.072.072 0 01-.043.014H28.91c-.64 0-1.219.375-1.475.954a7.176 7.176 0 01-6.56 4.272 7.112 7.112 0 01-5.126-2.163 7.115 7.115 0 01-2.04-5.178c.085-3.61 2.97-6.672 6.567-6.97a7.18 7.18 0 017.16 4.25c.255.577.834.95 1.475.95h13.205zM17.874 31.41a2.355 2.355 0 002.352-2.352V25.34a2.355 2.355 0 00-2.352-2.352 2.355 2.355 0 00-2.352 2.352v3.718a2.355 2.355 0 002.352 2.352zm0-6.692c.343 0 .623.279.623.622v3.718a.623.623 0 01-1.245 0V25.34c0-.343.28-.622.622-.622z"
                                  fill="#A58BC9"
                              />
                          </Svg>
                        </View>
                        <View style={styles.settingTextWrapper}><Text style={styles.settingText}>Security</Text></View>
                      </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.goToScreenHandler("com.lysts.screen.notificationSettings", "Notifications")}}>
                      <View style={styles.settingRow}>
                        <View style={styles.settingSVGWrapper}>
                          <Svg width={35} height={30} viewBox="0 0 59 53" fill="none">
                              <Path
                                  d="M37.874 15.955a.654.654 0 01-.22-.038l-10.325-3.72h-6.388a.647.647 0 110-1.295h6.5c.076 0 .15.013.22.038l10.433 3.758a.647.647 0 01-.22 1.257z"
                                  fill="#EBE7F2"
                              />
                              <Path
                                  d="M38.521 6.001V1.968A1.289 1.289 0 0036.79.759l-9.463 3.483H21.58c-.71 0-1.287.577-1.287 1.288v1.274h-1.38c-.769 0-1.393.626-1.393 1.394v2.423c0 .768.624 1.393 1.393 1.393h1.38v1.275c0 .71.577 1.287 1.287 1.287h1.078l1.127 4.99a.647.647 0 00.631.504h2.489a.648.648 0 00.64-.74l-.69-4.754h.471l9.462 3.483a1.289 1.289 0 001.733-1.209v-4.033a3.396 3.396 0 002.904-3.355v-.106A3.396 3.396 0 0038.52 6zm-19.608 4.717a.098.098 0 01-.098-.097V8.198c0-.054.044-.098.098-.098h1.38v2.618h-1.38zm7.243 8.057h-1.222l-.948-4.2h1.56l.61 4.2zm1.51-5.454a.645.645 0 00-.224-.04l-5.854.008-.008-7.752h5.862a.644.644 0 00.223-.04l9.56-3.53.011 14.876-9.57-3.522zm12.463-3.859a2.1 2.1 0 01-1.608 2.039V7.317a2.1 2.1 0 011.608 2.039v.106z"
                                  fill="#F9B087"
                              />
                              <Path
                                  d="M55.176 8.797h-11.81a.648.648 0 100 1.295h11.81c1.208 0 2.191.983 2.191 2.192v29.605a2.194 2.194 0 01-2.191 2.191h-18.56a.648.648 0 00-.459.19l-6.686 6.686-6.687-6.686a.647.647 0 00-.458-.19H3.766a2.194 2.194 0 01-2.191-2.191V12.284c0-1.209.983-2.192 2.191-2.192h11.81a.648.648 0 100-1.295H3.765A3.49 3.49 0 00.28 12.284v29.605a3.49 3.49 0 003.487 3.486h18.292l6.955 6.955a.647.647 0 00.916 0l6.955-6.955h18.292a3.49 3.49 0 003.487-3.486V12.284a3.49 3.49 0 00-3.487-3.487z"
                                  fill="#846F75"
                              />
                              <Path
                                  d="M12.807 21.946l-5.032 2.906a.648.648 0 00-.324.56v5.812c0 .23.124.445.324.56l5.032 2.906a.647.647 0 00.648 0l5.032-2.906c.2-.115.324-.33.324-.56v-5.811a.648.648 0 00-.324-.561l-5.032-2.906a.649.649 0 00-.648 0zm.324 1.31l3.737 2.157-3.737 2.157-3.737-2.157 3.737-2.158zm0 10.125L8.746 30.85v-4.315l4.061 2.344a.648.648 0 00.648 0l4.06-2.344v4.315l-4.384 2.531zM24.117 31.784l5.032 2.906a.647.647 0 00.648 0l5.032-2.906c.2-.115.324-.33.324-.56v-5.811a.648.648 0 00-.324-.561l-5.032-2.906a.648.648 0 00-.648 0l-5.032 2.906a.648.648 0 00-.324.56v5.812c0 .23.123.445.324.56zm5.356 1.597l-4.385-2.531v-4.315l4.061 2.344a.647.647 0 00.648 0l4.06-2.344v4.315l-4.384 2.531zm0-10.126l3.737 2.158-3.737 2.157-3.737-2.157 3.737-2.158zM40.45 31.784l5.033 2.906a.647.647 0 00.648 0l5.032-2.906c.2-.115.324-.33.324-.56v-5.811a.648.648 0 00-.324-.561l-5.032-2.906a.648.648 0 00-.648 0l-5.032 2.906a.648.648 0 00-.324.56v5.812c0 .23.123.445.324.56zm5.357 1.597l-4.385-2.531v-4.315l4.061 2.344a.647.647 0 00.648 0l4.06-2.344v4.315l-4.384 2.531zm0-10.126l3.737 2.158-3.737 2.157-3.737-2.157 3.737-2.158z"
                                  fill="#846F75"
                              />
                          </Svg>
                        </View>
                        <View style={styles.settingTextWrapper}><Text style={styles.settingText}>Notifications</Text></View>
                      </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{}}>
                      <View style={styles.settingRow}>
                        <View style={styles.settingSVGWrapper}>
                          <Svg width={35} height={32} viewBox="0 0 49 53" fill="none">
                              <Path
                                  d="M24.83 3.76a.641.641 0 110 1.282c-11.374 0-20.627 9.253-20.627 20.627a.641.641 0 11-1.283 0c0-12.08 9.828-21.91 21.91-21.91z"
                                  fill="#EBE7F2"
                              />
                              <Path
                                  d="M9.83 31.39c.236 0 .474.074.676.22l1.98 1.44 1.98-1.44a1.149 1.149 0 011.354 0c.405.295.573.813.418 1.288l-.756 2.328 1.98 1.439c.405.294.573.811.419 1.288a1.15 1.15 0 01-1.096.795h-2.447l-.757 2.328a1.149 1.149 0 01-1.095.796c-.5 0-.94-.32-1.095-.796l-.757-2.328H8.187c-.5 0-.941-.32-1.096-.795a1.15 1.15 0 01.419-1.288l1.98-1.439-.757-2.328a1.149 1.149 0 01.419-1.287c.203-.148.44-.22.677-.22zm2.656 2.974c-.237 0-.474-.074-.677-.221l-1.73-1.257.66 2.034c.155.476-.013.994-.418 1.288L8.59 37.465h2.14c.5 0 .94.32 1.095.796l.661 2.035.661-2.035a1.15 1.15 0 011.095-.796h2.14l-1.73-1.257a1.15 1.15 0 01-.42-1.288l.662-2.034-1.731 1.257a1.15 1.15 0 01-.677.22zm-4.3 3.101h-.002.003zm4.425 3.215v-.001z"
                                  fill="#ED9ABC"
                              />
                              <Path
                                  d="M25.947 30.567c-1.574 1.595-2.116 4.136-2.292 5.986a.807.807 0 01-.53.696.847.847 0 01-.833-.122c-.3-.537-1.918-3.684-.546-6.786a.64.64 0 10-1.173-.519c-1.776 4.017.573 7.895.674 8.059a.64.64 0 00.11.133c.605.56 1.458.726 2.226.434a2.1 2.1 0 001.35-1.773c.156-1.643.618-3.88 1.927-5.206 1.369-1.387 3.962-3.694 5.418-4.974v.438c0 .354.287.641.642.641h6.005a.641.641 0 00.641-.641V15.077a.641.641 0 00-.641-.642h-6.006a.641.641 0 00-.641.642v9.713c-.942.819-4.566 3.99-6.33 5.777zm7.614-14.85h4.723v10.574H33.56V15.718z"
                                  fill="#846F75"
                              />
                              <Path
                                  d="M15.625 28.674h6.42c1.103 0 2-.897 2-2v-8.236a.641.641 0 10-1.283 0v8.237a.718.718 0 01-.717.716h-6.42a.717.717 0 01-.717-.716v-10.24c0-.396.322-.718.717-.718h7.715l7.049 1.415a.642.642 0 00.252-1.258l-7.111-1.427a.652.652 0 00-.126-.013h-7.778c-1.103 0-2 .898-2 2v10.24c0 1.103.897 2 2 2z"
                                  fill="#846F75"
                              />
                              <Path
                                  d="M24.028.88C10.801.88.039 11.642.039 24.87c0 7.252 3.213 14 8.83 18.584l-2.386 8.45a.641.641 0 00.873.763l10.57-4.598a24.04 24.04 0 006.102.789c13.228 0 23.989-10.761 23.989-23.989C48.017 11.642 37.256.88 24.028.88zm0 46.695c-2.016 0-4.03-.27-5.983-.802a.64.64 0 00-.425.03l-9.535 4.148 2.134-7.558a.642.642 0 00-.22-.678c-5.514-4.341-8.677-10.846-8.677-17.846 0-12.52 10.186-22.706 22.706-22.706s22.706 10.186 22.706 22.706-10.186 22.706-22.706 22.706z"
                                  fill="#846F75"
                              />
                          </Svg>
                        </View>
                        <View style={styles.settingTextWrapper}><Text style={styles.settingText}>Report a problem</Text></View>
                      </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.goToScreenHandler("com.lysts.screen.aboutSettings", "About")}}>
                      <View style={styles.settingRow}>
                        <View style={styles.settingSVGWrapper}>
                          <Svg width={35} height={30} viewBox="0 0 44 52" fill="none">
                              <Path
                                  d="M5.78 14.146a.749.749 0 01-.53-1.279l7.788-7.787a.749.749 0 111.06 1.06L6.31 13.925a.746.746 0 01-.53.22z"
                                  fill="#EBE7F2"
                              />
                              <Path
                                  d="M42.927 45.757l-6.18-6.18a3.355 3.355 0 00-2.49-.98l-2.191-2.191c3.614-5.335 3.063-12.67-1.659-17.39-5.348-5.35-14.052-5.35-19.401 0-5.35 5.348-5.35 14.051 0 19.4a13.629 13.629 0 009.7 4.019c2.785 0 5.44-.826 7.693-2.358l2.189 2.189a3.353 3.353 0 00.98 2.49l6.18 6.18a3.356 3.356 0 002.381.985c.862 0 1.724-.328 2.38-.985l.418-.417a3.37 3.37 0 000-4.762zm-30.861-8.4c-4.765-4.764-4.765-12.517 0-17.282a12.181 12.181 0 018.64-3.573c3.13 0 6.26 1.191 8.642 3.573 4.764 4.765 4.764 12.517 0 17.282a12.14 12.14 0 01-8.641 3.58 12.141 12.141 0 01-8.642-3.58zm19.501 2.637c-.195.195-.358.41-.495.637L29.6 39.159c.276-.237.547-.482.808-.742a13.8 13.8 0 00.74-.809l1.473 1.473a3.36 3.36 0 00-.637.495l-.417.418zm10.3 9.465l-.417.418a1.87 1.87 0 01-2.642 0l-6.181-6.181a1.87 1.87 0 010-2.642l.417-.418a1.863 1.863 0 011.321-.546c.479 0 .957.182 1.322.546l6.18 6.181a1.87 1.87 0 010 2.642z"
                                  fill="#846F75"
                              />
                              <Path
                                  d="M34.986 49.928H1.754V14.144H13.57a.75.75 0 00.75-.75V1.58h25.313v39.508a.75.75 0 101.498 0V.829a.75.75 0 00-.749-.749H13.57a.75.75 0 00-.53.22L.475 12.864c-.14.14-.22.33-.22.53v37.282c0 .414.336.75.75.75h33.981a.75.75 0 100-1.5zM2.814 12.646L12.821 2.638v10.007H2.814z"
                                  fill="#846F75"
                              />
                              <Path
                                  d="M22.816 24.1h-8.582a.75.75 0 110-1.499h8.582a.75.75 0 110 1.499zM27.156 27.677H14.234a.75.75 0 110-1.5h12.922a.75.75 0 110 1.5zM27.156 31.253H14.234a.75.75 0 110-1.499h12.922a.75.75 0 110 1.499zM27.156 34.83H14.234a.75.75 0 110-1.5h12.922a.75.75 0 110 1.5z"
                                  fill="#65C1D6"
                              />
                          </Svg>
                        </View>
                        <View style={styles.settingTextWrapper}><Text style={styles.settingText}>About</Text></View>
                      </View>
                    </TouchableOpacity>

                    <View style={styles.divider}></View>
                    
                    <TouchableOpacity disabled={this.state.loggingOut} activeOpacity={0.8} onPress={()=>{
                      this.setState({
                        loggingOut: true
                      })
                    }}>
                      <View style={styles.settingRow}>
                        <View style={styles.settingTextWrapper}><Text style={[styles.settingText,{color:'#6990C4'}]}>{this.state.loggingOut ? 'Logging out, Please wait...' : 'Logout of Lysts'}</Text></View>
                      </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{}}>
                      <View style={styles.settingRow}>
                        <View style={styles.settingTextWrapper}><Text style={[styles.settingText,{color:'#EF4C4E'}]}>Delete my account</Text></View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
                {this.state.loggingOut ? this.logoutHandler() : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1A2C34',
        //Darkmode Background backgroundColor: '#263238',
        backgroundColor: '#FCFCFC'
    },
    
    titleWrapper:{},
    title:{
      paddingHorizontal: 25,
      paddingTop: 10,
      paddingBottom: 3,
      color: '#515D70',
      fontSize: 15,
      fontFamily: 'Poppins-Medium'
    },


    settingsScroll:{
      paddingBottom: 60
    },
    settingsWrapper:{
      paddingHorizontal: 25,
      paddingVertical: 30
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
