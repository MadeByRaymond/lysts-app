import Realm from 'realm';
import {Navigation} from 'react-native-navigation';

import {app as realmApp} from '../../storage/realm';
import {getGoogleAuthCode} from './GoogleAuthService';
import {getFacebookAccessToken} from './FacebookAuthService';

import {loginRoot,mainRoot} from '../../App';

export const signInAuth = async (type, callbackFunc = () => {}) =>{
    try {
        let credentials;
        if(type == 'google'){
            credentials = Realm.Credentials.google(await getGoogleAuthCode())
        }else if(type == 'facebook'){
            await getFacebookAccessToken();
        }else{
            credentials = Realm.Credentials.emailPassword("demo@mymail.com", "password");
        }

        let user = await realmApp.logIn(credentials);
        console.log("Successfully logged in!", user);
        callbackFunc();

        Navigation.setRoot(mainRoot);     
    } catch (error) {
        console.error("Failed to log in", error);
        callbackFunc();
    }
}


export const signOutAuth = (errorCallbackFunc = () => {}) =>{
    try {
        realmApp.currentUser.logOut().then(()=>{
            alert("Session Terminated");
            Navigation.setRoot(loginRoot);
        }).catch((e) => {
            console.log(e);
            errorCallbackFunc();
        })
    } catch (error) {
        console.log(error);
        errorCallbackFunc();
    }
}