import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Svg, { Circle, Path } from "react-native-svg";
import { Shadow } from 'react-native-neomorph-shadows';
import ViewShot, {captureRef} from "react-native-view-shot";
import NetInfo from "@react-native-community/netinfo";

import {app as realmApp} from '../../../storage/realm';

import {dWidth} from '../../includes/variables';
import {onShare, goToScreen} from '../../includes/functions';
import ContactsModal from '../../UIComponents/Modals/DefaultModal';
import NoConnectionAlert from '../../components/Alerts/noConnection/noConnectionAlert';

import * as AvatarSVG from '../../SVG_Files/avatarSVG';

let prevComponentId;

export default class profile extends Component {
    // Class Variables 
    user = realmApp.currentUser;
    userData = realmApp.currentUser.customData;
    unsubscribeNetworkUpdate;
    viewShot = React.createRef();
    state = {
        actionsWrapperHeight: 410,
        contactModal: false,
        displayName: (
            (typeof this.userData.displayName == 'undefined' || this.userData.displayName == null || this.userData.displayName.trim() == "") 
            ? `${this.userData.fullName.trim().trimStart()}` : this.userData.displayName.trim().trimStart()
        ),
        contactInfo: {
            email: this.userData.contactEmail,
            phone: this.userData.contactPhone
        },
        avatarFeatures: this.userData.avatarFeatures,
        avatarTempImage: '',
        hasNetworkConnection: true,
    }

    componentDidMount () {
        this.viewShot.current.capture().then(uri => {
        //   console.log("avatarTempImage: ", uri);
          this.setState({avatarTempImage: uri})
        });

        this.unsubscribeNetworkUpdate = NetInfo.addEventListener(state => {
            // console.log("Connection type", state.type);
            // console.log("Is connected?", state.isConnected);
            this.setState({hasNetworkConnection: state.isConnected});
        });
        
        prevComponentId = global.activeComponentId;
        global.activeComponentId = this.props.componentId;
    }

    componentWillUnmount() {
        global.activeComponentId = prevComponentId;
    }


    goToScreenFunc =(screenName,screenProps = null, screenOptions = null) =>{
        goToScreen(this.props.componentId, screenName, screenProps, screenOptions);
      }

    refreshInfo = (newUserData) => {
        this.userData = newUserData;
        
        this.setState({
            displayName: (
                (typeof this.userData.displayName == 'undefined' || this.userData.displayName == null || this.userData.displayName.trim() == "") 
                ? `${this.userData.fullName.trim().trimStart()}` : this.userData.displayName.trim().trimStart()
            ),
            contactInfo: {
                email: this.userData.contactEmail,
                phone: this.userData.contactPhone
            },
            avatarFeatures : this.userData.avatarFeatures
        });
    }

    updateAvatarTemp = async() =>{
        let uri = await captureRef(this.viewShot.current, {format: 'png'})
        // console.log("another one: ",uri);

        this.setState({
            avatarTempImage: uri
        })
    }

