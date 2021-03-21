import { View, Text, StyleSheet, Animated } from 'react-native';
import React, { Component } from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import Svg, { Path } from "react-native-svg";
import LottieView from 'lottie-react-native';
import {Navigation} from 'react-native-navigation';

import {dWidth, Touchable} from '../../includes/variables';

import {loginRoot} from '../../../App';


// let prevComponentId;

export default class App extends Component {
  onBoardingRef = React.createRef();

  state={
    pageIndex: 0,
    paginationLayout:{
        height:124,
        width: 0
    },
    buttonWidthValue : new Animated.Value(65),
    buttonContentArrow: true,
    changeButtonWidth: false,
  }

// componentDidMount(){
//     prevComponentId = global.activeComponentId;
//     global.activeComponentId = this.props.componentId;
// }

// componentWillUnmount() {
//     global.activeComponentId = prevComponentId;
// }

  
toggleAnimation=(isLastPage)=>{
 
    if(isLastPage == true){
        Animated.timing(this.state.buttonWidthValue, {
            toValue : 180,
            duration : 400,
            useNativeDriver: false
        }).start(({finished}) => this.setState({buttonContentArrow: false, changeButtonWidth: false}));
    }
    else{
      Animated.timing(this.state.buttonWidthValue, {
        toValue : 65,
        duration : 400,
        useNativeDriver: false
      }).start(this.setState({buttonContentArrow: true, changeButtonWidth: false}));
    }
  }

  onNextPressed = (isLastPage = false)=>{
    if(isLastPage){
        Navigation.setRoot(loginRoot);
    }else{
        this.onBoardingRef.current.goNext();
    }
  }

  render() {
    const pages = [
        {
            backgroundColor: '#FFFFFF',
            image: (<LottieView 
                style={{maxWidth: '150%', height: '90%', marginTop: 0}}
                source={require('../../lotti_animations/onboarding/drawkit-grape-animation-5-LOOP.json')} 
                autoPlay 
                loop={true}
                autoSize= {true}
                speed={1}
            />),
            title: 'Create a Wishlist',
            subtitle: 'Create wishlists for your parties, events and celebrations.',
        },
        {
            backgroundColor: '#F4F8FE',
            image: (<LottieView 
                style={{maxWidth: '150%', height: '90%', marginTop: 0}}
                source={require('../../lotti_animations/onboarding/drawkit-grape-animation-6-LOOP.json')} 
                autoPlay 
                loop={true}
                autoSize= {true}
                speed={1}
            />),
            title: 'Share with Friends',
            subtitle: 'Share your wishlist code and links with friends, family or Santa?',
        },
        {
            backgroundColor: '#FEFFD2',
            image: (<LottieView 
                style={{maxWidth: '150%', height: '90%', marginTop: 40}}
                source={require('../../lotti_animations/onboarding/drawkit-grape-animation-8-LOOP.json')} 
                autoPlay 
                loop={true}
                autoSize= {true}
                speed={1}
            />),
            title: 'Check off Lyst Items',
            subtitle: "Let your friends know you have an item when you check it off.",
        },
    ];

    let isLastPage = (this.state.pageIndex == (pages.length-1)) ? true : false;

    this.state.changeButtonWidth ? this.toggleAnimation(isLastPage) : null;

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Onboarding
                    containerStyles={[styles.onBoardingContainer, {paddingBottom: this.state.paginationLayout.height}]}
                    imageContainerStyles={styles.onBoardingImageContainer}
                    titleStyles={styles.onBoardingTitle}
                    subTitleStyles ={styles.onBoardingSubTitle}
                    ref={this.onBoardingRef}

                    showPagination={false}
                    pageIndexCallback={(index) => {this.setState({pageIndex: index, changeButtonWidth: true})}}
                    allowFontScalingButtons={false}
                    allowFontScalingText={false}

                    pages={pages}
                />
            </View>
            <View style={styles.paginationWrapper} onLayout={(e) => {
                // console.log("height: ",e.nativeEvent.layout.height);
                this.setState({
                    paginationLayout:{
                        height:e.nativeEvent.layout.height,
                        width: e.nativeEvent.layout.width
                    }
                })
            }}>
                <View style={styles.dotWrapper}>
                    {pages.map((item, i)=>(<View key={i} style={[styles.dot, this.state.pageIndex == i ? styles.dotActive : null]}></View>))}
                </View>
                <View style={styles.nextButtonWrapper}>
                    <Touchable useForeground={true} activeOpacity={0.8} onPress={() => this.onNextPressed(isLastPage)} >
                        <Animated.View style={[styles.nextButton, {width: this.state.buttonWidthValue}]}>
                            {this.state.buttonContentArrow ? (
                                <Svg
                                    width={30}
                                    height={(30*57)/98}
                                    viewBox="0 0 98 57"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={styles.nextSVG}
                                >
                                    <Path
                                        d="M69.5 3.5L95 28.586 69.5 53.5M3 28.489h90.637"
                                        stroke="#fff"
                                        strokeWidth={6}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </Svg>
                            ) : (<Text style={styles.nextButtonText}>Get Started</Text>)}
                            
                        </Animated.View>
                    </Touchable>
                </View>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    onBoardingContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 20,
        // backgroundColor : 'red'
    },
    onBoardingImageContainer: {
        flex: 1, 
        // backgroundColor:"pink",
        justifyContent: 'flex-end',
        paddingBottom: 0
    },
    onBoardingTitle: {
        textAlign: 'left',
        color: '#515D70',
        fontFamily:'Poppins-Bold',
        fontSize: 40,
        paddingBottom: 10,
        width: (dWidth * 55)/100,
        marginHorizontal: 25,
        lineHeight: 45,
    },
    onBoardingSubTitle: {
        textAlign: 'left',
        color: '#515D70',
        fontFamily:'Poppins-SemiBold',
        fontSize: 16,
        paddingBottom: 0,
        marginLeft: 25,
        marginRight: 20,
        width: (dWidth * 66)/100,
    },


    paginationWrapper:{
        // flex:1, 
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingBottom: 50,
        paddingTop: 0,
        paddingHorizontal: 35,
        width: '100%',
        
        position: 'absolute',
        bottom: 0
    },
    dotWrapper:{
        flexDirection: 'row'
    },
    dot:{
        width: 10,
        height: 10,
        borderRadius:2,
        marginRight: 10,
        backgroundColor:'#515D70',
        transform: [{ rotate: "47deg" }]
    },
    dotActive:{
        backgroundColor: '#EAA678'
    },

    nextButtonWrapper:{
        overflow: 'hidden',
        borderRadius:1000
    },
    nextButton:{
        backgroundColor: '#44577C',
        height: 65,
        // width: 65,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:1000
    },
    nextButtonText:{
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        color: '#ffffff',
        textAlign:'center',
        paddingTop: 5
    },
    nextSVG:{
        
    }
})