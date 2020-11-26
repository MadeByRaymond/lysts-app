
import { Navigation } from "react-native-navigation";
import {Provider} from 'react-redux';
import configureStore from './src/store/config';

import {app as realmApp} from './storage/realm';

import AsyncStorage from '@react-native-community/async-storage';

// DEV IMPORTS
if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

// REDUX STORE 
const store = configureStore();

// APP SCREENS IMPORTS
import Wishlist from "./src/screens/wishlist/wishlist";
import Home from "./src/screens/home/home";
import CreateWishlist from "./src/screens/createWishlist/createWishlist";
import SelectCategory from "./src/screens/createWishlist/selectCategory";
import WishlistDetails from "./src/screens/wishlistDetails/wishlistDetails";
import Profile from "./src/screens/profile/profile";
import ProfileInfo from "./src/screens/profile/profileInfo";
import Save_Archive from  "./src/screens/wishlist/save_archive";
import Settings from  "./src/screens/settings/settings";
import AboutSettings from  "./src/screens/settings/about_settings";
import NotificationSettings from  "./src/screens/settings/notification_settings";
import SecuritySettings from  "./src/screens/settings/security_settings";
import Auth from "./src/screens/Auth/auth";
// APP COMPONENTS IMPORTS
import SavedButton from "./src/components/saveWishlistButton/saveButton";

// DEMO SCREEN
import Demo from "./src/screens/demo";
Navigation.registerComponent('com.lysts.screen.demo', () => Demo);


// AUTH SCREEN
Navigation.registerComponentWithRedux('com.lysts.screen.auth', () => Auth, Provider, store);

// APP SCREEN COMPONENTS REGISTER
Navigation.registerComponentWithRedux('com.lysts.screen.wishlist', () => Wishlist, Provider, store);
Navigation.registerComponent('com.lysts.screen.home', () => Home);
Navigation.registerComponent('com.lysts.screen.selectCategory', () => SelectCategory);
Navigation.registerComponentWithRedux('com.lysts.screen.createWishlist', () => CreateWishlist, Provider, store);
Navigation.registerComponent('com.lysts.screen.wishlistDetails', () => WishlistDetails);
Navigation.registerComponent('com.lysts.screen.profile', () => Profile);
Navigation.registerComponentWithRedux('com.lysts.screen.profileInfo', () => ProfileInfo, Provider, store);
Navigation.registerComponentWithRedux('com.lysts.screen.save_archive', () => Save_Archive, Provider, store);
Navigation.registerComponentWithRedux('com.lysts.screen.settings', () => Settings, Provider, store);
Navigation.registerComponent('com.lysts.screen.aboutSettings', () => AboutSettings);
Navigation.registerComponentWithRedux('com.lysts.screen.notificationSettings', () => NotificationSettings, Provider, store);
Navigation.registerComponentWithRedux('com.lysts.screen.securitySettings', () => SecuritySettings, Provider, store);
// NON SCREEN COMPONENTS REGISTER
Navigation.registerComponent('com.lysts.component.SavedButton', () => SavedButton);


// REQUIRED APP RESOURCES
require("./src/assets/images/home_bg.png");



export const loginRoot = {
  root: {
    component: {
      name: 'com.lysts.screen.auth',
      options : {
        statusBar: {
          backgroundColor: '#000',
          style: 'dark'
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



 
  //   component: {
  //     name:'com.lysts.WelcomeScreen',
  //     options : {
  //     }
  //   }

    // stack: {
    //   children: [
    //     {
    //       component: {
    //         name: 'com.lysts.WelcomeScreen',
    //         options: {
    //           topBar: {
    //             title: {
    //               text: 'Find a Place'
    //             },
    //             leftButtons: {
    //                // id: 'sideMenu',
    //                // icon: hamburger
    //              }
    //           }
    //         }
    //       }
    //     }  
    //   ]
    // }


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
    push:{
      content:{
        // y:{
        //   from: 2000,
        //   to: 0,
        //   duration: 500
        // }
      }
    },
    // pop:{
    //   content:{
    //     x:{
    //       from: -2000,
    //       to: 0,
    //       duration: 500
    //     }
    //   }
    // }
  },
  layout: {
    orientation: ['portrait']
  }
});

Navigation.events().registerAppLaunchedListener(async() => {
   Navigation.setRoot(await isLoggedIn() ? mainRoot : loginRoot);
  //  Navigation.setRoot(mainRoot);
});

const isLoggedIn = async () =>{
  try {
    return (realmApp.currentUser.isLoggedIn) ? true : false;
  } catch(e) {
    return false;
  }


  // let tokenAvailable;
  // try {
  //   tokenAvailable = await AsyncStorage.multiGet(['awesomeproject:auth:expiresIn', 'awesomeproject:auth:token']);
  //   // console.log(tokenAvailable);
    
  //   let expTime  = tokenAvailable[0][1] || null;
  //   let tokenStored  = tokenAvailable[1][1] || null;

  //   // console.log(tokenStored);

  //   // console.log(expTime);
    

  //   if (expTime !== null) {
  //     let now = new Date();
  //     let expDate = new Date(parseInt(expTime));
  //     // console.log(now);
      

  //     if (expDate > now) {
  //       return tokenStored !== null ? true : false;
  //     }else{
  //       return false;
  //     }
  //   }else{
  //     return false;
  //   }
  // } catch(e) {
  //   return false;
  // }
}