    render() {
        let AvatarSVGView = this.state.avatarFeatures.avatarId.toLowerCase().includes('f') ? AvatarSVG.Female[this.state.avatarFeatures.avatarId] : AvatarSVG.Male[this.state.avatarFeatures.avatarId];
        return (
            <View style={styles.container}>
                <ContactsModal 
                    isVisible={this.state.contactModal}
                    closeFunction = {() => {this.setState({contactModal: false})}}
                    type='contactDetails'
                    goToScreen = {() => {this.setState({contactModal: false},() => {this.goToScreenFunc('com.lysts.screen.profileInfo', {refreshInfo: this.refreshInfo})})}}

                    contactInfo={this.state.contactInfo}
                    modalTitle='Contact Details'
                    modalSubtitle='Your contact information will not be shared with other users'
                />
              <ScrollView 
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                bounces={false}
                overScrollMode = 'auto'
              >
                <View style={styles.top}>
                    <View>
                        <TouchableOpacity useForeground={true} activeOpacity={0.8} onPress={()=>{this.goToScreenFunc('com.lysts.screen.customizeAvatar',{refreshInfo: this.refreshInfo, onCloseFunc: this.updateAvatarTemp},{
                            topBar: {
                                title: {
                                    text: 'Customize Avatar'
                                },
                                visible: true,
                                drawBehind: false,
                                animate: true,
                            }
                        })}}>
                            <ViewShot ref={this.viewShot} options={{ format: "png" }}>
                                <View style={styles.avatar}>
                                    <AvatarSVGView width={100} height={100} avatarFeatures={this.state.avatarFeatures} />
                                </View>
                            </ViewShot>
                        </TouchableOpacity>
                    </View>
                    <View><Text style={styles.name}>{this.state.displayName}</Text></View>
                    <View>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => {this.goToScreenFunc('com.lysts.screen.profileInfo', {refreshInfo: this.refreshInfo, onCloseFunc: this.updateAvatarTemp})}}>
                            <View style={styles.button}><Text style={styles.buttonText}>Edit Profile</Text></View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Shadow
                        useArt
                        style={[styles.actionsWrapperShadow, {height:this.state.actionsWrapperHeight}]}
                    >
                        <View style={styles.actionsWrapper} onLayout={(e) => {
                            this.setState({actionsWrapperHeight: e.nativeEvent.layout.height})
                        }}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {this.goToScreenFunc('com.lysts.screen.save_archive',{show: 'saved',avatarImage: this.state.avatarTempImage})}}>
                                <View style={styles.action}>
                                    <View style={styles.actionWrapper}>
                                        <View style={styles.actionIconWrapper}>
                                            <Svg width={30} height={30} viewBox="0 0 66 76" fill="none">
                                                <Path
                                                    d="M49.234 26.711a4.124 4.124 0 01-.908-2.795c.138-2.772-1.706-5.31-4.385-6.035a4.124 4.124 0 01-2.377-1.727c-1.518-2.324-4.501-3.293-7.095-2.305a4.12 4.12 0 01-2.939 0c-2.593-.988-5.577-.018-7.094 2.305a4.122 4.122 0 01-2.378 1.728c-2.679.725-4.523 3.263-4.385 6.034a4.122 4.122 0 01-.908 2.796c-1.741 2.16-1.741 5.298 0 7.46.636.789.959 1.781.908 2.794-.138 2.772 1.706 5.31 4.385 6.035.483.13.933.347 1.332.635v17.2a.909.909 0 001.48.707L33 54.976l8.13 6.566a.91.91 0 001.479-.706v-17.2c.399-.288.849-.505 1.333-.636 2.678-.724 4.523-3.263 4.384-6.034a4.122 4.122 0 01.909-2.796c1.74-2.16 1.74-5.298 0-7.459zm-15.663 26.39a.909.909 0 00-1.142 0l-7.221 5.833V45.67c1.628 1.623 4.115 2.204 6.323 1.364a4.12 4.12 0 012.938 0c.683.26 1.392.384 2.094.384 1.57 0 3.104-.623 4.229-1.744v13.26l-7.221-5.832zm14.248-20.07a5.938 5.938 0 00-1.308 4.026 4.152 4.152 0 01-3.044 4.19 5.938 5.938 0 00-3.424 2.488 4.152 4.152 0 01-4.926 1.6 5.944 5.944 0 00-4.233 0 4.153 4.153 0 01-4.926-1.6 5.938 5.938 0 00-3.424-2.488 4.151 4.151 0 01-3.045-4.19 5.938 5.938 0 00-1.308-4.026 4.152 4.152 0 010-5.18 5.938 5.938 0 001.308-4.025 4.152 4.152 0 013.045-4.19 5.938 5.938 0 003.424-2.488 4.152 4.152 0 014.926-1.601 5.94 5.94 0 004.233 0 4.152 4.152 0 014.926 1.6 5.938 5.938 0 003.424 2.488 4.151 4.151 0 013.044 4.19 5.94 5.94 0 001.308 4.027 4.152 4.152 0 010 5.179z"
                                                    fill="#A58BC9"
                                                />
                                                <Path
                                                    d="M65.546 18.65L33.454.122a.91.91 0 00-.908 0L.454 18.65a.91.91 0 00-.454.787v37.055a.91.91 0 00.454.787l32.092 18.528a.908.908 0 00.908 0L65.546 57.28a.91.91 0 00.454-.787V19.436a.91.91 0 00-.454-.786zM33 73.97L1.817 55.968V21.01l11.274 6.509A.908.908 0 1014 25.945L2.725 19.437 33 1.956l30.274 17.48-10.43 6.021a.909.909 0 10.908 1.574l10.43-6.022v34.958L33 73.97z"
                                                    fill="#846F75"
                                                />
                                                <Path
                                                    d="M36.102 23.515A4.787 4.787 0 0033 24.645a4.786 4.786 0 00-3.102-1.13 4.835 4.835 0 00-4.83 4.83c0 4.038 6.631 9.113 7.387 9.678a.907.907 0 001.089 0c.756-.566 7.387-5.64 7.387-9.678a4.835 4.835 0 00-4.83-4.83zM33 36.146c-2.106-1.679-6.114-5.375-6.114-7.8a3.016 3.016 0 013.012-3.013c.938 0 1.806.428 2.383 1.176a.909.909 0 001.438 0 2.993 2.993 0 012.383-1.176 3.016 3.016 0 013.013 3.012c0 2.426-4.009 6.122-6.115 7.801z"
                                                    fill="#846F75"
                                                />
                                            </Svg>
                                        </View>
                                        <View style={styles.actionTextWrapper}><Text style={styles.actionText}>Saved wishlists</Text></View>
                                    </View>
                                    
                                    <View style={styles.actionIndicator}>
                                        <Svg width={25} height={25} viewBox="0 0 56 56" fill="none" >
                                            <Circle cx={28.08} cy={27.96} r={27.36} fill="#E4E7EA" />
                                            <Path
                                                d="M23.76 17.88l8.64 10.08-8.64 10.08"
                                                stroke="#44577C"
                                                strokeWidth={5.184}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </Svg>
                                    </View>
                                </View>    
                            </TouchableOpacity>

