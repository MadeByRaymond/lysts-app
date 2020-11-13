import Realm from 'realm';
import Reactotron from 'reactotron-react-native';
import {Navigation} from 'react-native-navigation';

import {getRealmApp, app as realmApp} from '../../../storage/realm';






import {SIGN_UP_AUTH, SIGN_IN_AUTH, AUTH_SET_TOKEN} from './types';

import AsyncStorage from '@react-native-community/async-storage';

import {uiStartLoading, uiStopLoading} from './index';

import {loginRoot,mainRoot} from '../../../App';

const API_KEY = 'AIzaSyAckTRlpKmVOPuWc5g1x3ODKiMtil1Qr4w';

// const assert = require("assert");

const sendToLogin = () =>{
    alert("Session Expired");
    Navigation.setRoot(loginRoot);
}

// export const signUpAuth = (authData) =>{
//     return dispatch => {
//         dispatch(uiStartLoading());
//         fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 email: authData.email,
//                 password: authData.password,
//                 returnSecureToken : true
//             })
//         })
//         // .then((res) =>{console.log(res); res.json();})
//         .then(res => res.json())
//         .then((parsedRes) =>{
//             console.log(parsedRes);
//             if(parsedRes.error){
//               let message = parsedRes.error.message;
//               if(message == 'EMAIL_EXISTS'){
//                 alert("The email address is already in use by another account.");
//               }else if(message == 'OPERATION_NOT_ALLOWED'){
//                 alert("This Sign-in method is not supported.");
//               }else if(message == 'TOO_MANY_ATTEMPTS_TRY_LATER'){
//                 alert("We have blocked all requests from this device due to unusual activity. Try again later.");
//               }else {
//                 alert("Authentication failed, please try again!");
//               }
//               dispatch(uiStopLoading()); 
//             }else if(!parsedRes.idToken){
//                 alert('Authentication failed, please try again!')
//             }else{
//                 dispatch(storeAuthToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken));
//                 dispatch(uiStopLoading()); 
//                 Navigation.setRoot(mainRoot);
//             }
//         })
//         .catch((e) => {
//             console.log(e);
//             alert("Authentication failed, please try again!"); 
//             dispatch(uiStopLoading());            
//         })
//     }
// }

export const signInAuth = (authData) =>{
    // Navigation.setRoot(mainRoot);
    // return {
    //     type: SIGN_IN_AUTH
    // }
    return dispatch => {

        dispatch(uiStartLoading());
        // let app = getRealmApp();
        // Login User
        const credentials = Realm.Credentials.emailPassword("demo@mymail.com", "password");
        
        // fetch("https://stitch.mongodb.com/api/client/v2.0/app/mylystsapps-fvist/auth/providers/local-userpass/login", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8',
        //         'accept' : 'application/json'
        //     },
        //     body: JSON.stringify({
        //         password:"password",
        //         provider:"local-userpass",
        //         username:"demo@mymail.com",
        //         options:{
        //             device:{
        //                 appId:"mylystsapps-fvist",
        //                 platform:"react-native",
        //                 platformVersion:29,
        //                 sdkVersion:"RealmJS/10.0.1"
        //             }
        //         }
        //     })
        // })
        
        realmApp.logIn(credentials)
        .then((parsedRes) =>{
            // assert(parsedRes.id === realmApp.currentUser.id);
            console.log(parsedRes);
            Reactotron.log(parsedRes);

            // for (const key in data) {
            //   let element = data[key];
            //   Reactotron.log(key, element);
            // }

            if(parsedRes.error){
            //   let message = parsedRes.error.message;
            //   if(message == 'EMAIL_NOT_FOUND'){
            //     alert("This email address is not recognized on our system.");
            //   }else if(message == 'INVALID_PASSWORD'){
            //     alert("The password for this account is invalid");
            //   }else if(message == 'USER_DISABLED'){
            //     alert("It appears this account has been disabled. Please contact support for assistance");
            //   }else {
            //     alert("Authentication failed, please try again!");
            //   }
            //   dispatch(uiStopLoading()); 
            // }else if(!parsedRes.idToken){
            //     alert('Authentication failed, please try again!')
            }else{
                // dispatch(storeAuthToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken));
                dispatch(uiStopLoading()); 
                Navigation.setRoot(mainRoot);
            }
        })
        .catch((e) => {
            console.log(e);
            // alert("Authentication failed, please try again!"); 
            // console.error("Failed to log in", JSON.stringify(err,null,2));
            dispatch(uiStopLoading());            
        })
    }
}

