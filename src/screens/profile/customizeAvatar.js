import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import Svg, { Circle, Path } from "react-native-svg";
import NetInfo from "@react-native-community/netinfo";
import { BigHead } from 'react-native-bigheads'
import SelectPicker from 'react-native-picker-select';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import Shadow from 'react-native-drop-shadow';

import { dWidth, dHeight } from '../../includes/variables';
import { avatarCustomizer, avatarCustomizerColors } from '../../includes/datasets';
import { saveUserData_MongoCRUD, capitalizeFirstLetters, spaceCamelCase } from '../../includes/functions';
import ButtonView from '../../UIComponents/Buttons/ButtonWithShadow/floatingButton';
import ErrorSuccessAlert from '../../components/Alerts/ErrorSuccess/errorSuccessAlert';
import NoConnectionAlert from '../../components/Alerts/noConnection/noConnectionAlert';

import {app as realmApp} from '../../../storage/realm';

let prevComponentId;

export default class customizeAvatar extends Component {
    user = realmApp.currentUser;
    userData = realmApp.currentUser.customData;
    unsubscribeNetworkUpdate;


    state = {
       accordionActive : true,
       scrollPosition: 0,

       showSaveButton: false,
       savingData: false,

        avatarFeatures: this.userData.avatarFeatures,

        avatarFeaturesTitles: {
            accessory : 'Face Accessory',
            bgColor : 'Background Color',
            bgShape : 'Background Shape',
            body : 'Body Type',
            clothing : 'Clothing',
            clothingColor : 'Clothing Color',
            eyebrows : 'Eye Brows',
            eyes : 'Eyes',
            facialHair : 'Facial Hair',
            graphic : 'Shirt Graphics',
            hair : 'Hair Type',
            hairColor : 'Hair Color',
            hat : 'Hats & Caps',
            hatColor : 'Hat Color',
            lashes : 'Lashes',
            lipColor : 'Lips Color',
            mouth : 'Mouth',
            skinTone : 'Skin Tone',
        },

        alertMessage:{
            show: false,
            type: '',
            title: '',
            subtitle: '',
        },

        colorModal:{
            visible: false,
            feature: 'bgColor'
        },
        
        hasNetworkConnection: true,
    }

    componentDidMount(){
        prevComponentId = global.activeComponentId;
        global.activeComponentId = this.props.componentId;

        this.unsubscribeNetworkUpdate = NetInfo.addEventListener(state => {
            // console.log("Connection type", state.type);
            // console.log("Is connected?", state.isConnected);
            this.setState({hasNetworkConnection: state.isConnected});
        });
    }

    componentWillUnmount(){
        global.activeComponentId = prevComponentId;
        
        this.props.onCloseFunc ? this.props.onCloseFunc() : null;
    }

