import { Linking } from 'react-native';
import { Navigation } from "react-native-navigation";
import PushNotification from "react-native-push-notification";

import {message, inAppMessaging} from './src/services/FCMService';
import {app as realmApp} from './storage/realm';

import {goToViewWishlistScreen} from './src/includes/functions'

import AsyncStorage from '@react-native-community/async-storage';

// DEV IMPORTS
if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

// SPLASH SCREENS IMPORTS
import Splash from "./src/screens/splashScreen/splashScreen";

// ONBOARDING SCREENS 
import OnBoarding from "./src/screens/onBoarding/onboarding";

// AUTH SCREENS IMPORTS
import Auth from "./src/screens/Auth/auth";

// APP SCREENS IMPORTS
import Wishlist from "./src/screens/wishlist/wishlist";
import Home from "./src/screens/home/home";
import CreateWishlist from "./src/screens/createWishlist/createWishlist";
import SelectCategory from "./src/screens/createWishlist/selectCategory";
import WishlistDetails from "./src/screens/wishlistDetails/wishlistDetails";
import Profile from "./src/screens/profile/profile";
import ProfileInfo from "./src/screens/profile/profileInfo";
import CustomizeAvatar from "./src/screens/profile/customizeAvatar";
import Save_Archive from  "./src/screens/wishlist/save_archive";
import Settings from  "./src/screens/settings/settings";
import AboutSettings from  "./src/screens/settings/about_settings";
import NotificationSettings from  "./src/screens/settings/notification_settings";
import SecuritySettings from  "./src/screens/settings/security_settings";

// APP COMPONENTS IMPORTS
import SavedButton from "./src/components/saveWishlistButton/saveButton";

// DEMO REDUX SCREEN SCREEN
// Navigation.registerComponentWithRedux('com.lysts.screen.auth', () => Auth, Provider, store);

// SPLASH SCREEN
Navigation.registerComponent('com.lysts.screen.splash', () => Splash);

// ONBOARDING SCREEN
Navigation.registerComponent('com.lysts.screen.onboarding', () => OnBoarding);

// AUTH SCREEN
Navigation.registerComponent('com.lysts.screen.auth', () => Auth);

// APP SCREEN COMPONENTS REGISTER
Navigation.registerComponent('com.lysts.screen.wishlist', () => Wishlist);
Navigation.registerComponent('com.lysts.screen.home', () => Home);
Navigation.registerComponent('com.lysts.screen.selectCategory', () => SelectCategory);
Navigation.registerComponent('com.lysts.screen.createWishlist', () => CreateWishlist);
Navigation.registerComponent('com.lysts.screen.wishlistDetails', () => WishlistDetails);
Navigation.registerComponent('com.lysts.screen.profile', () => Profile);
Navigation.registerComponent('com.lysts.screen.profileInfo', () => ProfileInfo);
Navigation.registerComponent('com.lysts.screen.customizeAvatar', () => CustomizeAvatar);
Navigation.registerComponent('com.lysts.screen.save_archive', () => Save_Archive);
Navigation.registerComponent('com.lysts.screen.settings', () => Settings);
Navigation.registerComponent('com.lysts.screen.aboutSettings', () => AboutSettings);
Navigation.registerComponent('com.lysts.screen.notificationSettings', () => NotificationSettings);
Navigation.registerComponent('com.lysts.screen.securitySettings', () => SecuritySettings);

// NON SCREEN COMPONENTS REGISTER
Navigation.registerComponent('com.lysts.component.SavedButton', () => SavedButton);


// FCM Register Background Handler
message.setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

// FCM Notification Foreground Handler
message.onMessage(async remoteMessage => {
  // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  (remoteMessage.data.isNotification == "true" && remoteMessage.data.showInForeground == "true") 
  ? PushNotification.localNotification({
    channelId: remoteMessage.notification.android.channelId,
    autoCancel: false,
    bigText: remoteMessage.notification.body,
    // subText: remoteMessage.notification.body,
    title: remoteMessage.notification.title,
    message: remoteMessage.notification.body,
    largeIconUrl: remoteMessage.notification.android.imageUrl,
    bigPictureUrl: remoteMessage.notification.android.imageUrl,
    smallIcon: "ic_launcher_transparent",
    priority: "high",
    // color: "blue",
    showWhen: true,
    // when: new Date(),
    vibrate: true,
    vibration: 300,
    playSound: true,
    // soundName: 'notification_sound.mp3',
    // actions: ["Cancel"],
  }) : null
});

// Subscribe To Notification FCM Topics 
message.subscribeToTopic('general').then(() => {/*console.log('Subscribed to topic - General!')*/});
message.subscribeToTopic('app_updates').then(() => {/*console.log('Subscribed to topic - App Updates!')*/});

// Notification Open App From Background Handler 
message.onNotificationOpenedApp(remoteMessage => {
  /*console.log(
    'Notification caused app to open from background state:',
    remoteMessage.notification,
  ); */
  remoteMessage.data.redirectURL ? Linking.openURL(remoteMessage.data.redirectURL) : null;
});

// Notification Open App From Quit State Handler 
// Check whether an initial notification is available
message
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      /*console.log(
        'Notification caused app to open from quit state:',
        remoteMessage.notification,
      );*/
      remoteMessage.data.redirectURL ? Linking.openURL(remoteMessage.data.redirectURL) : null
      // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
    }
  });

// Handle In App Messaging 
inAppMessaging().setMessagesDisplaySuppressed(false);


