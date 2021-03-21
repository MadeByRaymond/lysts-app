
import { Dimensions, Platform, TouchableNativeFeedback, TouchableOpacity, TouchableHighlight } from 'react-native';



export const dHeight = Dimensions.get('window').height;
export const dWidth = Dimensions.get('window').width;
export const sHeight = Dimensions.get('screen').height;
export const sWidth = Dimensions.get('screen').width;
export const Touchable = Platform.OS == 'android' ? TouchableNativeFeedback : TouchableOpacity;
export const TouchableIOSHighlight = Platform.OS == 'android' ? TouchableNativeFeedback : TouchableHighlight;


export const defaultNotificationSound = 'default_notification_sound_long_expected_548.mp3';
export const defaultNotificationChannel = 'lysts-app-channel';
