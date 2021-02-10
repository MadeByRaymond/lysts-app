import { Platform } from "react-native";
import PushNotification from "react-native-push-notification";

export const configurePushNotification = () => {
  PushNotification.configure({
    onRegister: function(token){
        console.log('TOKEN ==> ', token);
    },
    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log('LOCAL NOTIFICATION ==>', notification)
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



    // let channel 
    //   PushNotification.getChannels(function (channel_ids) {
    //       console.log(channel_ids); // ['channel_id_1']
    //       channel = channel_ids
    //       console.log('channel',channel_ids)
    //   });
    //   PushNotification.channelExists(channel, function (exists) {
          
    //       console.log(exists); // true/false

          
    //   });

      
    //    PushNotification.localNotification({
    //       channelId: _.toString(channel),
    //       title: "My Notification Title", // (optional)
    //       message: "My Notification Message", // (required)

    //   });

    // PushNotification.createChannel(
    //     {
    //         channelId: 'lysts-app-channel', // (required)
    //         channelName: "Lysts Demo Channel2", // (required)
    //         channelDescription: "A channel to categorize your notifications", // (optional) default: undefined.
    //         importance: 4, // (optional) default: 4. Int value of the Android notification importance
    //         soundName: 'notification_sound.mp3',
    //         vibrate:true
    //     },
    //     (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    // );

    // PushNotification.getApplicationIconBadgeNumber(function (number) {
    //     if (number > 0) {
    //       PushNotification.setApplicationIconBadgeNumber(0);
    //     }
    //   })

    // PushNotification.getChannels(function(channels) {
    //     console.log(channels);
    //   });

    // PushNotification.channelExists('lysts-app-channel', function (exists) {
    //   console.log(`Channel exists ==> '${exists}'`); // true/false
    // });

export const createChannel = (sound = 'default_notification_sound_long_expected_548.mp3') =>{
  PushNotification.channelExists('lysts-app-channel', function (exists) {
    console.log(`Channel exists ==> '${exists}'`); // true/false
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
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      );
    }
  });
}

export const recreateChannel = (sound = 'default_notification_sound_long_expected_548.mp3') =>{
  PushNotification.getChannels(function (channel_ids) {
    console.log('Here is a list of Channels ==> ', channel_ids); // ['channel_id_1']
  });
  PushNotification.channelExists('lysts-app-channel', function (exists) {
    console.log(`Channel exists ==> '${exists}'`); // true/false
    if(exists){
      PushNotification.deleteChannel('lysts-app-channel');
      console.log('Channel Deleted');
    }

    console.log('Creating Channel with sound: ', sound);

    PushNotification.createChannel(
      {
          channelId: 'lysts-app-channel', // (required)
          channelName: "Lysts Notifications", // (required)
          channelDescription: "A channel to categorize your Lysts App notifications", // (optional) default: undefined.
          importance: 4, // (optional) default: 4. Int value of the Android notification importance
          soundName: sound,
          vibrate:true
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
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