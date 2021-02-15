import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, ImageBackground, TextInput } from 'react-native'
import Realm from 'realm';
import debounce from 'lodash.debounce';
import { Navigation } from "react-native-navigation";
import NetInfo from "@react-native-community/netinfo";

import Header from '../../components/Headers/createWishlistHeader';
import Modal from '../../UIComponents/Modals/DefaultModal'
import ButtonView from '../../UIComponents/Buttons/ButtonWithShadow/floatingButton';
import NoConnectionAlert from '../../components/Alerts/noConnection/noConnectionAlert';
import {goToViewWishlistScreen} from '../../includes/functions';
import {dHeight, dWidth} from '../../includes/variables';

import {app as realmApp} from '../../../storage/realm';

let userBg = {uri: 'home_bg'};
let guestBg = require("../../assets/images/guest_home_bg.png");

let user = realmApp.currentUser;
let notLoggedIn = (user) ? ((!user.isLoggedIn) ? true : false) : true
let notLoggedInAndAnonymous = (user) ? ((!user.isLoggedIn || user.providerType == 'anon-user') ? true : false) : true

let unsubscribeNetworkUpdate;

let goToAddScreen = debounce((componentId,setNewListAdded) =>{
    // alert('ddd')
    Navigation.push('WISHLIST_SCREEN', {
      component: {
        name: 'com.lysts.screen.selectCategory', // Push the screen registered with the 'Settings' key
        options: { // Optional options object to configure the screen
          bottomTabs: {
            animate: false,
            visible: false
          },
        },
        passProps: {
          setNewListAdded: ((showNewListModal, name, code, shareLink) => {
            setNewListAdded({
                newListAdded: showNewListModal,
                newListInfoModal:{
                    wishlistName: name,
                    wishListCode: code,
                    shareLink: shareLink
                }
            })
          })
        }
      }
    }).then(() => {
        Navigation.mergeOptions(componentId,{
            bottomTabs: {
                currentTabIndex: 0
            }
        })
    });
    
}, 1000, {leading: true,trailing: false})

let handelNewWishlistModal = (newListAdded,setNewListAdded) => {
    // Navigation.updateProps('PROFILE_SCREEN_ID', {
    //   status: 'offline'
    // });
    return(
      <Modal 
        isVisible={newListAdded.newListAdded}
        closeFunction = {() => setNewListAdded({newListAdded: false})}
        type= 'newWishlist'
        modalTitle='Wishlist created'
        modalSubtitle='Share your wishlist link or list code with friends and family'
        
        newListInfoModal = {newListAdded.newListInfoModal}
      />
    )
}

export default function home(props) {
    const [newListAdded, setNewListAdded] = useState({newListAdded:false})
    const [wishlistCode, setWishlistCode] = useState('')
    const [hasNetworkConnection, setHasNetworkConnection] = useState(true)

    useEffect(() => {
        unsubscribeNetworkUpdate = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            setHasNetworkConnection(state.isConnected);
        });
        return () => {
            unsubscribeNetworkUpdate();
        };
    }, []);

    return (
        <ImageBackground source={notLoggedInAndAnonymous ? guestBg : userBg} style={styles.image}>
            <View style={styles.container}>
                {newListAdded.newListAdded ? handelNewWishlistModal(newListAdded,setNewListAdded) : null}
                {hasNetworkConnection 
                  ? notLoggedInAndAnonymous ? null : (<ButtonView onPress={() => {goToAddScreen(props.componentId,setNewListAdded)}} floatingViewStyle={{top: dWidth > 575 ? (dHeight - (56 + 56) - 77) : (dHeight - (56 + 56) - 37)}}>Create a wishlist</ButtonView>)
                  : <NoConnectionAlert />
                }    
                <View style={[styles.titleWrapper, notLoggedInAndAnonymous ? styles.guestTitleWrapper : null]}>
                    {notLoggedInAndAnonymous ? (
                        <View style={styles.guestTitle}><Header 
                            text = {'Search \nWishlists'}
                            subText='Sign in to save or bookmark wishlist searches'
                            onPress={() => {Navigation.pop(props.componentId);}}
                        /></View>
                    ) : (<View>
                        <View><Text style={styles.title}>Hello there,</Text></View>
                        <View><Text style={styles.title}>Welcome Home!</Text></View>
                    </View>)}
                </View>
                <View style={[styles.searchInputContainer, notLoggedInAndAnonymous ? {marginTop: 100} : null]}>
                    <TextInput 
                      value={wishlistCode}
                      onChangeText = {(val) => {
                          setWishlistCode(val.trimStart().trim().toUpperCase())
                      }}
                      onSubmitEditing = {(e) => {
                        if(notLoggedIn){
                            realmApp.logIn(Realm.Credentials.anonymous())// logs in with an anonymous credential
                            .then((parsedRes) =>{
                                // console.log(parsedRes);
                                if(parsedRes.error){
                                    console.log(parsedRes.error); 
                                }else{
                                    goToViewWishlistScreen(props.componentId, e.nativeEvent.text)
                                }
                            })
                            .catch((error) => {
                                console.log(error);          
                            })
                        }else{
                            goToViewWishlistScreen(props.componentId, e.nativeEvent.text)
                        }
                        
                      }}
                      style={[styles.searchInput, wishlistCode.trim() !== '' ? {paddingTop: 20,} : null]} 
                      placeholder="🎁  Enter wishlist code" 
                      placeholderTextColor="rgba(68, 87, 124, 0.4)"  
                      textAlign= 'center'
                      autoCapitalize='characters'
                      maxLength= {6}
                      returnKeyType = 'search'
                    />
                </View>
                { hasNetworkConnection ? null : <View style={{flex:1, position: 'absolute', width:dWidth, height: dHeight, backgroundColor:'rgba(0, 0, 0, 0.05);', zIndex:999}}></View>}
            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: dHeight,
        width: dWidth,
        paddingHorizontal: 25,
        position: 'relative'
    },
    image: {
      flex: 1,
      width: dWidth,
      height: dHeight,
      resizeMode: "cover",
      justifyContent: "center",
      backgroundColor: '#fff'
      //Darkmode Background backgroundColor: '#263238',
    },
    titleWrapper:{
        padding: 20,
        paddingTop: 50,
        paddingLeft: 8
    },
    guestTitleWrapper:{
        padding: 0,
        paddingTop: 0,
        paddingLeft: 0,
        // marginHorizontal: -25,
        position:'absolute',
        left: 0,
        // backgroundColor: 'red',
        width: dWidth
    },
    guestTitle:{

    },
    title:{
        fontSize: dWidth > 575 ? 40 : 30,
        fontFamily: 'Poppins-SemiBold',
        color:'#515D70',
        lineHeight: dWidth > 575 ? 50 : 40
    },
    searchInputContainer:{
        flex: 1,
        width: '100%',
        height: dHeight,
        marginTop: -60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchInput:{
        width: '100%',
        maxWidth: dWidth > 575 ? 400 : 270,
        // height: 67,
        borderRadius: 12,
        opacity: 0.92,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 13,
        elevation: 3,

        color:'#44577C',
        fontSize: 17,
        fontFamily:'Poppins-Bold',
        paddingVertical: 20,
        paddingTop: 25
    }
})