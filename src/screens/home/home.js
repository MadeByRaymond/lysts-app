import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, ImageBackground, TextInput } from 'react-native'
import Realm from 'realm';
import debounce from 'lodash.debounce';
import { Navigation } from "react-native-navigation";

import Header from '../../components/Headers/createWishlistHeader';
import Modal from '../../UIComponents/Modals/DefaultModal'
import ButtonView from '../../UIComponents/Buttons/ButtonWithShadow/floatingButton';
import {goToViewWishlistScreen} from '../../includes/functions';

import {app as realmApp} from '../../../storage/realm';

let dHeight = Dimensions.get("window").height;
let dWidth = Dimensions.get("window").width;

export class Home extends Component {

    user = realmApp.currentUser;
    notLoggedIn = (this.user) ? ((!this.user.isLoggedIn) ? true : false) : true
    notLoggedInAndAnonymous = (this.user) ? ((!this.user.isLoggedIn || this.user.providerType == 'anon-user') ? true : false) : true

    state={
        wishlistCode: ''
    }

    goToAddScreen = debounce(() =>{
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
              setNewListAdded: ((shoNewListModal, name, code, shareLink) => {this.setState({newListAdded: shoNewListModal,
                newListInfoModal:{
                  wishlistName: name,
                  wishListCode: code,
                  shareLink: shareLink
                }})})
            }
          }
        }).then(() => {
            Navigation.mergeOptions(this.props.componentId,{
                bottomTabs: {
                    currentTabIndex: 0
                }
            })
        });
        
      }, 1000, {leading: true,trailing: false})

      handelNewWishlistModal = () => {
        // Navigation.updateProps('PROFILE_SCREEN_ID', {
        //   status: 'offline'
        // });
        return(
          <Modal 
            isVisible={this.state.newListAdded}
            closeFunction = {() => {this.setState({newListAdded: false})}}
            type= 'newWishlist'
            modalTitle='Wishlist created'
            modalSubtitle='Share your wishlist link or list code with friends and family'
            
            newListInfoModal = {this.state.newListInfoModal}
          />
        )
      }

    render() {
        // let userBg = require("../../assets/images/home_bg.png");
        let userBg = {uri: 'home_bg'};
        let guestBg = require("../../assets/images/guest_home_bg.png");
        // switch (notLoggedInAndAnonymous) {
        //     case true:
        //         x = require("../../assets/images/home_bg.png");
        //         break;

        //     case false:
        //         x = require("../../assets/images/signin_bg");
        //         break;
        
        //     default:
        //         x = require("../../assets/images/home_bg.png");
        //         break;
        // }
        
        return (
            <ImageBackground source={this.notLoggedInAndAnonymous ? guestBg : userBg} style={styles.image}>
                <View style={styles.container}>
                    {this.state.newListAdded ? this.handelNewWishlistModal() : null}
                    {this.notLoggedInAndAnonymous ? null : (<ButtonView onPress={() => {this.goToAddScreen()}} floatingViewStyle={{top: dWidth > 575 ? (dHeight - (56 + 56) - 77) : (dHeight - (56 + 56) - 37)}}>Create a wishlist</ButtonView>)}    
                    <View style={[styles.titleWrapper, this.notLoggedInAndAnonymous ? styles.guestTitleWrapper : null]}>
                        {this.notLoggedInAndAnonymous ? (
                            <View style={styles.guestTitle}><Header 
                                text = {'Search \nWishlists'}
                                subText='Sign in to save or bookmark wishlist searches'
                                onPress={() => {Navigation.pop(this.props.componentId);}}
                            /></View>
                        ) : (<View>
                            <View><Text style={styles.title}>Hello there,</Text></View>
                            <View><Text style={styles.title}>Welcome Home!</Text></View>
                        </View>)}
                    </View>
                    <View style={[styles.searchInputContainer, this.notLoggedInAndAnonymous ? {marginTop: 100} : null]}>
                        <TextInput 
                          value={this.state.wishlistCode}
                          onChangeText = {(val) => {
                              let codeValue = val.trimStart().trim().toUpperCase();
                              this.setState({
                                  wishlistCode: codeValue 
                              })
                          }}
                          onSubmitEditing = {(e) => {
                            if(this.notLoggedIn){
                                const credentials = Realm.Credentials.anonymous(); // create an anonymous credential
                                realmApp.logIn(credentials)
                                .then((parsedRes) =>{
                                    console.log(parsedRes);
                                    if(parsedRes.error){
                                        console.log(parsedRes.error); 
                                    }else{
                                        goToViewWishlistScreen(this.props.componentId, e.nativeEvent.text)
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);          
                                })
                            }else{
                                goToViewWishlistScreen(this.props.componentId, e.nativeEvent.text)
                            }
                            
                          }}
                          style={[styles.searchInput, this.state.wishlistCode.trim() !== '' ? {paddingTop: 20,} : null]} 
                          placeholder="🎁  Enter wishlist code" 
                          placeholderTextColor="rgba(68, 87, 124, 0.4)"  
                          textAlign= 'center'
                          autoCapitalize='characters'
                          maxLength= {6}
                          returnKeyType = 'search'
                        />
                    </View>
                </View>
            </ImageBackground>
        )
    }
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

export default Home
