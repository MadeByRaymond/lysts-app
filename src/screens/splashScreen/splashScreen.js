import React, {useEffect} from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import LottieView from 'lottie-react-native'
import {Navigation} from 'react-native-navigation';
import {View as AnimatableView} from 'react-native-animatable'
import RNBootSplash from "react-native-bootsplash";

import {getRoot} from '../../../App';

import CreditsSVG from '../../SVG_Files/UI_SVG/Credits/credits';
import {dWidth, dHeight} from '../../includes/variables'

let loaderSource = require('../../lotti_animations/42790-logo-animation.json');

export default function SplashScreen() {

    useEffect(() => {
        RNBootSplash.hide({fade: true});
    }, [])

    return (
        
        <ImageBackground source={{uri: 'splash_bg'}} style={styles.bgImage} resizeMethod='resize' resizeMode='cover'>
            <View style={styles.container}>
                <LottieView 
                    style={styles.lottieView}
                    source={loaderSource} 
                    autoPlay = {true}
                    loop={false}
                    autoSize= {true}
                    speed={1}
                    onAnimationFinish={()=>{
                        getRoot().then(root => {
                            Navigation.setRoot(root)
                        })
                    }}
                />
                
                <View style={styles.credits}>
                    <AnimatableView  animation="fadeInUp" easing='ease-in-out' duration={1500} iterationDelay={0} iterationCount={1} useNativeDriver={true}>
                        <CreditsSVG width={111} height={48} />
                    </AnimatableView>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: '#fff'
    },
    bgImage: {
      flex: 1,
      width: dWidth,
      height: dHeight,
      resizeMode: "cover",
      justifyContent: "center",
      backgroundColor: '#fff'
    },
    lottieView:{
        width: '100%', 
        height: 100, 
        marginTop: 0, 
        alignSelf: 'center',
        backgroundColor:'transparent'
    },
    credits:{
        alignItems:'center',
        position: 'absolute',
        bottom: 30,
        height:48,
        left: '50%',
        transform: [{
            translateX: -(111/2)
        }]
    }
})
