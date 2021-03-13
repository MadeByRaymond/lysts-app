import React, {useState,useEffect}from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import {Text as AnimatableText} from 'react-native-animatable';


let loaderSource = require('../../lotti_animations/44065-loader.json');
let attentionSeekerTimeout;

const AnimatableTextTemplate = ({text, animation = 'flipInY', duration = 1000, iterationCount=1, easing = 'ease-out'}) =>{
    return (
        <AnimatableText 
          style={styles.loaderCaption} 
          animation={animation} 
          duration={duration} 
          iterationCount={iterationCount}
          easing={easing} 
        >
            {text}
        </AnimatableText>
    )
}

export default function loader({lottieViewStyle = null}) {
    const [attentionSeeker, setAttentionSeeker] = useState(<AnimatableTextTemplate text={''} animation="flash" />);
    const [setTimeoutTracker, setSetTimeoutTracker] = useState(0);

    useEffect(() => {
        // returned function will be called on component unmount 
        return () => {
            clearTimeout(attentionSeekerTimeout)
        }
    }, [])
    
    attentionSeekerTimeout = setTimeout(() => {
        switch (setTimeoutTracker) {
            case 0:
                setAttentionSeeker(<AnimatableTextTemplate text={'Wow!😅 This is embarrassing '} />)
                setSetTimeoutTracker(1)
                // clearTimeout(attentionSeekerTimeout)
                break;
            case 1:
                setAttentionSeeker(<AnimatableTextTemplate text={'We\'re almost done 😁'} animation='pulse' />)
                setSetTimeoutTracker(2)
                // clearTimeout(attentionSeekerTimeout)
                break;
            case 2:
                setAttentionSeeker(<AnimatableTextTemplate text={'Okay! There may be a problem.\nTry reloading your app'} />)
                setSetTimeoutTracker(3)
                break;
            default:
                break;
        }
    }, 10000);

    
    return (
        <View>
            <LottieView 
                style={[styles.lottieView, lottieViewStyle]}
                source={loaderSource} 
                autoPlay 
                loop={true}
                autoSize= {true}
                speed={1}
            />
            <View style={styles.loaderCaptionWrapper}>
                {attentionSeeker}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    lottieView:{
        width: '100%', 
        height: 250, 
        marginTop: 0, 
        alignSelf: 'center',
        backgroundColor:'transparent'
    },
    loaderCaptionWrapper:{
        width: '100%',
        marginVertical: 0
    },
    loaderCaption:{
        textAlign: 'center',
        marginTop: -25,
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: '#515D70'
    }

})