// export const setAuthToken = (token,refreshToken, expiryDate) =>{
//     return {
//         type: AUTH_SET_TOKEN,
//         payload: {token, refreshToken, expiryDate}
//     }
// }

// export const getAuthToken = () =>{
//     return (dispatch, getState) => {
//         // let reject = () =>{alert("goo")};
//         const promise = new Promise((resolve, reject) =>{
//             const tokenDetails = getState().auth.tokenDetails;
//             // alert("We are here!");

//             // if 
            
//             if(!tokenDetails.token){
//                 AsyncStorage.multiGet(['awesomeproject:auth:expiresIn', 'awesomeproject:auth:token', 'awesomeproject:auth:refreshToken'])
//                 .catch((e) =>{console.log(e); reject(sendToLogin())})
//                 .then((resp) => {
//                     // console.log(resp);
//                     // alert(resp)
//                     let expTime  = resp[0][1] || null;
//                     let tokenStored  = resp[1][1] || null;
//                     let refreshToken = resp[2][1] || null;
                    

//                     if (expTime !== null && expTime !== undefined) {
//                         let now = new Date();
//                         let expDate = new Date(parseInt(expTime));
//                         // console.log(now);
                        

//                         if (now > expDate) {
//                             if (refreshToken !== null && refreshToken !== undefined) {
//                                 dispatch(refreshAuthToken(refreshToken, resolve, reject))
//                             } else {
//                                reject(sendToLogin()); 
//                             }
//                         }else{
//                             if (tokenStored !== null && tokenStored !== undefined) {
//                                 dispatch(setAuthToken(tokenStored, refreshToken, expTime))
//                                 resolve(tokenStored);
//                             } else {
//                                 reject(sendToLogin());
//                             }
//                         }
//                     }else{
//                         // alert('j')
//                         reject(sendToLogin());
//                     }
//                 })

//                 // let tokenAvailable;
//                 // try {
//                 //     tokenAvailable = AsyncStorage.multiGet(['awesomeproject:auth:expiresIn', 'awesomeproject:auth:token', 'awesomeproject:auth:refreshToken']);
//                 //     // alert(tokenAvailable);
                    
//                 //     let expTime  = tokenAvailable[0][1] || null;
//                 //     let tokenStored  = tokenAvailable[1][1] || null;
//                 //     let refreshToken = tokenAvailable[2][1] || null;
                    

//                 //     if (expTime !== (null || undefined)) {
//                 //         let now = new Date();
//                 //         let expDate = new Date(parseInt(expTime));
//                 //         // console.log(now);
                        

//                 //         if (now > expDate) {
//                 //             reject();
                            
//                 //         }else{
//                 //             if (tokenStored !== (null || undefined)) {
//                 //                 dispatch(setAuthToken(tokenStored))
//                 //                 resolve(tokenStored);
//                 //             } else {
//                 //                 reject();
//                 //             }
//                 //         }
//                 //     }else{
//                 //         reject();
//                 //     }
//                 // } catch(e) {
//                 //     reject();
//                 // }




