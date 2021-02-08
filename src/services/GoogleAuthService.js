// import React from "react";
// import { View } from "react-native";
// import Realm from "realm";
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

// You must configure `webClientId` and `offlineAccess` to get the auth code
GoogleSignin.configure({
  webClientId: '331733897046-h9smcg530r1bfhbt58ts53qf293bn8r6.apps.googleusercontent.com',
  offlineAccess: true,
});

// Handle the Google Sign In flow and return the auth code
async function getGoogleAuthCode() {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    console.log('here2');
    const { serverAuthCode } = await GoogleSignin.signIn();
    console.log('here3');
    return serverAuthCode
  } catch (error) {
    switch(error.code) {
      case statusCodes.SIGN_IN_CANCELLED: {
        // user cancelled the login flow
        console.log('User cancelled the login flow');
      }
      case statusCodes.IN_PROGRESS: {
        // operation (e.g. sign in) is in progress already
        console.log('Operation (e.g. sign in) is in progress already');
      }
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE: {
        // play services not available or outdated
        console.log('Google play services not available or outdated');
      }
      default: {
        // some other error happened
      }
    }
  }
}

// const Login = ({ app }) => {
//   return (
//     <View>
//       <GoogleSigninButton
//         size={GoogleSigninButton.Size.Standard}
//         color={GoogleSigninButton.Color.Auto}
//         onPress={async () => {
//           const serverAuthCode = await getGoogleAuthCode();
//           const credential = Realm.Credentials.google(serverAuthCode);
//           const user = await app.logIn(credential);
//           console.log(`Logged in with id: ${user.id}`);
//         }}
//       />
//     </View>
//   );
// };
export {getGoogleAuthCode};