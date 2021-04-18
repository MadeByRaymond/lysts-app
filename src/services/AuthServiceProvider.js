import Realm from 'realm';
import {Navigation} from 'react-native-navigation';
import {ObjectId} from 'bson';

import {app as realmApp} from '../../storage/realm';
import {getGoogleAuthCode, logoutOfGoogle} from './GoogleAuthService';
import {getFacebookAccessToken, logoutOfFacebook} from './FacebookAuthService';

import {mongoClientCluster} from '../includes/variables/db_api_variables';
import {avatarCustomizer} from '../includes/datasets';

import {loginRoot,mainRoot} from '../../App';

export const signInAuth = async (type, redirectAfterLogin = true, callbackFunc = (response) => {}, errorCallbackFunc = (err) =>{}) =>{
    try { 
        let credentials;
        if(type == 'google'){
            credentials = Realm.Credentials.google(await getGoogleAuthCode())
        }else if(type == 'facebook'){
            credentials = Realm.Credentials.facebook(await getFacebookAccessToken())
        }else if(type == 'demo'){
            credentials = Realm.Credentials.emailPassword("demo@mymail.com", "password");
        }else{
            credentials = Realm.Credentials.anonymous();
        }

        // realmApp.currentUser.mongoClient('')

        let user = await realmApp.logIn(credentials);

        if (redirectAfterLogin) {
            let userCollection =  await user.mongoClient(mongoClientCluster).db("lysts").collection("users");
            let userData = await userCollection.find({ userID: `${user.id}` });
            // console.log('length is ==> ', userData.length);
            if(userData.length < 1){    
                const newUserData = {
                    "_id": new ObjectId(),
                    "_partition":"public",
                    "userID": `${user.id}`,
                    "fullName": `${user.profile.firstName ? user.profile.firstName : ''} ${user.profile.lastName ? user.profile.lastName : user.profile.lastName}`.trim(),
                    "displayName": `${user.profile.name ? user.profile.name : ''}`.trim(),
                    "avatarFeatures": {
                        "accessory" : `${avatarCustomizer.accessory[0]}`,
                        "bgColor" : `${avatarCustomizer.bgColor[0]}`,
                        "bgShape" : `${avatarCustomizer.bgShape[0]}`,
                        "body" : `${avatarCustomizer.body[0]}`,
                        "clothing" : 'shirt',
                        "clothingColor" : `${avatarCustomizer.clothingColor[0]}`,
                        "eyebrows" : `${avatarCustomizer.eyebrows[0]}`,
                        "eyes" : `${avatarCustomizer.eyes[0]}`,
                        "facialHair" : 'none',
                        "graphic" : 'none',
                        "hair" : 'none',
                        "hairColor" : `${avatarCustomizer.hairColor[0]}`,
                        "hat" : 'none',
                        "hatColor" : `${avatarCustomizer.hatColor[0]}`,
                        "lashes" : false,
                        "lipColor" : 'red',
                        "mouth" : `${avatarCustomizer.mouth[0]}`,
                        "showBackground" : true,
                        "skinTone" : `${avatarCustomizer.skinTone[0]}`,
                    },
                    "contactEmail": `${user.profile.email ? user.profile.email : ''}`.trim(),
                    "contactPhone":"",
                    "savedLists":[],
                    "settings":{
                        "notification":{
                            "systemNotifications":true,
                            "appUpdates":true
                        }
                    },
                    "status": "active",
                    "lastModified": new Date(),
                    "lastModifiedLog": `User Created`,
                    "dateCreated": new Date()
                }
                  
                await userCollection.insertOne(newUserData);
            }
    
            // user = await realmApp.logIn(credentials);
    
            await user.refreshCustomData();
        }
        
        // console.log("Successfully logged in!", user);
        callbackFunc(user);

        redirectAfterLogin ? Navigation.setRoot(mainRoot) : null;     
    } catch (error) {
        // console.log("Failed to log in", error.ignore);
        await logoutOfGoogle();
        await logoutOfFacebook();
        errorCallbackFunc(error, error.ignore ? error.ignore : false);
    }
}


export const signOutAuth = async () =>{
    try {
        await realmApp.currentUser.logOut();

        if(__DEV__){console.log("Session Terminated")}
        await logoutOfGoogle();
        await logoutOfFacebook();
        global.lastOpenedDate = '';
        Navigation.setRoot(loginRoot);
    } catch (error) {
        // console.log(error);
        throw error
    }
}