import React, {useEffect} from 'react'
import { StyleSheet, Text, View, Vibration } from 'react-native'
import Svg, { Path } from "react-native-svg"
import * as Animatable from 'react-native-animatable';
import { Shadow } from 'react-native-neomorph-shadows';

import {dWidth} from '../../../includes/variables';

export default function noConnectionAlert(props) {
    useEffect(() => {
      Vibration.vibrate(300);
    }, []);
    return (
        <Animatable.View animation="fadeInUp" duration={500} useNativeDriver={true} style={[styles.wrapper, props.wrapperContainerStyle ? props.wrapperContainerStyle : null]}>
          <Shadow
            useArt
            style={styles.alertShadow}
          >
            <View style={styles.background}>
              <View><Text style={styles.text}>No Network Connection</Text></View>
              <View>
                <Svg
                  width={28}
                  height={28}
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  // {...props}
                >
                  <Path
                    d="M43.146 27.119c-8.835 0-16.024 7.189-16.024 16.024 0 8.834 7.185 16.027 16.024 16.027 8.839 0 16.024-7.189 16.024-16.024 0-8.834-7.19-16.027-16.024-16.027zm0 3.698c2.733 0 5.233.924 7.282 2.433L33.254 50.424c-1.51-2.045-2.434-4.548-2.434-7.278-.003-6.797 5.529-12.33 12.326-12.33zm0 24.655c-2.733 0-5.233-.924-7.282-2.433L53.04 35.865c1.512 2.045 2.433 4.548 2.433 7.281 0 6.797-5.529 12.326-12.326 12.326z"
                    fill="#FAD8A0"
                  />
                  <Path
                    d="M2.467 59.17A2.464 2.464 0 010 56.703v-17.26a2.466 2.466 0 014.933.004v17.26a2.468 2.468 0 01-2.466 2.463zM17.259 59.17a2.464 2.464 0 01-2.467-2.466V29.585a2.468 2.468 0 012.467-2.466 2.468 2.468 0 012.466 2.466v27.119a2.469 2.469 0 01-2.466 2.466zM34.515 14.793v9.271a20 20 0 00-4.93 3.106V14.793a2.473 2.473 0 012.467-2.467 2.47 2.47 0 012.463 2.467zM49.307 2.467v20.635a21.76 21.76 0 00-4.93-.887V2.467A2.473 2.473 0 0146.844 0a2.472 2.472 0 012.463 2.467z"
                    fill="#fff"
                  />
                </Svg>
              </View>
            </View>
          </Shadow>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
  wrapper:{
    position: 'absolute',
    zIndex: 999999999,
    width: dWidth,
    // bottom: 29,
    // right: 37,
    bottom: 15,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  alertShadow:{
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.75,
    shadowColor: "#C06A46",
    shadowRadius: 8,
    borderRadius: 4,
    backgroundColor: 'transparent',
    width: dWidth -25,
    height:55,
    overflow: 'hidden'
  },
  background:{
    backgroundColor: '#D35331',
    height:55,
    width: dWidth - 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft:15,
    paddingRight: 15
  },
  text:{
    color: '#FAF0F2',
    fontSize: 15.5,
    fontFamily:'Poppins-Medium',
    letterSpacing: 0.3
  }
})
