import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import Svg, { Circle, Path } from "react-native-svg";
import NetInfo from "@react-native-community/netinfo";

import { dWidth, dHeight, Touchable } from '../../includes/variables';
import { avatarCustomizer } from '../../includes/datasets';
import { saveUserData_MongoCRUD } from '../../includes/functions';
import ButtonView from '../../UIComponents/Buttons/ButtonWithShadow/floatingButton';
import ErrorSuccessAlert from '../../components/Alerts/ErrorSuccess/errorSuccessAlert';
import NoConnectionAlert from '../../components/Alerts/noConnection/noConnectionAlert';

import * as AvatarSVG from '../../SVG_Files/avatarSVG';

import {app as realmApp} from '../../../storage/realm';

let prevComponentId;

export default class customizeAvatar extends Component {
    user = realmApp.currentUser;
    userData = realmApp.currentUser.customData;
    unsubscribeNetworkUpdate;

    AvatarSVGKeys = {
        Male: Object.keys(AvatarSVG['Male']),
        Female: Object.keys(AvatarSVG['Female'])
    }


    state = {
       accordionActive : false,
       scrollPosition: 0,

       showSaveButton: false,
       savingData: false,

        avatarFeatures: {
            avatarId: this.userData.avatarFeatures.avatarId,
            skinTone: this.userData.avatarFeatures.skinTone,
            hairColor: this.userData.avatarFeatures.hairColor,
            shirtColor: this.userData.avatarFeatures.shirtColor,
            shirtCollarColor: this.userData.avatarFeatures.shirtCollarColor,
            eyeGlass: this.userData.avatarFeatures.eyeGlass,
            jewelry: this.userData.avatarFeatures.jewelry,
            bgColor: this.userData.avatarFeatures.bgColor
        },

        avatarFeaturesTitles: {
            skinTone: 'Skin Tone',
            hairColor: 'Hair / Turban Color',
            shirtColor: 'Shirt Color',
            shirtCollarColor: 'Shirt Collar Color',
            eyeGlass: 'Eye Glass ',
            jewelry: 'Ear Ring / Jewelry',
            bgColor: 'Background Color'
        },

        alertMessage:{
            show: false,
            type: '',
            title: '',
            subtitle: '',
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

    renderColorPicker = (feature, arrayObject = [''], selectedValue= '', isDisabled) => {
        // let TouchableView = isDisabled ? View :TouchableOpacity
        return arrayObject.map((item, i) =>{
            return (
                <TouchableOpacity  key={i} activeOpacity={0.8} onPress={()=>{this.setState(prevState => ({showSaveButton: true, avatarFeatures: {...prevState.avatarFeatures, [feature]:item }}))}}>
                <View style={[styles.colorPicker, {
                    backgroundColor: item, 
                    borderColor: ((item.toLowerCase() == '#FFFDF3'.toLowerCase()) || (item.toLowerCase() ==  '#FFFFFF'.toLowerCase())) ? '#B8BDC4' : item
                }]}>
                {item == selectedValue ? (<Svg
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
            </View>
            </TouchableOpacity>)
        })
    }

    renderColorPickerWrapper = (feature, hasSwitch = false) => {
        let disabled = (this.state.avatarFeatures[feature] == 'none') ? true : false
        return (
            <View>
                <View style={styles.sectionTitleWrapper}>
                    <View><Text style={[styles.sectionTitle, (this.state.avatarFeatures[feature] == 'none') ? {opacity: 0.6} : null]}>{this.state.avatarFeaturesTitles[feature]}</Text></View>
                    {hasSwitch ? 
                        (<View>
                            <Switch 
                                trackColor={{ false: "#767577", true: "#DCBCA8" }}
                                thumbColor={(this.state.avatarFeatures[feature] == 'none') ? "#f4f3f4" : "#C06A46" }
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={(val) => {this.setState(prevState => ({showSaveButton: true, avatarFeatures: {...prevState.avatarFeatures, [feature]: val ? avatarCustomizer[feature][0] : 'none'}}))}}
                                value={(this.state.avatarFeatures[feature] == 'none') ? false : true}
                            />
                        </View>) 
                    : null}
                </View>
                <View style={[styles.colorPickerWrapper, (this.state.avatarFeatures[feature] == 'none') ? {opacity: 0.6} : null]}>
                    {this.renderColorPicker(feature, avatarCustomizer[feature], this.state.avatarFeatures[feature], disabled)}
                </View>
            </View>
        )
    }

    renderAvatar = (avatarType = 'Male') => {
        return this.AvatarSVGKeys[avatarType].map((item,i) =>{ 
        // let AvatarSVGItem = this.AvatarSVGItems[item];
        let AvatarSVGItem = {uri : item.toLowerCase() };
        // console.log(item);
          return (
            <View style={styles.selectAvatarSVG} key={i}>
                <TouchableOpacity onPress={()=>{this.setState(prevState => ({showSaveButton: true, avatarFeatures: {...prevState.avatarFeatures, avatarId:item }}))}}>
                    <View style={{position: 'relative', borderRadius:1000, backgroundColor: '#FFEDEF'}}>
                      {item == this.state.avatarFeatures.avatarId ? (<Svg
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
                    
                        {/* <AvatarSVGItem width={65} height={65} avatarFeatures={{
                            skinTone: this.state.avatarFeatures.skinTone,
                            bgColor: this.state.avatarFeatures.bgColor
                        }} /> */}
                        <Image style={{width: 65, height: 65}} resizeMethod='resize' source={AvatarSVGItem} resizeMode='contain' />
                    </View>
                </TouchableOpacity>
            </View>
          )
        })
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
        let AvatarPreviewSVG = this.state.avatarFeatures.avatarId.toLowerCase().includes('f') ? AvatarSVG.Female[this.state.avatarFeatures.avatarId] : AvatarSVG.Male[this.state.avatarFeatures.avatarId];
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
                        <AvatarPreviewSVG width={180} height={180} avatarFeatures={this.state.avatarFeatures} />
                    </View>
                    <View><Text style={styles.avatarPreviewText}>Preview</Text></View>
                </View>

                <View style={styles.customizerWrapper}>

                    <Touchable activeOpacity={0.6} onPress={()=> this.setState(prevState => ({accordionActive: !prevState.accordionActive}))}>
                        <View style={styles.accordionWrapper}>
                            <View><Text style={[styles.sectionTitle,styles.accordionTitle]}>Select Avatar</Text></View>
                            <View>
                                <Svg
                                    width={39}
                                    height={8}
                                    viewBox={"0 0 39 20"}
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={this.state.accordionActive ? null : {transform:[{ rotate: "-90deg" }]}}
                                >
                                    <Path
                                        d="M2 2l17.5 15.5L36.667 2"
                                        stroke="#44577C"
                                        strokeWidth={4}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </Svg>
                            </View>
                        </View>
                    </Touchable>

                    { this.state.accordionActive ? 
                    (<View style={[styles.selectAvatarContainer,this.state.accordionActive ? null : {opacity: 0, height: 0}]}>
                        <View><Text style={styles.sectionTitle}>Male</Text></View>
                        <View style={styles.selectAvatarSVGWrapper}>
                            {this.renderAvatar('Male')}
                        </View>
                        
                        <View><Text style={styles.sectionTitle}>Female</Text></View>
                        <View style={styles.selectAvatarSVGWrapper}>
                            {this.renderAvatar('Female')}
                        </View>
                    </View>)
                        :
                    (<View>
                        {this.renderColorPickerWrapper('skinTone')}

                        {this.renderColorPickerWrapper('hairColor', true)}

                        {this.renderColorPickerWrapper('shirtColor')}

                        {this.renderColorPickerWrapper('shirtCollarColor')}

                        {this.renderColorPickerWrapper('eyeGlass', true)}

                        {this.renderColorPickerWrapper('jewelry', true)}

                        {this.renderColorPickerWrapper('bgColor')}
                    </View>)
}
                    

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

    sectionTitleWrapper:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    sectionTitle:{
        fontFamily: 'Poppins-Regular',
        fontSize: 17,
        color: '#515D70',
        paddingTop: 15,
        paddingBottom: 3
    },


    avatarPreviewWrapper:{
        width: '100%',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 10,
        marginTop: 35,
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


    accordionWrapper:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginHorizontal: -5,
        marginBottom: -8
    },
    accordionTitle:{
        color:'#000000',
        paddingBottom: 10,
    },

    selectAvatarContainer:{
        marginTop: -10,
        marginBottom: 15
    },
    selectAvatarSVGWrapper:{
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    selectAvatarSVG:{
        marginHorizontal: 4,
        marginVertical: 4,
    },


    colorPickerWrapper:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15
    },
    colorPicker:{
        width: 50,
        height: 50,
        borderRadius: 1000,
        marginHorizontal: 4,
        marginVertical: 4,
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderWidth: 1,
        position: 'relative'
    },

    checkMark: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 100
    }
})