//                 // AsyncStorage.getItem('awesomeproject:auth:expiresIn')
//                 // .catch((e) => {reject()})
//                 // .then((tokenExpiryTime) =>{
//                 //     if (tokenExpiryTime && (tokenExpiryTime !== null || tokenExpiryTime !== false)) {
//                 //         let now = new Date();
//                 //         let expiryDate = new Date(parseInt(tokenExpiryTime));
//                 //         if (now > expiryDate) {
//                 //             reject();
//                 //         }else{
//                 //             return AsyncStorage.getItem('awesomeproject:auth:token');
//                 //         }
//                 //     }else{
//                 //         reject();
//                 //     }
//                 // })
//                 // .catch((e) =>{reject()})
//                 // .then((tokenFromStorage) =>{
//                 //     if (tokenFromStorage && (tokenFromStorage !== null || tokenFromStorage !== false)) {
//                 //         dispatch(setAuthToken(tokenFromStorage))
//                 //         resolve(tokenFromStorage);
//                 //     }else{
//                 //         reject();
//                 //     }
//                 // })
//             }else{
//                 let expTime  = tokenDetails.expiryDate || null;
//                 let tokenStored  = tokenDetails.token || null;
//                 let refreshToken = tokenDetails.refreshToken || null;

//                 if (expTime !== null && expTime !== undefined) {
//                     let now = new Date();
//                     let expDate = new Date(parseInt(expTime));
//                     // console.log(now);
                    

//                     if (now > expDate) {
//                         if (refreshToken !== null && refreshToken !== undefined) {
//                             dispatch(refreshAuthToken(refreshToken, resolve, reject))
//                         } else {
//                            reject(sendToLogin()); 
//                         }
//                     }else{
//                         if (tokenStored !== null && tokenStored !== undefined) {
//                             dispatch(setAuthToken(tokenStored, refreshToken, expTime))
//                             resolve(tokenStored);
//                         } else {
//                             reject(sendToLogin());
//                         }
//                     }
//                 }else{
//                     // alert('j')
//                     reject(sendToLogin());
//                 }
//                 // resolve(token);
//             }
//         });
//         return promise;
//     }
// }

export const storeAuthToken = (token, expiresIn, refreshToken) =>{
    return (dispatch) =>{

        let now =  new Date();
        let expiryDate =  now.getTime() + (expiresIn * 1000);

        const tokenStore = ["awesomeproject:auth:token", token];
        const refreshTokenStore = ["awesomeproject:auth:refreshToken", refreshToken];
        const timeStore = ["awesomeproject:auth:expiresIn", expiryDate.toString()];

        // console.log(tokenStore);
        

        dispatch(setAuthToken(token, refreshToken, expiryDate));
        AsyncStorage.multiSet([tokenStore, refreshTokenStore, timeStore]);
        // AsyncStorage.setItem('awesomeproject:auth:token', token);
        // AsyncStorage.setItem('awesomeproject:auth:expiresIn', expiryDate.toString());
    }
}


// export const refreshAuthToken = (refreshToken, callback = () =>{}, errorCallback = () =>{}) =>{
//     // Navigation.setRoot(mainRoot);
//     // return {
//     //     type: SIGN_IN_AUTH
//     // }
//     return dispatch => {
//         fetch("https://securetoken.googleapis.com/v1/token?key=" + API_KEY, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: "grant_type=refresh_token&refresh_token=" + refreshToken 
//         })
//         .then(res => res.json())
//         .then((parsedRes) =>{
//             // console.log(parsedRes);
//             if(parsedRes.error){
//               let message = parsedRes.error.message;
//               if(message == 'TOKEN_EXPIRED'){
//                 console.log("The user's credential is no longer valid. The user must sign in again");
//               }else if(message == 'USER_DISABLED'){
//                 console.log("The user account has been disabled by an administrator.");
//               }else {
//                 console.log("Error exchanging refresh token");
//               } 
//               errorCallback(); 
//             }else if(!parsedRes.id_token){
//                 console.log("Error exchanging refresh token");
//                 errorCallback(sendToLogin()); 
//             }else{
//                 dispatch(storeAuthToken(parsedRes.id_token, parsedRes.expires_in, parsedRes.refresh_token));
//                 // dispatch(uiStopLoading()); 
//                 // Navigation.setRoot(mainRoot);

//                 callback(parsedRes.id_token);
//             }
//         })
//         .catch((e) => {
//             console.log(e);  
//             errorCallback(sendToLogin());        
//         })
//     }
// }