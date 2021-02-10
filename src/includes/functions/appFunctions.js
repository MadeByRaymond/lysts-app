import React from 'react';
import { Share } from 'react-native';
import debounce from 'lodash.debounce';
import { Navigation } from "react-native-navigation";




export function capitalizeFirstLetters(val) {
    val = val.split(" ");

    for(var i = 0, x = val.length; i< x; i++){
        val[i] = val[i][0].toUpperCase() + val[i].substr(1);
    }

    return val.join(" ");
}

export function removeExcessWhiteSpace (value){
  return value !== value.trim() ? (value.trim() + ' ') : value;
}

export function getCategoryDisplay(val) {
    return capitalizeFirstLetters(val.replace('_', ' ').replace('0', '\''))
}

export function validateEmail (email){
  let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(email);
  return valid;
}



export const onShare = debounce(async (dialogTitle, message, title) => {
    try {
      const result = await Share.share({
        message: message,
        title: title
      },{
        dialogTitle: dialogTitle
      });
    //   if (result.action === Share.sharedAction) {
    //     if (result.activityType) {
    //       // shared with activity type of result.activityType
    //     } else {
    //       // shared
    //     }
    //   } else if (result.action === Share.dismissedAction) {
    //     // dismissed
    //   }
    } catch (error) {
      alert('Error sharing message' + error.message);
    }
  }, 1000, {leading: true,trailing: false});


export const goToViewWishlistScreen = debounce((componentId, code, saveStatus = false, updateUIFunction = null) =>{
    // alert('ddd')
    Navigation.push(componentId, {
      component: {
        name: 'com.lysts.screen.wishlistDetails', // Push the screen registered with the 'Settings' key
        options: { // Optional options object to configure the screen
          bottomTabs: {
            animate: false,
            visible: false
          },
          topBar: {
            background: {
              color: '#FFFFFF00'
            },
            elevation: 0,
            visible: true,
            drawBehind: true,
            animate: true,

            
            rightButtons: [
              // {
              //   id: 'actionsButton',
              //   icon: require('../../assets/images/nav-icons/ellipse.png'),
              //   text: 'actions'
              // },
              // {
              //   id: 'saveButton',
              //   text: 'save',
              //   component: {
              //     id:'com.lysts.component.SavedButton',
              //     name: 'com.lysts.component.SavedButton',
              //     passProps: {
              //       saved: saveStatus,
              //       height: 22,
              //       width: 22,
              //       color: '#515D70'
              //     }
              //   }
              // }
            ]
          }
        },
        passProps: {
          booly : saveStatus,
          wishlistCode: code,
          updateUI: updateUIFunction
        }
      }
    });
  }, 1000, {leading: true,trailing: false})

export const goToScreen = debounce((id, screenName,screenProps = {}, screenOptions = {}) =>{
    // alert('ddd')
    Navigation.push(id, {
      component: {
        name: screenName, // Push the screen registered with the 'Settings' key
        options: { // Optional options object to configure the screen
          bottomTabs: {
            animate: false,
            visible: false
          },
          ...screenOptions
        },
        passProps: screenProps
      }
    });
  }, 1000, {leading: true,trailing: false})


