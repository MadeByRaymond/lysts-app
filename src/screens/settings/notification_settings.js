import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Linking, NativeModules, Platform  } from 'react-native';
import Svg, { Circle, Path } from "react-native-svg";
import SelectPicker from 'react-native-picker-select';
import Sound from 'react-native-sound'
// import AsyncStorage from '@react-native-community/async-storage';
import debounce from 'lodash.debounce';
import NetInfo from "@react-native-community/netinfo";

import {message} from '../../services/FCMService';

import {dWidth} from '../../includes/variables';

import {app as realmApp} from '../../../storage/realm';

import {LocalNotification} from '../../services/LocalPushController';

import NoConnectionAlert from '../../components/Alerts/noConnection/noConnectionAlert';

let prevComponentId;

export default class settings extends Component {
  unsubscribeNetworkUpdate;
  constructor(props) {
    super(props);

    this.user = realmApp.currentUser;
    this.userData = realmApp.currentUser.customData;

    this.notificationSounds = [
      {
        id: 'SID-0',
        sound: 'default_notification_sound_long_expected_548.mp3',
        title: 'Default'
      },
      {
        id: 'SID-324',
        sound: 'arrogant_324.mp3',
        title: 'Arrogant'
      },
      {
        id: 'SID-469',
        sound: 'awareness_469.mp3',
        title: 'Awareness'
      }
    ]

    this.state = {
      savingData: false,
      notifications:{
        appUpdates: this.userData.settings.notification.appUpdates,
        systemNotifications: this.userData.settings.notification.systemNotifications
      },

      // getStoredData:true,

      notificationModal: false,
      notificationSound: {
        id: 'SID-0',
        sound: 'default_notification_sound_long_expected_548.mp3',
        title: 'Default'
      },
      hasNetworkConnection: true,
    }
  }  
  
  
  componentDidMount(){
    this.unsubscribeNetworkUpdate = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      this.setState({hasNetworkConnection: state.isConnected});
    });
    // createChannel(this.state.notificationSound.sound);
    
    prevComponentId = global.activeComponentId;
    global.activeComponentId = this.props.componentId;
  }

  componentWillUnmount() {
    global.activeComponentId = prevComponentId;

    this.unsubscribeNetworkUpdate();
    //  /*stopSampleSound();*/
  }

  component

    testNotification = () => {
      LocalNotification();
      // PushNotification.localNotification({
      //   /* Android Only Properties */
      //   channelId: "your-channel-id", // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
      //   ticker: "My Notification Ticker", // (optional)
      //   showWhen: true, // (optional) default: true
      //   autoCancel: true, // (optional) default: true
      //   // largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
      //   // smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      //   bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      //   subText: "This is a subText", // (optional) default: none
      //   // bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
      //   color: "red", // (optional) default: system default
      //   vibrate: true, // (optional) default: true
      //   vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      //   tag: "some_tag", // (optional) add tag to message
      //   group: "group", // (optional) add group to message
      //   groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      //   ongoing: false, // (optional) set whether this is an "ongoing" notification
      //   priority: "high", // (optional) set notification priority, default: high
      //   visibility: "private", // (optional) set notification visibility, default: private
      //   ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
      //   shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
      //   onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
        
      //   when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      //   usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      //   timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
      
      //   messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 
      
      //   actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
      //   invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

      //   /* iOS and Android properties */
      //   id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      //   title: "My Notification Title", // (optional)
      //   message: "My Notification Message", // (required)
      //   userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
      //   playSound: false, // (optional) default: true
      //   soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      //   number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      //   repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
      // });
    }

    saveData = async () => {
      try {
          const mongo = this.user.mongoClient("MongoDB-Atlas-mylystsapp-wishlists");
          const collection = mongo.db("lysts").collection("users");

          const filter = {
              userID: this.user.id, // Query for the user object of the logged in user
          };

          const updateDoc = {
              $set: {
                settings: {
                  notification: this.state.notifications
                },
                lastModified: new Date()
              },
          };
          const result = await collection.updateMany(filter, updateDoc);
          console.log(result);

          const customUserData = await this.user.refreshCustomData();
          console.log(customUserData);

          customUserData.settings.notification.appUpdates ? await message.subscribeToTopic('app_updates') : await message.unsubscribeFromTopic('app_updates')
          customUserData.settings.notification.systemNotifications ? await message.subscribeToTopic('general') : await message.unsubscribeFromTopic('general')

          this.setState({
            savingData: false,
            notifications:{
              appUpdates: customUserData.settings.notification.appUpdates,
              systemNotifications: customUserData.settings.notification.systemNotifications
            }
          }, alert("Saved Successfully!!"))
      } catch (error) {
          this.setState({
              savingData: false
          }, alert("Error saving your information"))
      }
    }

    // notificationSoundChangeHandler = (value) => {
    //   //  /*stopSampleSound();*/
    //   AsyncStorage.setItem('lystsApp:settings:notificationSound', JSON.stringify(value)).then(() => {
    //     console.log('Saved value is: ' + JSON.stringify(value));
    //     // this.setState({notificationSound:value});
    //   }).catch((e) => {
    //     alert('error while saving');
    //   });
    // }
    
    render() {
        this.state.savingData ? this.saveData() : null;

        // if(this.state.getStoredData){
        //   AsyncStorage.getItem('lystsApp:settings:notificationSound').then((value) => {
        //     console.log('gotten value is: ' + value);
        //     this.setState({notificationSound:(value != null ? JSON.parse(value): this.notificationSounds[0]),getStoredData:false});
        //   }).catch((e)=>{
        //     alert('error while getting');
        //   })
        // }

        return (
            <View style={styles.container}>
                {/* <SoundsModal 
                  modalState = {this.state.notificationModal}
                  closeModal = {() => {this.setState({notificationModal: false}, ()=>{this.notificationSoundChangeHandler(this.state.notificationSound); recreateChannel(this.state.notificationSound.sound)})}}
                  soundsList = {this.notificationSounds}
                  notificationSound = {this.state.notificationSound}
                  setNotificationSound = {(notificationSound) => {
                    this.setState({notificationSound})
                  }}
                /> */}
                <View style={styles.titleWrapper}><Text style={styles.title}>Get notification about</Text></View>
                <View style={styles.settingsWrapper}>
                  <TouchableOpacity disabled={!this.state.hasNetworkConnection} activeOpacity={0.8} onPress={()=>{ /*stopSampleSound();*/ this.setState((prevState) => {
                    return ({savingData: true, notifications: {...prevState.notifications, appUpdates: !prevState.notifications.appUpdates} });
                  })}}>
                    <View style={styles.settingRow}>
                      <View style={styles.settingSVGWrapper}>
                        <Svg width={35} height={30} viewBox="0 0 39 62" fill="none">
                          <Path
                            d="M19.5 61.008a.662.662 0 01-.663-.663V38.593a.662.662 0 111.325 0v21.752a.662.662 0 01-.663.663z"
                            fill="#EBE7F2"
                          />
                          <Path
                            d="M27.576 15.405l-2.2-1.101a28.218 28.218 0 00-3.367-11.796A2.863 2.863 0 0019.46.993c-1.08 0-2.032.566-2.548 1.515a28.22 28.22 0 00-3.366 11.796l-2.201 1.1a6.008 6.008 0 00-3.338 5.403v3.916c0 .366.296.662.662.662h6.437v3.975c0 .366.296.662.662.662h7.457a.662.662 0 00.663-.662v-3.975h6.366a.662.662 0 00.662-.662v-3.916a6.01 6.01 0 00-3.339-5.402zM9.33 20.807a4.69 4.69 0 012.606-4.218l1.559-.78v8.252H9.33v-3.254zm5.49-4.865c0-4.458 1.125-8.884 3.254-12.8.281-.517.799-.824 1.386-.824.587 0 1.105.307 1.385.823A26.876 26.876 0 0124.1 15.942v8.119h-3.978v-8.592a.662.662 0 10-1.324 0v8.592h-3.979v-8.119zm7.742 12.756h-6.133v-3.313h6.133v3.313zm7.028-4.637h-4.165V15.81l1.558.78a4.69 4.69 0 012.607 4.217v3.254zM19.498 30.63a.662.662 0 00-.662.662v3.704a.662.662 0 101.325 0v-3.704a.662.662 0 00-.663-.662zM17.048 30.63a.662.662 0 00-.662.662v1.4a.662.662 0 101.324 0v-1.4a.662.662 0 00-.662-.662zM21.95 30.63a.662.662 0 00-.663.662v1.4a.662.662 0 101.325 0v-1.4a.662.662 0 00-.663-.662z"
                            fill="#F9B087"
                          />
                          <Path
                            d="M38.669 27.144l-5.384-3.108a.662.662 0 10-.662 1.147l4.39 2.534L19.5 37.83 1.987 27.717l4.419-2.55a.662.662 0 00-.662-1.148L.33 27.144a.663.663 0 00-.331.573V49.47c0 .237.126.455.331.574L19.17 60.919a.663.663 0 00.662 0L38.67 50.043a.663.663 0 00.331-.574V27.717a.663.663 0 00-.331-.573zM19.5 59.58L1.325 49.087V28.864l17.844 10.303a.662.662 0 00.662 0l17.844-10.303v20.223L19.5 59.58zM17.008 11.559h4.981a.663.663 0 00.563-1.011l-2.49-4.018a.663.663 0 00-1.126 0l-2.491 4.018a.663.663 0 00.563 1.01zm2.49-3.423l1.302 2.098h-2.602l1.3-2.098z"
                            fill="#846F75"
                          />
                        </Svg>
                      </View>
                      <View style={styles.checkSettingsWrapper}>
                        <View style={[styles.settingTextWrapper, {maxWidth: (dWidth - 35 - 25 - 25 - 10 - 40)}]}><Text style={styles.settingText}>App updates</Text></View>
                        <View>
                          <Svg width={24} height={24} viewBox="0 0 70 70" fill="none" >
                            <Circle cx={35.158} cy={35.36} r={34.56} fill={this.state.notifications.appUpdates ? "#28A664" : "#E4E7EA"} />
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
                  <TouchableOpacity disabled={!this.state.hasNetworkConnection} activeOpacity={0.8} onPress={()=>{ /*stopSampleSound();*/ this.setState((prevState) => {
                    return ({savingData: true, notifications: {...prevState.notifications, systemNotifications: !prevState.notifications.systemNotifications} });
                  })}}>
                    <View style={styles.settingRow}>
                      <View style={styles.settingSVGWrapper}>
                        <Svg width={35} height={30} viewBox="0 0 56 52" fill="none">
                          <Path
                            d="M51.301 12.18a.61.61 0 10-1.034.65 24.697 24.697 0 013.775 12.56H42.745c-.046-3.96-.544-7.77-1.446-11.206 2.11-.569 4.077-1.288 5.841-2.152a.61.61 0 10-.537-1.097c-1.699.831-3.596 1.525-5.633 2.073-.561-1.886-1.246-3.647-2.052-5.237-1.377-2.716-3.013-4.769-4.81-6.08 4.9.96 9.383 3.382 12.947 7.052a.611.611 0 00.877-.85C42.992 2.802 36.364 0 29.273 0a25.94 25.94 0 00-17.458 6.733 25.936 25.936 0 00-8.4 16.544.61.61 0 101.215.126A24.683 24.683 0 019.52 11c2.187 1.325 4.815 2.398 7.73 3.183-.903 3.437-1.401 7.248-1.448 11.207H6.56a.61.61 0 100 1.222h9.243c.037 3.136.354 6.187.95 9.078a.61.61 0 101.197-.246c-.58-2.81-.888-5.78-.925-8.832h1.624a.61.61 0 100-1.222h-1.628c.047-3.93.55-7.635 1.404-10.91 3.18.753 6.658 1.17 10.25 1.213v3.472a.61.61 0 101.222 0v-3.471c3.578-.044 7.047-.458 10.226-1.21.854 3.273 1.357 6.977 1.404 10.906h-1.539a.61.61 0 100 1.222h1.54c-.048 3.93-.55 7.635-1.405 10.91-3.172-.752-6.642-1.169-10.226-1.212v-4.49a.61.61 0 10-1.222 0v4.487a48.175 48.175 0 00-8.22.784.611.611 0 00.224 1.201c2.562-.476 5.25-.73 7.996-.763v13.217c-3.65-.371-7.09-4.115-9.292-10.18a.61.61 0 10-1.149.418c1.563 4.3 3.754 7.52 6.251 9.335a24.7 24.7 0 01-14.197-8.355c1.54-.916 3.322-1.716 5.31-2.377a.611.611 0 00-.385-1.16c-2.134.71-4.047 1.576-5.694 2.572A24.68 24.68 0 014.63 28.598a.61.61 0 10-1.215.126 25.935 25.935 0 008.4 16.543A25.94 25.94 0 0029.275 52c14.336 0 26-11.664 26-26 0-4.906-1.374-9.685-3.974-13.82zM10.29 10.036a24.701 24.701 0 0114.147-8.343c-1.795 1.312-3.43 3.364-4.806 6.079-.806 1.59-1.491 3.35-2.053 5.237-2.745-.738-5.219-1.74-7.288-2.973zm8.463 3.27c2.046-6.906 5.708-11.64 9.922-12.053V14.47c-3.483-.042-6.85-.443-9.922-1.166zm11.144 1.166V1.254c4.204.427 7.857 5.158 9.9 12.051-3.074.725-6.432 1.123-9.9 1.166zm12.848 12.14h11.3a24.645 24.645 0 01-5.05 14.37c-2.181-1.315-4.797-2.382-7.697-3.163.903-3.436 1.4-7.248 1.447-11.207zm-2.95 12.085c-2.042 6.893-5.694 11.623-9.898 12.05V37.53c3.475.044 6.834.445 9.899 1.166zM34.123 50.3c1.79-1.313 3.423-3.363 4.796-6.072.806-1.59 1.49-3.35 2.052-5.237 2.73.735 5.191 1.73 7.254 2.953-3.555 4.219-8.49 7.238-14.102 8.356z"
                            fill="#846F75"
                          />
                          <Path
                            d="M35.433 29.986a.61.61 0 01-.207-.036l-7.49-2.699h-4.624a.61.61 0 110-1.222h4.73c.071 0 .141.012.207.037L35.64 28.8a.61.61 0 01-.207 1.186z"
                            fill="#EBE7F2"
                          />
                          <Path
                            d="M36.044 22.96v-2.815a1.077 1.077 0 00-1.449-1.01l-6.862 2.526h-4.156c-.594 0-1.077.483-1.077 1.076v.788h-.864c-.636 0-1.154.518-1.154 1.154v1.763c0 .636.518 1.154 1.154 1.154h.864v.788c0 .593.483 1.076 1.077 1.076h.672l.796 3.521a.61.61 0 00.596.477h1.81a.61.61 0 00.605-.699l-.48-3.299h.157l6.862 2.526a1.072 1.072 0 00.988-.128c.288-.2.46-.531.46-.883V28.16a2.613 2.613 0 002.113-2.56v-.078c0-1.27-.91-2.328-2.112-2.561zm-14.34 3.413v-1.626h.796v1.626h-.795zm5.041 5.863h-.616l-.627-2.776h.84l.403 2.776zm8.077-1.47l-6.769-2.49a.603.603 0 00-.21-.038h-4.12v-5.355h4.12a.612.612 0 00.21-.038l6.769-2.49v10.412zm2.112-5.167c0 .59-.37 1.093-.89 1.294v-2.666c.52.2.89.704.89 1.294v.078zM49.26 13.502a3.165 3.165 0 01-3.162-3.162A3.166 3.166 0 0149.26 7.18a3.165 3.165 0 013.162 3.162 3.165 3.165 0 01-3.162 3.161zm0-5.102c-1.07 0-1.94.87-1.94 1.94 0 1.07.87 1.94 1.94 1.94 1.07 0 1.94-.87 1.94-1.94 0-1.07-.87-1.94-1.94-1.94zM17.956 41.386a3.165 3.165 0 01-3.162-3.162 3.165 3.165 0 013.162-3.162 3.165 3.165 0 013.162 3.162 3.165 3.165 0 01-3.162 3.162zm0-5.102c-1.07 0-1.94.87-1.94 1.94 0 1.069.87 1.94 1.94 1.94 1.07 0 1.94-.871 1.94-1.94 0-1.07-.87-1.94-1.94-1.94zM3.885 29.162A3.165 3.165 0 01.724 26a3.165 3.165 0 013.161-3.162A3.165 3.165 0 017.047 26a3.165 3.165 0 01-3.162 3.162zm0-5.102c-1.07 0-1.94.87-1.94 1.94 0 1.07.87 1.94 1.94 1.94 1.07 0 1.94-.87 1.94-1.94 0-1.07-.87-1.94-1.94-1.94z"
                            fill="#A58BC9"
                          />
                        </Svg>
                      </View>
                      <View style={styles.checkSettingsWrapper}>
                        <View style={[styles.settingTextWrapper, {maxWidth: (dWidth - 35 - 25 - 25 - 10 - 40)}]}><Text style={styles.settingText}>Other system notifications</Text></View>
                        <View>
                          <Svg width={24} height={24} viewBox="0 0 70 70" fill="none" >
                            <Circle cx={35.158} cy={35.36} r={34.56} fill={this.state.notifications.systemNotifications ? "#28A664" : "#E4E7EA"} />
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
                
                <View style={[styles.titleWrapper, {marginTop: -10}]}><Text style={styles.title}>Other settings</Text></View>
                <View style={styles.settingsWrapper}>  
                  <TouchableOpacity activeOpacity={0.8} onPress={()=>{ 
                    NativeModules.OpenSettings.openNotificationSettings(data => {
                      console.log('call back data', data);
                    });
                  // this.setState({notificationModal:true})
                  // Linking.canOpenURL('app-settings:').then(support =>{ return Linking.openURL('app-settings://notification')}).catch(err=> {console.log(err)})
                  }}>
                    <View style={styles.settingRow}>
                      <View style={styles.settingSVGWrapper}>
                        <Svg width={35} height={30} viewBox="0 0 50 52" fill="none">
                          <Path
                            d="M29.917 23.449a.68.68 0 01-.482-1.164c.326-.326.506-.76.506-1.222 0-.461-.18-.895-.506-1.221a1.716 1.716 0 00-1.222-.507c-.462 0-.896.18-1.222.506a.682.682 0 01-.964-.964 3.072 3.072 0 012.186-.905c.826 0 1.602.321 2.186.905a3.07 3.07 0 01.906 2.186c0 .826-.322 1.603-.906 2.186a.682.682 0 01-.482.2z"
                            fill="#ED9ABC"
                          />
                          <Path
                            d="M33.218 26.75a.68.68 0 01-.482-1.163l.513-.513-1.042-1.767a.682.682 0 01.417-1.006l1.985-.512v-1.452l-1.985-.511a.682.682 0 01-.417-1.007l1.042-1.766-1.027-1.027-1.766 1.042a.681.681 0 01-1.006-.417l-.512-1.985h-1.452l-.511 1.985a.682.682 0 01-1.007.417l-1.766-1.042-.514.513a.681.681 0 11-.964-.964l.527-.527a1.339 1.339 0 011.626-.207l1.003.592.29-1.127a1.34 1.34 0 011.297-1.004h1.49c.61 0 1.143.413 1.296 1.003l.29 1.128 1.003-.591a1.338 1.338 0 011.627.206l1.053 1.054c.432.432.517 1.1.207 1.626l-.591 1.003 1.127.29a1.34 1.34 0 011.004 1.297v1.49c0 .61-.412 1.143-1.004 1.296l-1.128.29.592 1.003c.31.526.225 1.195-.207 1.627l-.527.527a.677.677 0 01-.481.2z"
                            fill="#ED9ABC"
                          />
                          <Path
                            d="M8.555 46.632a.681.681 0 01-.482-1.164l7.934-7.933a.677.677 0 01.192-.135l17.317-8.144a.682.682 0 11.58 1.234l-17.21 8.094-7.849 7.849a.68.68 0 01-.482.2z"
                            fill="#EBE7F2"
                          />
                          <Path
                            d="M25.85 47.735l-7.047-5.26.986-.985 15.869-7.33a1.787 1.787 0 00.514-2.885L18.009 13.113a1.788 1.788 0 00-2.884.514l-7.33 15.868-7.067 7.067a1.788 1.788 0 000 2.526l1.864 1.864L.6 42.945a1.97 1.97 0 000 2.783l2.957 2.957c.384.384.888.576 1.392.576.504 0 1.008-.192 1.392-.576l1.992-1.992 1.864 1.864c.349.348.806.522 1.263.522.458 0 .915-.174 1.263-.522l1.561-1.562 7.759 4.9a.679.679 0 00.846-.095l3.037-3.037a.682.682 0 00-.076-1.028zm-20.474-.014a.606.606 0 01-.856 0l-2.957-2.957a.606.606 0 010-.855l1.993-1.993 3.812 3.813-1.992 1.992zm6.382-.128a.423.423 0 01-.597 0l-9.469-9.47a.423.423 0 010-.597l7.153-7.153a.685.685 0 00.137-.196l7.38-15.978a.418.418 0 01.385-.245c.08 0 .196.022.298.123L35.207 32.24c.14.14.129.307.117.372a.419.419 0 01-.239.31l-15.978 7.38a.677.677 0 00-.196.138l-7.153 7.153zm10.55 2.858l-7.036-4.444 2.557-2.557 6.574 4.907-2.094 2.094z"
                            fill="#846F75"
                          />
                          <Path
                            d="M28.636 0C17.22 0 7.933 9.288 7.933 20.704a.682.682 0 101.363 0c0-10.665 8.676-19.34 19.34-19.34s19.34 8.675 19.34 19.34c0 10.664-8.676 19.34-19.34 19.34a.682.682 0 100 1.363c11.416 0 20.704-9.287 20.704-20.703C49.34 9.288 40.052 0 28.636 0z"
                            fill="#846F75"
                          />
                          <Path
                            d="M28.636 6.642c7.753 0 14.061 6.308 14.061 14.061a.682.682 0 101.364 0c0-8.505-6.92-15.424-15.425-15.424a.682.682 0 100 1.363z"
                            fill="#846F75"
                          />
                          <Path
                            d="M28.636 11.199c5.24 0 9.505 4.264 9.505 9.504a.682.682 0 101.363 0c0-5.992-4.875-10.868-10.868-10.868a.682.682 0 100 1.364z"
                            fill="#846F75"
                          />
                        </Svg>
                      </View>
                      <View style={styles.settingTextWrapper}><Text style={styles.settingText}>Notification sound</Text></View>
                    </View>
                  </TouchableOpacity>
                  {/* <View style={{marginLeft:20}}>
                    <TouchableOpacity activeOpacity={0.8} hitSlop={{top:20, left:20, bottom:20, right:20,}} onPress={debounce(()=>{
                      let notiSound = new Sound(this.state.notificationSound.sound, Sound.MAIN_BUNDLE, (error) => {
                          if (error) {
                              console.log('failed to load the sound', error);
                              return;
                          }
                          // loaded successfully
                          console.log('duration in seconds: ' + notiSound.getDuration() + 'number of channels: ' + notiSound.getNumberOfChannels());
                          
                          
                          // Stop the sound and rewind to the beginning
                          notiSound.stop(() => {
                              // Note: If you want to play a sound after stopping and rewinding it,
                              // it is important to call play() in a callback.
                              
                              // Play the sound with an onEnd callback
                              notiSound.play((success) => {
                                  if (success) {
                                      console.log('successfully finished playing');
                                  } else {
                                      console.log('playback failed due to audio decoding errors');
                                  }
                                  notiSound.release();
                              });

                              
                          });
                      })
                    }, 1000, {leading: true,trailing: false})}>
                      <View style={styles.notificationSoundPlayWrapper}>
                        <View><Text style={styles.notificationSoundPlayText}>{this.state.notificationSound.title}</Text></View>
                        <View style={styles.notificationSoundPlayIcon}>
                          <Svg
                            width={16}
                            height={16}
                            viewBox="0 0 31 31"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <Path
                              d="M15.5 0C6.953 0 0 6.953 0 15.5S6.953 31 15.5 31 31 24.047 31 15.5 24.047 0 15.5 0zm6.162 16.043l-9.042 5.813a.643.643 0 01-.658.023.645.645 0 01-.337-.567V9.688a.645.645 0 01.995-.543l9.042 5.813a.647.647 0 010 1.086z"
                              fill="#63AAAD"
                            />
                          </Svg>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View> */}
                  
                  <TouchableOpacity activeOpacity={0.8} onPress={() => { /*stopSampleSound();*/ this.testNotification()}}>
                    <View style={styles.settingRow}>
                      <View style={styles.settingSVGWrapper}>
                        <Svg width={35} height={30} viewBox="0 0 45 51" fill="none">
                          <Path
                            d="M9.098 43.456a.61.61 0 01-.61-.61v-9.388H.61a.61.61 0 110-1.22h8.488a.61.61 0 01.61.61v9.997a.61.61 0 01-.61.61zM35.21 43.456a.61.61 0 01-.61-.61v-9.998a.61.61 0 01.61-.61h8.487a.61.61 0 110 1.22H35.82v9.387a.61.61 0 01-.61.61zM26.916 17.183a.61.61 0 01-.61-.61v-9.63h-4.141a.61.61 0 01-.61-.61V.61a.61.61 0 111.22 0v5.113h4.141a.61.61 0 01.61.61v10.24a.61.61 0 01-.61.61zM22.091 51a.61.61 0 01-.61-.61v-8.916H17.68a.61.61 0 01-.61-.61V35.92a.61.61 0 111.22 0v4.332h3.801a.61.61 0 01.61.61v9.527a.61.61 0 01-.61.61z"
                            fill="#65C1D6"
                          />
                          <Path
                            d="M31.842 31.037a.607.607 0 01-.206-.037L19.72 26.707H12.34a.61.61 0 110-1.22h7.488c.07 0 .14.012.207.036l12.015 4.329a.61.61 0 01-.207 1.184z"
                            fill="#EBE7F2"
                          />
                          <Path
                            d="M44.027 12.527L22.472.082a.61.61 0 00-.61 0L.305 12.526a.61.61 0 00-.305.53v24.889c0 .218.116.42.305.528l21.555 12.445a.608.608 0 00.61 0l21.556-12.445a.61.61 0 00.305-.528v-24.89a.61.61 0 00-.305-.528zM22.167 1.315L42.5 13.055 35.495 17.1a.61.61 0 10.61 1.057l7.006-4.045v9.604h-7.367a3.777 3.777 0 00-3.29-3.137v-4.762a1.348 1.348 0 00-1.813-1.264l-10.922 4.02h-6.642a1.35 1.35 0 00-1.348 1.347v1.603h-1.725a1.47 1.47 0 00-1.469 1.47v.785H1.222v-9.666l7.572 4.372a.61.61 0 10.61-1.057l-7.572-4.372 20.334-11.74zm10.287 20.497a2.555 2.555 0 012.123 2.514v.123c0 1.261-.92 2.309-2.123 2.514v-5.15zm-13.95 13.499h-1.673l-1.154-5.108h2.085l.742 5.108zm-5.427-6.328a.127.127 0 01-.127-.127v-8.937c0-.07.057-.126.127-.126h6.751a.609.609 0 00.21-.038l11.025-4.057a.124.124 0 01.116.015c.025.017.054.05.054.104v17.142c0 .055-.03.087-.054.104a.124.124 0 01-.116.015l-11.024-4.057a.604.604 0 00-.21-.038h-6.752zm-1.348-2.951h-1.725a.249.249 0 01-.248-.25v-2.79c0-.137.111-.248.248-.248h1.725v3.288zm10.437 23.653L1.222 37.592V24.998h7.313v.785c0 .81.66 1.47 1.47 1.47h1.724v1.603c0 .743.605 1.347 1.348 1.347h1.35l1.321 5.853a.61.61 0 00.595.476h2.867a.61.61 0 00.604-.698l-.818-5.63h.723l10.922 4.019a1.34 1.34 0 001.236-.16c.361-.25.577-.664.577-1.104v-4.762a3.777 3.777 0 003.308-3.26h7.35v12.656L22.165 49.685z"
                            fill="#846F75"
                          />
                          <Path
                            d="M26.917 12.253H13.559a.61.61 0 110-1.221h13.358a.61.61 0 110 1.22z"
                            fill="#65C1D6"
                          />
                          <Path
                            d="M11.735 14.076a2.436 2.436 0 01-2.433-2.434 2.436 2.436 0 012.433-2.433 2.437 2.437 0 012.434 2.433 2.437 2.437 0 01-2.434 2.434zm0-3.646a1.214 1.214 0 000 2.426 1.214 1.214 0 000-2.426zM28.74 43.297a2.437 2.437 0 01-2.433-2.434 2.436 2.436 0 012.433-2.434 2.436 2.436 0 012.434 2.434 2.436 2.436 0 01-2.434 2.434zm0-3.647c-.669 0-1.213.544-1.213 1.213 0 .67.544 1.213 1.213 1.213a1.214 1.214 0 000-2.426z"
                            fill="#65C1D6"
                          />
                          <Path
                            d="M26.917 41.474h-4.826a.61.61 0 110-1.221h4.826a.61.61 0 110 1.22z"
                            fill="#65C1D6"
                          />
                        </Svg>
                      </View>
                      <View style={styles.settingTextWrapper}><Text style={styles.settingText}>Test push notification</Text></View>
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

    notificationSoundPlayWrapper:{
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: -18,
      paddingLeft: 25,
      paddingBottom:20
    },
    notificationSoundPlayText:{
      color: '#63AAAD',
      fontSize: 14.5,
      fontFamily: 'Poppins-Regular',
      paddingTop: 3
    },
    notificationSoundPlayIcon:{ marginLeft:5},

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
