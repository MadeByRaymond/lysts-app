import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Svg, { Rect, Path } from "react-native-svg"
import * as Animatable from 'react-native-animatable';
import { Shadow } from 'react-native-neomorph-shadows';

import {dWidth} from '../../../includes/variables'

export default function noConnectionAlert(props) {
    return (
        <Animatable.View animation="fadeInUp" duration={500} useNativeDriver={true} style={styles.wrapper}>
          <Shadow
            useArt
            style={styles.alertShadow}
          >
            <View style={styles.background}>
              <View><Text style={styles.text}>No Internet Connection</Text></View>
              <View>
                <Svg
                    width={(28*70)/60}
                    height={28}
                    viewBox="0 0 70 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    {...props}
                  >
                    <Path
                      d="M51.206 39.468L70 16.135c-1.36-1.018-14.824-12.06-35-12.06-6.252 0-11.833 1.069-16.63 2.56l32.835 32.833zM0 16.135l35 43.448 12.397-15.39-35.25-35.25C5.078 12.043.738 15.58 0 16.135z"
                      fill="#FAD8A0"
                    />
                    <Path
                      d="M56.724 54.728c-.309 0-.618-.119-.853-.354L3.974 2.477a1.205 1.205 0 010-1.706 1.205 1.205 0 011.707 0l51.896 51.896a1.205 1.205 0 01-.853 2.06z"
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
    zIndex: 99999999,
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