    renderAvatarFeatureOptions = (avatarFeature, type = "options")=>{
        let featureValue = this.state.avatarFeatures[avatarFeature];
        let selectOptions = avatarCustomizer[avatarFeature].map((value, i) => ({
            label: spaceCamelCase(capitalizeFirstLetters((type == "binal") ? (value ? 'Shown' : 'Hidden') : value)),
            value: value,
            key: i
        }))
        return (
            <View>
                <TouchableOpacity onPress={() => {
                    if(type == 'colors'){
                        this.setState({
                            colorModal:{
                                visible: true,
                                feature: avatarFeature
                            }
                        })
                    }
                }}>
                  <View style={{position: 'relative'}}>
                    <View style={styles.featureOptionWrapper}>
                        <View><Text style={styles.featureTitle}>{this.state.avatarFeaturesTitles[avatarFeature]}</Text></View>
                        {
                            (type == "options") 
                            ? <View><Text style={styles.featureValue}>{spaceCamelCase(capitalizeFirstLetters(featureValue))}</Text></View>
                            : (type == "binal") 
                            ? <View><Text style={styles.featureValue}>{featureValue ? 'Shown' : 'Hidden'}</Text></View>
                            : <View>
                                <LinearGradient colors={[
                                    avatarCustomizerColors[avatarFeature][featureValue].base,
                                    avatarCustomizerColors[avatarFeature][featureValue].shadow
                                ]} style={{height: 27, width:27, borderRadius:1000}} />
                            </View>
                        }
                    </View>
                    {type == 'colors' ? null : <View style={{position:'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
                        <SelectPicker 
                            value = {featureValue}
                            onValueChange={(val) => {
                                this.setState(prevState => ({
                                    showSaveButton: true,
                                    avatarFeatures:{
                                        ...prevState.avatarFeatures,
                                        [avatarFeature]:val
                                    }
                                }))
                            }}
                            items={selectOptions}
                            placeholder={{}}
                            useNativeAndroidPickerStyle = {false}
                            style={{
                                inputAndroid:{
                                    fontSize: 16.5,
                                    fontFamily: 'Poppins-Regular',
                                    color: 'transparent',
                                },
                                inputAndroidContainer:{
                                    backgroundColor: "transparent"
                                },
                            }}
                        />
                        
                    </View>}
                  </View>
                </TouchableOpacity>
            </View>
        )
    }

    onSaveAvatar= ()=>{
        saveUserData_MongoCRUD(
            {},
            {
                avatarFeatures: this.state.avatarFeatures,
                lastModifiedLog: 'Updated User Avatar',
            }, 
            (customUserData) => {
                this.props.refreshInfo(customUserData);
                this.setState({
                    showSaveButton: false,
                    savingData: false,
                    alertMessage:{
                        show: true,
                        type: 'success',
                        title: 'Saved Successfully!',
                        subtitle: '',
                    }
                });
            }
        )
        .catch((error) => {
            // console.log(error);
            this.setState({
                showSaveButton: true,
                savingData: false,
                alertMessage:{
                    show: true,
                    type: 'error',
                    title: 'Error saving your information',
                    subtitle: '',
                }
            })
        });
    }

    startSaving = () => {
        this.setState({
            savingData: true
        })
    }

    resetAlert = () => {
        this.timeoutAlert = setTimeout(()=>{
            this.setState({alertMessage: {show: false}})
            clearTimeout(this.timeoutAlert);
        }, 4500)
    }

    render() {
        this.state.savingData ? this.onSaveAvatar() : null;
        this.state.alertMessage.show ? this.resetAlert() : null;
        return (
            <View style={styles.container}>
              {this.state.hasNetworkConnection ? this.state.showSaveButton 
              ? (<ButtonView 
                    disabled={this.state.savingData} 
                    onPress={this.startSaving} 
                    floatingViewStyle={{top: dWidth > 575 ? (dHeight - (56 + 56) - 77) : (dHeight - (56 + 56) - 37)}} 
                    buttonText={this.state.savingData ? "Saving..." : "Save" }
                />)
              : null : <NoConnectionAlert />}
              
              {this.state.alertMessage.show ? (<ErrorSuccessAlert 
                    type = {this.state.alertMessage.type}
                    title = {this.state.alertMessage.title}
                    subtitle = {this.state.alertMessage.subtitle}
                    wrapperContainerStyle ={{top: dWidth > 575 ? (dHeight - (56 + 60) - 50) : (dHeight - (56 + 60) - 15)}}
                /> )
                : null}

                {this.state.colorModal.visible ? (<Modal
                    isVisible={(this.state.hasNetworkConnection && this.state.colorModal.visible)}
                    // coverScreen={false}
                    animationIn="slideInUp"
                    animationInTiming={500}
                    hideModalContentWhileAnimating={true}
                    onBackButtonPress={() => this.setState({colorModal: {visible: false}})}
                    onBackdropPress={() => this.setState({colorModal: {visible: false}})}
                    onSwipeComplete={() => this.setState({colorModal: {visible: false}})}
                    swipeDirection={['down', 'up']}
                    backdropColor= "#000000"
                    backdropOpacity={0.03}
                    style={{alignItems: 'center'}}
                >
                  <Shadow style={styles.colorSelectorViewShadow}>
                    <View style={styles.colorSelectorView}>
                        <View style={styles.colorPickerWrapper}>
                            {avatarCustomizer[this.state.colorModal.feature].map((item, i) => (
                                <TouchableOpacity onPress={() => {
                                    this.setState(prevState => ({
                                        colorModal: {visible: false},
                                        showSaveButton: true,
                                        avatarFeatures:{
                                            ...prevState.avatarFeatures,
                                            [this.state.colorModal.feature]:item
                                        }
                                    }))
                                }} key={i}>
                                    <LinearGradient 
                                        colors={[
                                            avatarCustomizerColors[this.state.colorModal.feature][item].base,
                                            avatarCustomizerColors[this.state.colorModal.feature][item].shadow
                                        ]}
                                        
                                        style={styles.colorPicker}
                                    >
                                        {item == this.state.avatarFeatures[this.state.colorModal.feature] ? (<Svg
                                            width={20}
                                            height={20}
                                            viewBox="0 0 33 33"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={styles.checkMark}
                                        >
                                            <Circle cx={16.44} cy={16.44} r={16.44} fill="#28A664" />
                                            <Path
                                                d="M7.877 16.44l5.48 5.48 11.645-10.96"
                                                stroke="#fff"
                                                strokeWidth={2.74}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </Svg>) : null}
                                    </LinearGradient>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                  </Shadow>
                </Modal> )
                : null}

              <ScrollView 
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainerStyle}
                stickyHeaderIndices = {[0]}
                
                onScroll={(e)=>{
                    if(e.nativeEvent.contentOffset.y < 500){
                        this.setState({scrollPosition: e.nativeEvent.contentOffset.y})
                    }
                }}
              >

                <View style={[styles.avatarPreviewWrapper,this.state.scrollPosition > 30 ? {elevation: 2, backgroundColor: '#FFFEFC'} : null]}>
                    <View style={styles.avatarPreview}>
                        <BigHead
                            accessory={this.state.avatarFeatures.accessory}
                            bgColor={this.state.avatarFeatures.bgColor}
                            bgShape={this.state.avatarFeatures.bgShape}
                            body={this.state.avatarFeatures.body}
                            clothing={this.state.avatarFeatures.clothing}
                            clothingColor={this.state.avatarFeatures.clothingColor}
                            eyebrows={this.state.avatarFeatures.eyebrows}
                            eyes={this.state.avatarFeatures.eyes}
                            facialHair={this.state.avatarFeatures.facialHair}
                            graphic={this.state.avatarFeatures.graphic}
                            hair={this.state.avatarFeatures.hair}
                            hairColor={this.state.avatarFeatures.hairColor}
                            hat={this.state.avatarFeatures.hat}
                            hatColor={this.state.avatarFeatures.hatColor}
                            lashes={this.state.avatarFeatures.lashes}
                            lipColor={this.state.avatarFeatures.lipColor}
                            mouth={this.state.avatarFeatures.mouth}
                            showBackground={this.state.avatarFeatures.showBackground}
                            size={230}
                            skinTone={this.state.avatarFeatures.skinTone}
                        />
                    </View>
                    <View><Text style={styles.avatarPreviewText}>Preview</Text></View>
                </View>

                <View style={styles.customizerWrapper}>

                    <View>
                        {/* {this.renderColorPickerWrapper('skinTone')} */}
                        <View><Text style={styles.sectionTitle}>Skin Tone</Text></View>
                        {this.renderAvatarFeatureOptions('skinTone', 'colors')}

                        <View><Text style={styles.sectionTitle}>Body</Text></View>
                        {this.renderAvatarFeatureOptions('body', 'options')}
                        {this.renderAvatarFeatureOptions('clothing', 'options')}
                        {this.renderAvatarFeatureOptions('clothingColor', 'colors')}
                        {this.renderAvatarFeatureOptions('graphic', 'options')}

                        <View><Text style={styles.sectionTitle}>Hair</Text></View>
                        {this.renderAvatarFeatureOptions('hair', 'options')}
                        {this.renderAvatarFeatureOptions('facialHair', 'options')}
                        {this.renderAvatarFeatureOptions('hairColor', 'colors')}

                        <View><Text style={styles.sectionTitle}>Face</Text></View>
                        {this.renderAvatarFeatureOptions('eyes', 'options')}
                        {this.renderAvatarFeatureOptions('eyebrows', 'options')}
                        {this.renderAvatarFeatureOptions('lashes', 'binal')}
                        {this.renderAvatarFeatureOptions('mouth', 'options')}
                        {this.renderAvatarFeatureOptions('lipColor', 'colors')}

                        <View><Text style={styles.sectionTitle}>Accessories</Text></View>
                        {this.renderAvatarFeatureOptions('accessory', 'options')}
                        {this.renderAvatarFeatureOptions('hat', 'options')}
                        {this.renderAvatarFeatureOptions('hatColor', 'colors')}

                            <View><Text style={styles.sectionTitle}>Accessories</Text></View>
                            {this.renderAvatarFeatureOptions('bgShape', 'options')}
                        {this.renderAvatarFeatureOptions('bgColor', 'colors')}
                    </View>                    

                </View>

              </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollContainerStyle:{
        paddingBottom: 150
    },
    
    sectionTitle:{
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: '#515D70',
        paddingTop: 15,
        paddingBottom: 0
    },

    featureOptionWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingVertical: 7
    },
    featureTitle:{
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: '#515D70',
    },
    featureValue:{
        fontFamily: 'Poppins-Regular',
        fontSize: 14.5,
        color: '#515D70',
    },

    colorSelectorView:{
        backgroundColor: '#fff',
        width: '100%',
        // maxWidth:500,
        marginHorizontal: 'auto',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 25,
        // elevation: 3,
        
    },
    colorSelectorViewShadow:{
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.19,
        shadowColor: "#000000",
        shadowRadius: 10,
        borderRadius: 15,
        backgroundColor: 'transparent',
        width:'100%',
        maxWidth:500,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 20
    },


    avatarPreviewWrapper:{
        width: '100%',
        alignItems: 'center',
        paddingTop: 0,
        paddingBottom: 10,
        marginTop: 0,
        marginBottom: 10,
        width: dWidth,
        backgroundColor : '#FFFFFF'
    },
    avatarPreview:{},
    avatarPreviewText:{
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#000000',
        paddingTop: 6,
        paddingBottom: 3,
        textAlign:'center'
    },


    customizerWrapper:{
        paddingHorizontal: 20
    },


    colorPickerWrapper:{
        flexDirection: 'row',
        // justifyContent: 'space-between',
        flexWrap: 'wrap',
        // marginBottom: 15
    },
    colorPicker:{
        width: 50,
        height: 50,
        borderRadius: 1000,
        marginHorizontal: 4,
        marginVertical: 4,
        backgroundColor: '#ffffff',
        position: 'relative'
    },

    checkMark: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 100
    }
})
