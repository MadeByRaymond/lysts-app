import { LoginButton, AccessToken, LoginManager } from "react-native-fbsdk";

export const getFacebookAccessToken = async()=>{
    try {
      let result = await LoginManager.logInWithPermissions(["public_profile"]);
      // console.log('Result => ', result);
      if (result.isCancelled) {
        // console.log("Login cancelled");
        throw {message: 'User cancelled the login flow', ignore: true}
      } else {
        // console.log("Login success with permissions: " +  result.grantedPermissions.toString());
        const { accessToken } = await AccessToken.getCurrentAccessToken();
        return accessToken
      }
    } catch (error) {
      throw error;
    }
}

export const logoutOfFacebook = () => {
    LoginManager.logOut();
}