import { Platform } from "react-native";
import PushNotification from "react-native-push-notification";

export const configurePushNotification = () => {
  PushNotification.configure({
    onRegister: function(token){
        /* console.log('TOKEN ==> ', token); */
    },
    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        /* console.log('LOCAL NOTIFICATION ==>', notification) */
    },

    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios'
});
}

export const createChannel = (sound = 'default_notification_sound_long_expected_548.mp3') =>{
  PushNotification.channelExists('lysts-app-channel', function (exists) {
    /* console.log(`Channel exists ==> '${exists}'`); // true/false  */
    if(!exists){
      PushNotification.createChannel(
        {
            channelId: 'lysts-app-channel', // (required)
            channelName: "Lysts Notifications", // (required)
            channelDescription: "A channel to categorize your Lysts App notifications", // (optional) default: undefined.
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            soundName: sound,
            vibrate:true
        },
        (created) => {/*console.log(`createChannel returned '${created}'`)  */} // (optional) callback returns whether the channel was created, false means it already existed.
      );
    }
  });
}

export const recreateChannel = (sound = 'default_notification_sound_long_expected_548.mp3') =>{
  PushNotification.getChannels(function (channel_ids) {
    /*console.log('Here is a list of Channels ==> ', channel_ids); // ['channel_id_1']  */
  });
  PushNotification.channelExists('lysts-app-channel', function (exists) {
    /*console.log(`Channel exists ==> '${exists}'`); // true/false  */
    if(exists){
      PushNotification.deleteChannel('lysts-app-channel');
      /*console.log('Channel Deleted'); */
    }

    /*console.log('Creating Channel with sound: ', sound); */

    PushNotification.createChannel(
      {
          channelId: 'lysts-app-channel', // (required)
          channelName: "Lysts Notifications", // (required)
          channelDescription: "A channel to categorize your Lysts App notifications", // (optional) default: undefined.
          importance: 4, // (optional) default: 4. Int value of the Android notification importance
          soundName: sound,
          vibrate:true
      },
      (created) => {/*console.log(`createChannel returned '${created}'`) */} // (optional) callback returns whether the channel was created, false means it already existed.
    );
  });
}

export const LocalNotification = () => {
    // console.log('sendig notify');
    PushNotification.localNotification({
      channelId: 'lysts-app-channel',
      autoCancel: true,
      bigText: 'When you get a notification on your Lysts App, it looks something like this 🎁.',
      subText: "8 messages from 3 chats",
      title: 'Lysts',
      message: 'When you get a notification on your Lysts App...',
      smallIcon: "ic_launcher_transparent",
      // color: "blue",
      showWhen: true,
      when: new Date(),
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'default_notification_sound_long_expected_548.mp3',
      actions: ["Cancel"],
    })
  }