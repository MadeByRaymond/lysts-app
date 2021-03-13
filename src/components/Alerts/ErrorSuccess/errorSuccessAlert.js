import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Vibration } from 'react-native'
import Svg, { Path } from "react-native-svg"
import * as Animatable from 'react-native-animatable';
import { Shadow } from 'react-native-neomorph-shadows';
import Sound from 'react-native-sound';

import {dWidth} from '../../../includes/variables'

export default function errorSuccessAlert({title, subtitle, type = ('success' || 'error' || 'warning'), wrapperContainerStyle = null}) {
    const [animationState, setAnimationState] = useState("fadeInUp");
    let exitAlertTimeout = setTimeout(()=>{
        if(animationState == 'fadeInUp'){
            setAnimationState('fadeOutDown')
        }
    }, 4000);

    useEffect(() => {
      if(type == 'success'){
        let alertSound = new Sound('success_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
              // console.log('failed to load the sound', error);
              return;
          }
          // loaded successfully

          // Stop the sound and rewind to the beginning
          alertSound.stop(() => {
              // Note: If you want to play a sound after stopping and rewinding it,
              // it is important to call play() in a callback.
              
              // Play the sound with an onEnd callback
              alertSound.play((success) => {
                  if (success) {
                      // console.log('successfully finished playing');
                  } else {
                      // console.log('playback failed due to audio decoding errors');
                  }
                  alertSound.release();
              });

              
          });
        })
      }else{
        Vibration.vibrate(300);
      }

      return () => {
          clearTimeout(exitAlertTimeout);
      }
    }, []);

    let SVGIcon;
    let primaryColor;
    switch (type) {
        case 'success':
            primaryColor = '#28A664';
            SVGIcon = (<Svg
                width={28}
                height={28}
                viewBox="0 0 59 59"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M47.938 59H11.062C4.952 59 0 54.048 0 47.937V11.063C0 4.952 4.952 0 11.063 0h36.874C54.047 0 59 4.952 59 11.063v36.874C59 54.047 54.048 59 47.937 59z"
                  fill="#fff"
                  fillOpacity={0.96}
                />
                <Path
                  d="M25.869 40.727a1.58 1.58 0 01-2.237 0l-8.94-8.94a2.374 2.374 0 010-3.358l1.118-1.119a2.372 2.372 0 013.358 0l5.58 5.58 15.08-15.079a2.372 2.372 0 013.357 0l1.118 1.12a2.37 2.37 0 010 3.357L25.87 40.728z"
                  fill="#28A664"
                />
              </Svg>);
            break;
    
        case 'error':
            primaryColor = '#EC4343';
            SVGIcon = (<Svg
                width={28}
                height={28}
                viewBox="0 0 59 59"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <Path
                    d="M47.938 59H11.062C4.952 59 0 54.048 0 47.937V11.063C0 4.952 4.952 0 11.063 0h36.874C54.047 0 59 4.952 59 11.063v36.874C59 54.047 54.048 59 47.937 59z"
                    fill="#FFE6E2"
                />
                <Path
                    d="M44.204 39.091L19.91 14.796a2.71 2.71 0 00-3.836 0l-1.277 1.277a2.71 2.71 0 000 3.836L39.09 44.204a2.71 2.71 0 003.836 0l1.277-1.277a2.71 2.71 0 000-3.836z"
                    fill="#FC573B"
                />
                <Path
                    d="M39.091 14.796L14.796 39.09a2.71 2.71 0 000 3.836l1.277 1.277a2.71 2.71 0 003.836 0L44.204 19.91a2.71 2.71 0 000-3.836l-1.277-1.277a2.71 2.71 0 00-3.836 0z"
                    fill="#FC573B"
                />
                </Svg>);
            break;

        case 'warning':
            primaryColor = '#d49d0d';
            SVGIcon = (<Svg
                width={28}
                height={28}
                viewBox="0 0 59 59"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M47.938 59H11.062C4.952 59 0 54.048 0 47.937V11.063C0 4.952 4.952 0 11.063 0h36.874C54.047 0 59 4.952 59 11.063v36.874C59 54.047 54.048 59 47.937 59z"
                  fill="#fff"
                />
                <Path
                  d="M45 28.5C45 37.06 38.06 47 29.5 47 20.94 47 14 37.06 14 28.5S20.94 13 29.5 13C38.06 13 45 19.94 45 28.5z"
                  fill="#F6C23A"
                />
                <Path
                  d="M29 4C15.216 4 4 15.216 4 29s11.216 25 25 25 25-11.216 25-25S42.784 4 29 4zm0 9.416a3.084 3.084 0 110 6.168 3.084 3.084 0 010-6.168zm5.688 31.168H24.312C23.163 44.584 21 43.641 21 42c0-1.64 2.16-2.584 3.313-2.584h2.603v-11.5h-1.563c-1.15 0-2.005-1.172-2.084-2.416-.086-1.345.934-2.75 2.084-2.75H30c1.15 0 2.084.934 2.084 2.084V39.42h2.603C35.837 39.419 37 40.647 37 42c0 1.354-1.163 2.584-2.313 2.584z"
                  fill="#fff"
                />
              </Svg>);
            break;
        
        default:
            primaryColor = '#272C2F'
            SVGIcon = null;
            break;
    }
    return (
        <Animatable.View animation={animationState} duration={500} useNativeDriver={true} style={[styles.wrapper, wrapperContainerStyle]}>
          <Shadow
            useArt
            style={[styles.alertShadow, {shadowColor: primaryColor}]}
          >
            <View style={[styles.background, {backgroundColor: primaryColor}]}>
              <View>
                <View><Text style={styles.title}>{title}</Text></View>
                {(typeof subtitle == 'string' && subtitle.trim() !== '') ? <View><Text style={styles.subtitle}>{subtitle}</Text></View> : null}
              </View>
              <View>
                {SVGIcon}
              </View>
            </View>
          </Shadow>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
  wrapper:{
    position: 'absolute',
    zIndex: 9999999999,
    width: dWidth,
    // bottom: 29,
    // right: 37,
    bottom: 15,
    // top: (dHeight - 55 - 15),
    flexDirection: 'row',
    justifyContent: 'center'
  },
  alertShadow:{
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.75,
    shadowColor: "#272C2F",
    shadowRadius: 8,
    borderRadius: 4,
    backgroundColor: 'transparent',
    width: dWidth -25,
    height:55,
    overflow: 'hidden'
  },
  background:{
    backgroundColor: '#272C2F',
    height:55,
    width: dWidth - 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft:15,
    paddingRight: 15
  },
  title:{
    color: '#FAF0F2',
    fontSize: 15.5,
    fontFamily:'Poppins-Medium',
    letterSpacing: 0.3
  },
  subtitle:{
    color: '#FAF0F2',
    fontSize: 12,
    fontFamily:'Poppins-Regular',
    letterSpacing: 0.3,
    marginTop: 0
  }
})