                            <View style={styles.actionDivider}></View>
                            
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {this.goToScreenFunc('com.lysts.screen.save_archive',{show: 'archive',avatarImage: this.state.avatarTempImage})}}>
                                <View style={styles.action}>
                                    <View style={styles.actionWrapper}>
                                        <View style={styles.actionIconWrapper}>
                                            <Svg width={30} height={30} viewBox="0 0 59 78" fill="none">
                                                <Path
                                                    d="M23.64 29.048H7.415a.94.94 0 110-1.879H23.64a.94.94 0 110 1.879zM23.64 52.699H7.415a.94.94 0 110-1.879H23.64a.94.94 0 110 1.879z"
                                                    fill="#ED9ABC"
                                                />
                                                <Path
                                                    d="M51.236 70.692V8.211a.94.94 0 00-.94-.94H.94a.94.94 0 00-.939.94v62.481c0 .52.42.94.94.94h49.357a.94.94 0 00.939-.94zm-1.879-.939H1.88V9.15h47.478v60.603z"
                                                    fill="#846F75"
                                                />
                                                <Path
                                                    d="M54.487 11.411a.938.938 0 10-1.875.123l4.042 61.41-47.376 3.118-.146-2.205a.94.94 0 00-1.875.123l.207 3.143a.94.94 0 001 .875l49.25-3.242a.939.939 0 00.876-.999l-4.103-62.346z"
                                                    fill="#846F75"
                                                />
                                                <Path
                                                    d="M21.135 45.207h16.783a.94.94 0 100-1.879H21.135a.94.94 0 100 1.879zM7.415 45.207h9.963a.94.94 0 100-1.879H7.415a.94.94 0 100 1.879zM31.452 39.35c0 .518.42.939.939.939h11.054a.94.94 0 100-1.879H32.391a.94.94 0 00-.94.94zM7.415 40.289h21.219a.94.94 0 100-1.879H7.414a.94.94 0 100 1.879zM19.507 34.431c0 .52.42.94.94.94H40.56a.94.94 0 100-1.879H20.447a.94.94 0 00-.94.94zM7.415 35.37h9.274a.94.94 0 100-1.878H7.415a.94.94 0 100 1.879zM43.446 62.06H32.39a.94.94 0 100 1.88h11.055a.94.94 0 100-1.88zM7.415 63.94h21.219a.94.94 0 100-1.88H7.414a.94.94 0 100 1.88zM19.507 58.082c0 .519.42.94.94.94H40.56a.94.94 0 100-1.88H20.447a.94.94 0 00-.94.94zM7.415 59.021h9.274a.94.94 0 100-1.878H7.415a.94.94 0 100 1.878zM12.725 21.028H38.51a.94.94 0 100-1.879H12.725a.94.94 0 100 1.879z"
                                                    fill="#846F75"
                                                />
                                                <Path
                                                    d="M11.341 16.303A2.805 2.805 0 018.54 13.5V4.974a.94.94 0 111.879 0V13.5c0 .509.414.923.923.923.51 0 .924-.414.924-.923V4.665A2.79 2.79 0 009.478 1.88a2.79 2.79 0 00-2.786 2.786v6.973a.94.94 0 11-1.879 0V4.665A4.67 4.67 0 019.478 0a4.67 4.67 0 014.665 4.665v8.836a2.805 2.805 0 01-2.802 2.802z"
                                                    fill="#ED9ABC"
                                                />
                                            </Svg>
                                        </View>
                                        <View style={styles.actionTextWrapper}><Text style={styles.actionText}>Archive</Text></View>
                                    </View>
                                    
                                    <View style={styles.actionIndicator}>
                                        <Svg width={25} height={25} viewBox="0 0 56 56" fill="none" >
                                            <Circle cx={28.08} cy={27.96} r={27.36} fill="#E4E7EA" />
                                            <Path
                                                d="M23.76 17.88l8.64 10.08-8.64 10.08"
                                                stroke="#44577C"
                                                strokeWidth={5.184}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </Svg>
                                    </View>
                                </View>    
                            </TouchableOpacity>

                            <View style={styles.actionDivider}></View>
                            
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {this.goToScreenFunc('com.lysts.screen.profileInfo', {refreshInfo: this.refreshInfo})}}>
                                <View style={styles.action}>
                                    <View style={styles.actionWrapper}>
                                        <View style={styles.actionIconWrapper}>
                                            <Svg width={30} height={30} viewBox="0 0 66 71" fill="none">
                                                <Path
                                                    d="M27.3 53.82a.886.886 0 01-.78-.465L14.213 30.554a.887.887 0 011.561-.843L27.3 51.066l11.527-21.354a.888.888 0 011.561.842L28.081 53.355a.888.888 0 01-.78.466z"
                                                    fill="#ED9ABC"
                                                />
                                                <Path
                                                    d="M27.3 38.994a.884.884 0 01-.628-.26l-3.987-3.987a.886.886 0 010-1.254l3.988-3.987a.886.886 0 011.254 0l3.987 3.987a.886.886 0 010 1.254l-3.987 3.987a.884.884 0 01-.627.26zm-2.733-4.874l2.733 2.733 2.733-2.733-2.733-2.734-2.733 2.734z"
                                                    fill="#ED9ABC"
                                                />
                                                <Path
                                                    d="M29.843 49.048a.887.887 0 01-.88-.788l-1.26-11.132a.887.887 0 011.763-.2l1.26 11.133a.887.887 0 01-.883.987zM24.758 49.048a.888.888 0 01-.883-.987l1.259-11.133a.887.887 0 111.763.2L25.638 48.26a.888.888 0 01-.88.788z"
                                                    fill="#ED9ABC"
                                                />
                                                <Path
                                                    d="M12.285 70.327a.887.887 0 01-.887-.887V48.655a.887.887 0 111.774 0V69.44c0 .49-.397.887-.887.887zM42.316 70.327a.887.887 0 01-.887-.887V48.655a.887.887 0 111.773 0V69.44c0 .49-.396.887-.886.887z"
                                                    fill="#EBE7F2"
                                                />
                                                <Path
                                                    d="M53.714 65.54a.887.887 0 00-.887.888v2.126H1.773V44.938c0-8.23 6.697-14.926 14.927-14.926h3.766a.887.887 0 00.406-1.675 14.015 14.015 0 01-7.63-12.506c0-7.751 6.307-14.057 14.058-14.057 7.752 0 14.058 6.306 14.058 14.057 0 5.29-2.923 10.082-7.63 12.506a.887.887 0 00.407 1.675H37.9c1.921 0 3.791.36 5.558 1.07a.887.887 0 00.661-1.647 16.621 16.621 0 00-6.22-1.197h-.758a15.77 15.77 0 005.99-12.407C43.132 7.102 36.03 0 27.3 0S11.47 7.102 11.47 15.831a15.77 15.77 0 005.99 12.407H16.7c-9.208 0-16.7 7.492-16.7 16.7V69.44c0 .49.397.887.887.887h52.827c.49 0 .887-.397.887-.887v-3.012a.887.887 0 00-.887-.887z"
                                                    fill="#846F75"
                                                />
                                                <Path
                                                    d="M65.113 32.2h-5.449v-1.235c0-.948-.772-1.72-1.72-1.72h-8.459c-.948 0-1.72.772-1.72 1.72V32.2h-5.45a.887.887 0 00-.886.886v29.662c0 .49.397.887.887.887h22.797c.49 0 .887-.397.887-.887V33.087a.887.887 0 00-.887-.887zm-17.872 1.773h12.947v2.78H47.24v-2.78zm2.298-2.954h8.351v1.18h-8.35v-1.18zM64.226 61.86H43.203V33.974h2.264v2.833c0 .948.772 1.72 1.72 1.72h13.055c.948 0 1.72-.772 1.72-1.72v-2.833h2.265V61.86z"
                                                    fill="#846F75"
                                                />
                                                <Path
                                                    d="M57.634 49.542H49.55a.887.887 0 01-.887-.887V40.57c0-.49.397-.887.887-.887h8.084c.49 0 .887.397.887.887v8.084c0 .49-.397.887-.887.887zm-7.198-1.774h6.311v-6.31h-6.31v6.31zM57.634 60.392H49.55a.887.887 0 01-.887-.887v-8.084c0-.49.397-.887.887-.887h8.084c.49 0 .887.397.887.887v8.084c0 .49-.397.887-.887.887zm-7.198-1.774h6.311v-6.31h-6.31v6.31z"
                                                    fill="#EBE7F2"
                                                />
                                                <Path
                                                    d="M53.653 46.595A.884.884 0 0153 46.31l-1.766-1.911a.887.887 0 111.302-1.205l1.194 1.292 2.876-2.404a.886.886 0 111.138 1.36l-3.524 2.946a.883.883 0 01-.568.207zM52.05 57.89a.886.886 0 01-.627-1.514l3.082-3.082a.886.886 0 111.254 1.254l-3.082 3.082a.886.886 0 01-.627.26z"
                                                    fill="#ED9ABC"
                                                />
                                                <Path
                                                    d="M55.132 57.89a.885.885 0 01-.627-.26l-3.082-3.082a.886.886 0 111.254-1.254l3.082 3.082a.886.886 0 01-.627 1.514z"
                                                    fill="#ED9ABC"
                                                />
                                            </Svg>
                                        </View>
                                        <View style={styles.actionTextWrapper}><Text style={styles.actionText}>Profile information</Text></View>
                                    </View>
                                    
                                    <View style={styles.actionIndicator}>
                                        <Svg width={25} height={25} viewBox="0 0 56 56" fill="none" >
                                            <Circle cx={28.08} cy={27.96} r={27.36} fill="#E4E7EA" />
                                            <Path
                                                d="M23.76 17.88l8.64 10.08-8.64 10.08"
                                                stroke="#44577C"
                                                strokeWidth={5.184}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </Svg>
                                    </View>
                                </View>    
                            </TouchableOpacity>

                            <View style={styles.actionDivider}></View>
                            
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {this.setState({contactModal: true})}}>
                                <View style={styles.action}>
                                    <View style={styles.actionWrapper}>
                                        <View style={styles.actionIconWrapper}>
                                            <Svg width={30} height={30} viewBox="0 0 66 67" fill="none">
                                                <Path
                                                    d="M6.261 43.773a.855.855 0 01-.439-1.592l4.68-2.788-.733-2.276-5.237.452a.857.857 0 01-.147-1.706l5.916-.511a.857.857 0 01.889.59l1.152 3.575a.856.856 0 01-.378.998l-5.266 3.138a.846.846 0 01-.437.12zM12.643 53.27a.856.856 0 01-.676-1.38l3.44-4.446-1.518-1.849-4.97 2.47a.856.856 0 01-.762-1.533l5.581-2.774a.856.856 0 011.043.224l2.382 2.904c.253.308.26.751.015 1.066l-3.857 4.986a.855.855 0 01-.678.332zM59.739 43.773c-.15 0-.3-.039-.438-.121l-5.266-3.137a.856.856 0 01-.377-.998l1.152-3.575a.856.856 0 01.888-.59l5.917.51a.856.856 0 01-.148 1.706l-5.237-.452-.733 2.276 4.68 2.789a.856.856 0 01-.438 1.592zM53.356 53.27a.854.854 0 01-.677-.332l-3.857-4.986a.856.856 0 01.015-1.066l2.382-2.904a.856.856 0 011.043-.224l5.58 2.774a.856.856 0 11-.761 1.533l-4.97-2.47-1.517 1.85 3.439 4.445a.856.856 0 01-.677 1.38z"
                                                    fill="#EBE7F2"
                                                />
                                                <Path
                                                    d="M47.349 36.708H18.652c-4.915 0-8.913-3.999-8.913-8.913s3.998-8.912 8.913-8.912h28.696c4.915 0 8.913 3.998 8.913 8.912 0 4.914-3.998 8.913-8.912 8.913zM18.652 20.595c-3.97 0-7.2 3.23-7.2 7.2s3.23 7.2 7.2 7.2h28.696c3.97 0 7.2-3.23 7.2-7.2s-3.23-7.2-7.2-7.2H18.652z"
                                                    fill="#ED9ABC"
                                                />
                                                <Path
                                                    d="M27.119 15.317a.856.856 0 01-.856-.856V8.413a.856.856 0 111.712 0v6.048a.856.856 0 01-.856.856zM33 15.317a.856.856 0 01-.856-.856V8.413a.856.856 0 111.712 0v6.048a.856.856 0 01-.856.856zM38.881 15.317a.856.856 0 01-.856-.856V8.413a.856.856 0 111.712 0v6.048a.856.856 0 01-.856.856z"
                                                    fill="#EBE7F2"
                                                />
                                                <Path
                                                    d="M19.6 22.847a4.954 4.954 0 00-4.948 4.948 4.954 4.954 0 004.949 4.948 4.954 4.954 0 004.948-4.948 4.954 4.954 0 00-4.948-4.948zm0 8.184a3.24 3.24 0 01-3.235-3.236A3.24 3.24 0 0119.6 24.56a3.24 3.24 0 013.235 3.236 3.24 3.24 0 01-3.235 3.236zM46.4 22.847a4.954 4.954 0 00-4.949 4.948 4.954 4.954 0 004.948 4.948 4.954 4.954 0 004.948-4.948 4.954 4.954 0 00-4.948-4.948zm0 8.184a3.24 3.24 0 01-3.236-3.236 3.24 3.24 0 013.235-3.236 3.24 3.24 0 013.236 3.236 3.24 3.24 0 01-3.236 3.236zM39.505 41.204h-13.01a.856.856 0 00-.856.856v1.602c0 4.06 3.302 7.362 7.36 7.362 4.06 0 7.362-3.303 7.362-7.362V42.06a.856.856 0 00-.856-.856zm-.856 2.458a5.655 5.655 0 01-5.65 5.65 5.655 5.655 0 01-5.648-5.65v-.745H38.65v.745zM9.718 4.86A4.864 4.864 0 004.858 0 4.864 4.864 0 000 4.86c0 2.678 2.18 4.858 4.859 4.858a4.864 4.864 0 004.859-4.859zm-8.005 0a3.15 3.15 0 013.146-3.147 3.15 3.15 0 013.146 3.146A3.15 3.15 0 014.86 8.006a3.15 3.15 0 01-3.146-3.147z"
                                                    fill="#846F75"
                                                />
                                                <Path
                                                    d="M56.748 10.336a.856.856 0 00-1.195-1.226l-1.345 1.311C48.766 5.001 41.268 1.646 33 1.646c-8.268 0-15.767 3.355-21.208 8.775L10.447 9.11a.856.856 0 10-1.195 1.226l1.362 1.328c-4.773 5.324-7.68 12.353-7.68 20.05 0 9.079 4.015 17.527 11.04 23.27l-2.977 10.54a.856.856 0 001.166 1.017l13.208-5.744a30.14 30.14 0 007.63.983c16.578 0 30.066-13.488 30.066-30.067 0-7.696-2.908-14.725-7.681-20.049l1.362-1.328zM33 60.068c-2.519 0-5.032-.337-7.471-1.002a.854.854 0 00-.567.04l-11.826 5.145 2.64-9.346a.857.857 0 00-.295-.906C8.595 48.58 4.646 40.455 4.646 31.713 4.646 16.08 17.366 3.36 33 3.36c15.635 0 28.355 12.72 28.355 28.354 0 15.635-12.72 28.355-28.355 28.355zM61.141 0a4.864 4.864 0 00-4.859 4.859c0 2.679 2.18 4.859 4.859 4.859 2.68 0 4.859-2.18 4.859-4.86C66 2.18 63.82 0 61.14 0zm0 8.005a3.15 3.15 0 01-3.146-3.147 3.15 3.15 0 013.146-3.146 3.15 3.15 0 013.146 3.146 3.15 3.15 0 01-3.146 3.147z"
                                                    fill="#846F75"
                                                />
                                            </Svg>
                                        </View>
                                        <View style={styles.actionTextWrapper}><Text style={styles.actionText}>Contact details</Text></View>
                                    </View>
                                    
                                    <View style={styles.actionIndicator}>
                                        <Svg width={25} height={25} viewBox="0 0 56 56" fill="none" >
                                            <Circle cx={28.08} cy={27.96} r={27.36} fill="#E4E7EA" />
                                            <Path
                                                d="M23.76 17.88l8.64 10.08-8.64 10.08"
                                                stroke="#44577C"
                                                strokeWidth={5.184}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </Svg>
                                    </View>
                                </View>    
                            </TouchableOpacity>

                            <View style={styles.actionDivider}></View>
                            
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {this.goToScreenFunc('com.lysts.screen.settings',{avatarImage: this.state.avatarTempImage, hasNetworkConnection: this.state.hasNetworkConnection})}}>
                                <View style={styles.action}>
                                    <View style={styles.actionWrapper}>
                                        <View style={styles.actionIconWrapper}>
                                            <Svg width={30} height={30} viewBox="0 0 66 66" fill="none">
                                                <Path
                                                    d="M32.837 51.648c-10.283 0-18.648-8.366-18.648-18.648s8.366-18.648 18.648-18.648c9.894 0 18.081 7.836 18.615 17.628h3.656a.82.82 0 01.665 1.3l-6.416 8.881a.82.82 0 01-1.328 0l-6.416-8.88a.82.82 0 01.665-1.3h4.242a.82.82 0 110 1.639H43.88l4.812 6.661 4.812-6.661H50.66a.82.82 0 01-.82-.811c-.102-9.273-7.73-16.817-17.002-16.817-9.378 0-17.008 7.63-17.008 17.008s7.63 17.008 17.008 17.008c4.502 0 8.834-1.8 12.011-4.967l-1.85-1.685a14.546 14.546 0 01-10.161 4.152c-8 0-14.508-6.509-14.508-14.508 0-8 6.508-14.508 14.508-14.508 6.471 0 12.214 4.353 13.966 10.586a.82.82 0 01-1.579.444c-1.553-5.529-6.647-9.39-12.387-9.39-7.096 0-12.868 5.772-12.868 12.868 0 7.095 5.773 12.868 12.868 12.868a12.9 12.9 0 009.517-4.207.818.818 0 011.159-.054l3.06 2.788a.82.82 0 01.054 1.158 18.694 18.694 0 01-13.79 6.095z"
                                                    fill="#A58BC9"
                                                />
                                                <Path
                                                    d="M63.148 25.927h-.001l-8.059-2.076 4.23-7.168a3.807 3.807 0 00-.588-4.623l-4.79-4.79a3.81 3.81 0 00-4.624-.588l-7.167 4.23-2.077-8.06A3.807 3.807 0 0036.387 0h-6.773a3.807 3.807 0 00-3.686 2.853l-2.077 8.059-7.167-4.23a3.808 3.808 0 00-4.624.588l-4.79 4.79a3.807 3.807 0 00-.587 4.624l4.23 7.167-8.06 2.076A3.807 3.807 0 000 29.613v6.773a3.808 3.808 0 002.854 3.686l8.058 2.077-4.23 7.167a3.807 3.807 0 00.589 4.623l4.79 4.79a3.808 3.808 0 004.623.588l7.167-4.23 2.077 8.06A3.807 3.807 0 0029.614 66h6.773a3.808 3.808 0 003.686-2.854l2.076-8.058 7.167 4.23a3.807 3.807 0 004.624-.589l4.79-4.79a3.808 3.808 0 00.588-4.624l-4.23-7.167 8.06-2.076A3.807 3.807 0 0066 36.386v-6.773a3.806 3.806 0 00-2.852-3.686zm1.213 10.46c0 .987-.668 1.85-1.624 2.097l-9.114 2.349a.82.82 0 00-.501 1.21l4.783 8.105a2.168 2.168 0 01-.334 2.632l-4.79 4.79a2.167 2.167 0 01-2.631.335l-8.106-4.784a.821.821 0 00-1.21.502l-2.349 9.113a2.168 2.168 0 01-2.098 1.624h-6.773c-.988 0-1.85-.668-2.098-1.623l-2.348-9.114a.82.82 0 00-1.211-.502l-8.105 4.784a2.168 2.168 0 01-2.632-.335l-4.79-4.79a2.166 2.166 0 01-.334-2.63l4.784-8.106a.82.82 0 00-.502-1.211l-9.113-2.348a2.168 2.168 0 01-1.625-2.098v-6.774c0-.988.668-1.85 1.624-2.098l9.114-2.348a.82.82 0 00.502-1.21L8.095 15.85a2.167 2.167 0 01.335-2.632l4.79-4.79a2.165 2.165 0 012.63-.334l8.106 4.784a.82.82 0 001.21-.502l2.35-9.113a2.168 2.168 0 012.097-1.624h6.774c.987 0 1.85.667 2.097 1.623l2.349 9.114a.82.82 0 001.21.502l8.105-4.784c.85-.5 1.934-.363 2.632.335l4.79 4.79c.698.698.836 1.78.335 2.63l-4.784 8.106a.82.82 0 00.502 1.21l9.113 2.349a2.168 2.168 0 011.624 2.098v6.773z"
                                                    fill="#846F75"
                                                />
                                                <Path
                                                    d="M38.619 26.697c-.714 0-1.385.278-1.89.783l-5.372 5.372-2.413-2.413a2.655 2.655 0 00-1.89-.782c-.713 0-1.384.278-1.889.782a2.674 2.674 0 000 3.78l4.303 4.302a2.655 2.655 0 001.889.782c.714 0 1.385-.278 1.89-.782l7.26-7.262a2.654 2.654 0 00.784-1.89c0-.714-.278-1.385-.783-1.89a2.657 2.657 0 00-1.89-.782zm.73 3.402l-7.262 7.262c-.385.385-1.076.385-1.46 0l-4.302-4.302a1.033 1.033 0 011.46-1.46l2.992 2.993c.32.32.84.32 1.16 0l5.952-5.952c.39-.39 1.07-.39 1.46 0 .195.195.302.454.302.73 0 .276-.108.535-.303.73z"
                                                    fill="#846F75"
                                                />
                                            </Svg>
                                        </View>
                                        <View style={styles.actionTextWrapper}><Text style={styles.actionText}>Settings</Text></View>
                                    </View>
                                    
                                    <View style={styles.actionIndicator}>
                                        <Svg width={25} height={25} viewBox="0 0 56 56" fill="none" >
                                            <Circle cx={28.08} cy={27.96} r={27.36} fill="#E4E7EA" />
                                            <Path
                                                d="M23.76 17.88l8.64 10.08-8.64 10.08"
                                                stroke="#44577C"
                                                strokeWidth={5.184}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </Svg>
                                    </View>
                                </View>    
                            </TouchableOpacity>

                            <View style={styles.actionDivider}></View>
                            
                            <TouchableOpacity activeOpacity={0.8} onPress={() => onShare('Invite a friend via...', 
                                `Hey, 

Check out Lysts. I use it to create and share wishlists for special celebrations and events with my guests, friends and family.

Get it now on android free. 
                                `, 'Lysts for Android and IOS'
                            )}>
                                <View style={styles.action}>
                                    <View style={styles.actionWrapper}>
                                        <View style={styles.actionIconWrapper}>
                                            <Svg width={30} height={30} viewBox="0 0 66 70" fill="none">
                                                <Path
                                                    d="M65.151 40.743H42.607a.848.848 0 110-1.695H65.15a.848.848 0 110 1.695z"
                                                    fill="#EBE7F2"
                                                />
                                                <Path
                                                    d="M33.842 39.948a11.024 11.024 0 003.674-8.241c0-6.101-4.963-11.065-11.064-11.065a.848.848 0 100 1.696c5.166 0 9.369 4.203 9.369 9.369a9.34 9.34 0 01-5.085 8.334.848.848 0 00.389 1.601h2.574c5.493 0 9.963 4.47 9.963 9.963v15.903H9.242V51.605c0-5.493 4.47-9.963 9.964-9.963h2.574a.848.848 0 00.389-1.601 9.34 9.34 0 01-5.085-8.334c0-1.154.206-2.28.615-3.348a.848.848 0 00-1.583-.606 11.017 11.017 0 00-.728 3.953c0 3.202 1.362 6.173 3.675 8.241-6.363.077-11.516 5.277-11.516 11.658v16.75c0 .469.38.848.848.848H44.51c.468 0 .847-.38.847-.847V51.605c0-6.38-5.153-11.58-11.515-11.657zM54.484 19.306a11.023 11.023 0 003.675-8.242C58.159 4.964 53.195 0 47.094 0c-6.1 0-11.064 4.964-11.064 11.064 0 3.202 1.361 6.173 3.675 8.242-1.36.016-2.69.264-3.955.74a.847.847 0 10.596 1.587A9.928 9.928 0 0139.848 21h2.575a.848.848 0 00.388-1.601 9.341 9.341 0 01-5.085-8.335c0-5.165 4.203-9.368 9.369-9.368 5.166 0 9.369 4.203 9.369 9.369a9.34 9.34 0 01-5.085 8.334.848.848 0 00.388 1.601h2.575c5.493 0 9.963 4.47 9.963 9.963v15.903H49.49a.848.848 0 100 1.696h15.663c.468 0 .847-.38.847-.848V30.963c0-6.381-5.153-11.581-11.516-11.657zM16.106 18.519a.848.848 0 100 1.696h4.53a.848.848 0 100-1.696h-4.53zM12.392 20.215a.848.848 0 100-1.696H7.588a.848.848 0 100 1.696h4.804zM19.414 14.545c0 .468.38.847.848.847h2.186a.848.848 0 100-1.695h-2.186a.848.848 0 00-.848.848zM7.588 15.392h8.96a.848.848 0 100-1.695h-8.96a.848.848 0 100 1.695zM7.588 10.572H20.19a.848.848 0 100-1.696H7.588a.848.848 0 100 1.696z"
                                                    fill="#846F75"
                                                />
                                                <Path
                                                    d="M31.186 63.35c-.343 0-.684-.108-.982-.325l-3.766-2.737-3.737 2.737a1.647 1.647 0 01-1.965 0 1.646 1.646 0 01-.607-1.869l1.439-4.427-3.757-2.709a1.646 1.646 0 01-.607-1.868 1.646 1.646 0 011.59-1.154h4.654l1.415-4.41a1.646 1.646 0 011.59-1.155c.737 0 1.361.453 1.59 1.154l1.437 4.428 4.632-.017c.737 0 1.361.453 1.589 1.154a1.646 1.646 0 01-.607 1.868l-3.766 2.736 1.448 4.4a1.646 1.646 0 01-.607 1.869c-.3.216-.641.325-.983.325zm-4.734-4.754c.345 0 .688.107.982.32l3.704 2.692-1.415-4.355c-.224-.69.02-1.441.607-1.868l3.705-2.691h-4.58a1.668 1.668 0 01-1.589-1.155l-1.414-4.355-1.416 4.355a1.666 1.666 0 01-1.589 1.154H18.87l3.705 2.692c.587.427.831 1.178.607 1.869l-1.416 4.354 3.705-2.691c.294-.214.638-.32.982-.32zM24.369 31.221a.85.85 0 01-.338-.07l-6.025-2.62a14.512 14.512 0 01-3.524.434C6.497 28.965 0 22.47 0 14.483 0 6.497 6.497 0 14.482 0c7.986 0 14.483 6.497 14.483 14.483 0 4.274-1.848 8.259-5.091 11.02l1.31 4.64a.848.848 0 01-.815 1.078zm-6.294-4.433c.116 0 .23.024.338.07l4.654 2.025-.976-3.453a.849.849 0 01.292-.896 12.722 12.722 0 004.886-10.051c0-7.05-5.736-12.787-12.786-12.787-7.051 0-12.787 5.736-12.787 12.787 0 7.05 5.736 12.787 12.787 12.787 1.135 0 2.268-.152 3.37-.452a.858.858 0 01.222-.03z"
                                                    fill="#ED9ABC"
                                                />
                                            </Svg>
                                        </View>
                                        <View style={styles.actionTextWrapper}><Text style={styles.actionText}>Invite a friend</Text></View>
                                    </View>
                                    
                                    <View style={styles.actionIndicator}>
                                        <Svg width={25} height={25} viewBox="0 0 56 56" fill="none" >
                                            <Circle cx={28.08} cy={27.96} r={27.36} fill="#E4E7EA" />
                                            <Path
                                                d="M23.76 17.88l8.64 10.08-8.64 10.08"
                                                stroke="#44577C"
                                                strokeWidth={5.184}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </Svg>
                                    </View>
                                </View>    
                            </TouchableOpacity>
                            
                        </View> 
                    </Shadow>
                </View>
              </ScrollView>
                
                {this.state.hasNetworkConnection ? null : <NoConnectionAlert />}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    top:{
        backgroundColor:'#F8F3EF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25
    },
    avatar:{
        borderRadius: 1000,
        height: 100,
        width: 100,
        resizeMode: 'cover'
    },
    name:{
        marginTop: 8,
        fontSize: 21,
        fontFamily: 'Poppins-SemiBold',
        color: '#44577C',
        textAlign: 'center'
    },
    button:{
        marginTop: 8,
        borderColor:'#44577C',
        borderWidth: 1.8,
        borderRadius: 1000,
        paddingVertical: 3,
        paddingTop: 4,
        minWidth: 130

    },
    buttonText:{
        textAlign: 'center',
        fontSize:14,
        fontFamily:'Poppins-Medium',
        color: '#44577C',
        textTransform: 'uppercase',
    },
    
    bottom:{
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 30
    },
    actionsWrapperShadow:{
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowColor: "#515D70",
        shadowRadius: 10,
        borderRadius: 20,
        backgroundColor: 'transparent',
        width: dWidth - 50,
        height:410,
        overflow: 'hidden'
    },
    actionsWrapper:{
        // elevation: 3,
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 25,
        borderRadius: 20
    },
    action:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginVertical: 18
        // backgroundColor:'red'
    },
    actionDivider:{
        backgroundColor: '#F3F5F6',
        height: 2,
        marginLeft: 20
    },
    actionWrapper:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    actionIconWrapper:{
        width: 30,
        height: 30,
        // backgroundColor: '#44577C',
        opacity: 0.9,
        marginRight: 20
    },
    actionTextWrapper:{},
    actionText:{
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: 'rgba(68, 87, 124, 0.9)'
    },
    actionIndicator:{}
})

