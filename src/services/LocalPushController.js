import { Platform } from "react-native";
import PushNotification from "react-native-push-notification";

PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log('LOCAL NOTIFICATION ==>', notification)
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios'
});

export const LocalNotification = () => {
    PushNotification.localNotification({
      autoCancel: true,
      bigText: 'When you get a notification on your Lysts App, it looks something like this 🎁.',
      subText: 'Lysts App',
      title: 'Push Notification',
      message: 'When you get a notification on your Lysts App...',
      color: "pink",
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'default',
      actions: '["Cancel"]'
    })
  }