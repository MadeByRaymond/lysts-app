/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

let PushNotification = require('./src/services/LocalPushController')
PushNotification.configurePushNotification();
PushNotification.createChannel();

require('./App');

// STEPS 
/*
1. Save settings in async storage
2. On load(After Login), check if logout after x time(settings) is not infinite
3. If not infinite, check last logged in is greater than logout after x value
4. if greater, show modal saying session expired. action button logs user out
*/