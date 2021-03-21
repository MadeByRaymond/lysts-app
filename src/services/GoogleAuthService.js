import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

import {googleAuthWebClient} from '../includes/variables';

// You must configure `webClientId` and `offlineAccess` to get the auth code
GoogleSignin.configure({
  webClientId: googleAuthWebClient,
  offlineAccess: true
});

// Handle the Google Sign In flow and return the auth code
async function getGoogleAuthCode() {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    let {serverAuthCode, idToken} = await GoogleSignin.signIn();
    return serverAuthCode
  } catch (error) {
    // console.log('goo==>', error);
    let whatToThrow = {ignore: false}
    switch(error.code) {
      case statusCodes.SIGN_IN_CANCELLED:
        // user cancelled the login flow
        // console.log('User cancelled the login flow');
        whatToThrow = {message: 'User cancelled the login flow', ignore: true}
        break;
      case statusCodes.IN_PROGRESS:
        // operation (e.g. sign in) is in progress already
        // console.log('Operation (e.g. sign in) is in progress already');
        whatToThrow = {message: 'Operation (e.g. sign in) is in progress already', ignore: true}
        break;
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        // play services not available or outdated
        // console.log('Google play services not available or outdated');
        whatToThrow = {message: 'Google play services not available or outdated', ignore: false}
        break;
      default: 
        // some other error happened
        whatToThrow = {ignore: false}
    }
    throw whatToThrow;
  }
}

async function logoutOfGoogle(){
  try {
    let isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      await GoogleSignin.signOut();
    }
  } catch (error) {
    
  }
}

export {getGoogleAuthCode, logoutOfGoogle};