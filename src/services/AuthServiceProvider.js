import Realm from 'realm';
import {Navigation} from 'react-native-navigation';

import {app as realmApp} from '../../storage/realm';
import {getGoogleAuthCode} from './GoogleAuthService';
import {getFacebookAccessToken} from './FacebookAuthService';

import {loginRoot,mainRoot} from '../../App';

export const signInAuth = async (type, redirectAfterLogin = true, callbackFunc = (response) => {}, errorCallbackFunc = (err) =>{}) =>{
    try {
        let credentials;
        if(type == 'google'){
            credentials = Realm.Credentials.google(await getGoogleAuthCode())
        }else if(type == 'facebook'){
            await getFacebookAccessToken();
        }else if(type == 'demo'){
            credentials = Realm.Credentials.emailPassword("demo@mymail.com", "password");
        }else{
            credentials = Realm.Credentials.anonymous();
        }

        let user = await realmApp.logIn(credentials);
        console.log("Successfully logged in!", user);
        callbackFunc(user);

        redirectAfterLogin ? Navigation.setRoot(mainRoot) : null;     
    } catch (error) {
        console.error("Failed to log in", error);
        errorCallbackFunc(error);
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