// HANDLING DEEP LINKING 
// Deep Linking Launching Quit App Handler 
Linking.getInitialURL().then((url) => {
  if(url.toLowerCase().includes('/wishlink/')){
    let wishlist_code = url.substring(url.lastIndexOf('/wishlink/') + 10);
    
    if(wishlist_code.length == 6){
      global.launchWithCode = wishlist_code;
    }
  }
}).catch((e)=>{});

// Deep Linking Launching Background App Handler 
Linking.addEventListener('url', ({url}) =>{
  if(url.toLowerCase().includes('/wishlink/')){
    let wishlist_code = url.substring(url.lastIndexOf('/wishlink/') + 10);
    
    if(
      wishlist_code.length == 6
      && typeof global.activeComponentId !== 'undefined' 
      && global.activeComponentId !== null 
      && (typeof global.activeComponentId == 'string' && global.activeComponentId.trim() !== '')
    ){
      goToViewWishlistScreen(global.activeComponentId, wishlist_code)
    }
  }
});


// APP ROOTS 
export const splashRoot = {
  root: {
    component: {
      name: 'com.lysts.screen.splash',
      options : {
        statusBar: {
          backgroundColor: 'transparent',
          drawBehind: true,
          translucent: true,
          animate: true,
          blur: true,
          style: 'dark'
        }
      }
    }
  }
};

export const onBoardingRoot = {
  root: {
    component: {
      name: 'com.lysts.screen.onboarding',
      options : {
        statusBar: {
          backgroundColor: 'transparent',
          drawBehind: true,
          translucent: true,
          animate: true,
          blur: true,
          style: 'dark'
        }
      }
    }
  }
};

export const loginRoot = {
  root: {
    stack: {
      id: 'AUTH_STACK',
      children: [
        {
          component: {
            id: 'AUTH_SCREEN',
            name: 'com.lysts.screen.auth'
          }
        }
      ],
      options : {
        statusBar: {
          backgroundColor: '#FEFEFD',
          style: 'dark',
        }
      }
    }
  }
};

export const mainRoot = {
  root:{
    bottomTabs: {
      id: 'BOTTOM_TABS_LAYOUT',
      children: [
        {
          stack: {
            id: 'WISHLIST_TAB',
            children: [
              {
                component: {
                  id: 'WISHLIST_SCREEN',
                  name: 'com.lysts.screen.wishlist'
                }
              }
            ],
            options: {
              bottomTab: {
                icon: require('./src/assets/images/nav-icons/wishlist.png'),
                text: 'Wishlist'
              },
            }
          }
        },
        {
          stack: {
            id: 'HOME_TAB',
            children: [
              {
                component: {
                  id: 'HOME_SCREEN',
                  name: 'com.lysts.screen.home'
                }
              }
            ],
            options: {
              bottomTab: {
                icon: require('./src/assets/images/nav-icons/home.png'),
                text: 'Home'
              }
            }
          }
        },
        {
          stack: {
            id: 'PROFILE_TAB',
            children: [
              {
                component: {
                  id: 'PROFILE_SCREEN',
                  name: 'com.lysts.screen.profile'
                }
              }
            ],
            options: {
              bottomTab: {
                icon: require('./src/assets/images/nav-icons/user.png'),
                text: 'Profile'
              }
            }
          }
        }
      ]
    }
  }
}

// Navigation Default Options
Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: '#FEFEFD',
    style: 'dark'
  },
  topBar: {
    title: {
      color: '#515D70'
    },
    backButton: {
      color: '#515D70',
      icon: require('./src/assets/images/nav-icons/back_arrow.png'),
    },
    background: {
      color: '#FFFFFF'
    },
    visible: false,
    drawBehind: true,
    animate: false,
  },
  bottomTab: {
    fontSize: 11,
    selectedFontSize: 12,
    iconColor:'#BCC2D0',
    textColor: '#BCC2D0',
    selectedIconColor:'#CFA280',
    selectedTextColor: '#CFA280',
    disableSelectedIconTint: true
  },
  bottomTabs: {
    tabsAttachMode : 'onSwitchToTab',
    iconColor: 'red',
    textColor: 'red',
    titleDisplayMode:'showWhenActive',
    elevation: 15
  },
  animations:{
    setRoot :{
      alpha:{
        from : 0,
        to: 1,
        duration: 400,
        startDelay: 0,
        interpolation: 'decelerate'
      }
    }
  },
  layout: {
    orientation: ['portrait']
  }
});

export const getRoot = async () =>{
  try {
    let navRoot;
    if((realmApp.currentUser !== null) && (typeof realmApp.currentUser !== 'undefined') && (realmApp.currentUser.isLoggedIn && realmApp.currentUser.providerType != 'anon-user')){
      navRoot = mainRoot;
    }else{
      // console.log('diff, ');
      let lastOpenedDate = await AsyncStorage.getItem('lystsApp:appStorage:lastOpenedDate');
      // console.log('diff, ', lastOpenedDate);

      // GET Time Since Last Launch - Check if its greater than 12 hours
      let hours = Math.abs(Math.floor(((new Date().getTime()) - (new Date(lastOpenedDate).getTime())) / (60*60*1000)));
      navRoot = (hours > 12) ? onBoardingRoot : loginRoot;
    }

    await AsyncStorage.setItem('lystsApp:appStorage:lastOpenedDate', `${new Date()}`);
    return navRoot;
  } catch(e) {
    console.log(e);
    await AsyncStorage.setItem('lystsApp:appStorage:lastOpenedDate', `${new Date()}`);
    return onBoardingRoot;
  }
}


Navigation.events().registerAppLaunchedListener(async() => {
  //  Navigation.setRoot(await isLoggedIn() ? mainRoot : loginRoot);
  //  Navigation.setRoot(await getRoot());
  Navigation.setRoot(splashRoot);
});