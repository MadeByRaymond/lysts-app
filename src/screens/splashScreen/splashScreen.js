import React from 'react'
import { StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native'
import {Navigation} from 'react-native-navigation';
import {View as AnimatableView} from 'react-native-animatable'

import {getRoot} from '../../../App';

import CreditsSVG from '../../SVG_Files/UI_SVG/Credits/credits'

let loaderSource = require('../../lotti_animations/42790-crowdify-logo-animation.json');

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <LottieView 
                style={styles.lottieView}
                source={loaderSource} 
                autoPlay = {true}
                loop={false}
                autoSize= {true}
                speed={1}
                onAnimationFinish={()=>{
                    // alert('pie');
                    // console.log('pie')
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
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    lottieView:{
        width: '100%', 
        height: 250, 
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
