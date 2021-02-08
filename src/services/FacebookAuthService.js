import { LoginButton, AccessToken, LoginManager } from "react-native-fbsdk";
// const Login = ({ app }) => {
//   return (
//     <View>
//       <LoginButton
//         onLoginFinished={async (error, result) => {
//           if (error) {
//             console.error(`Failed to log in: ${result.error}`);
//           } else if (result.isCancelled) {
//             console.log("Facebook login was cancelled");
//           } else {
//             const { accessToken } = await AccessToken.getCurrentAccessToken();
//             const credential = Realm.Credentials.facebook(accessToken);
//             const user = await app.logIn(credential);
//             console.log(`Logged in with id: ${user.id}`);
//           }
//         }}
//       />
//     </View>
//   );
// };
// export default Login;



export const getFacebookAccessToken = ()=>{
    LoginManager.logInWithPermissions(["public_profile"]).then(
        (result) => {
          if (result.isCancelled) {
            console.log("Login cancelled");
          } else {
            console.log(
              "Login success with permissions: " +
                result.grantedPermissions.toString()
            );
          }
        },
        (error) => {
          console.log("Login fail with error: " + error);
        }
      );
}