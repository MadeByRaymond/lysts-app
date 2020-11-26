import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, ImageBackground, TextInput } from 'react-native'
import debounce from 'lodash.debounce';
import { Navigation } from "react-native-navigation";

import ButtonView from '../../UIComponents/Buttons/ButtonWithShadow/floatingButton';
import {goToViewWishlistScreen} from '../../includes/functions';

let dHeight = Dimensions.get("window").height;
let dWidth = Dimensions.get("window").width;

export class Home extends Component {

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
              setNewListAdded: ((boolean, name, code, shareLink) => {this.setState({newListAdded: boolean,
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

    render() {
        return (
            <ImageBackground source={require("../../assets/images/home_bg.png")} style={styles.image}>
                <View style={styles.container}>
                    <ButtonView onPress={() => {this.goToAddScreen()}} floatingViewStyle={{top: dWidth > 575 ? (dHeight - (56 + 56) - 77) : (dHeight - (56 + 56) - 37)}}>Create a wishlist</ButtonView>
                    <View style={styles.titleWrapper}>
                        <View><Text style={styles.title}>Hello there,</Text></View>
                        <View><Text style={styles.title}>Welcome Home!</Text></View>
                    </View>
                    <View style={styles.searchInputContainer}>
                        <TextInput 
                          value={this.state.wishlistCode}
                          onChangeText = {(val) => {
                              let codeValue = val.toUpperCase();
                              this.setState({
                                  wishlistCode: codeValue 
                              })
                          }}
                          onSubmitEditing = {(e) => {
                            goToViewWishlistScreen(this.props.componentId, e.nativeEvent.text)
                          }}
                          style={styles.searchInput} 
                          placeholder="🎁  Enter wishlist code" 
                          placeholderTextColor="rgba(68, 87, 124, 0.4)"  
                          textAlign= 'center'
                          autoCapitalize='characters'
                          maxLength= {9}
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
        paddingHorizontal: 25
    },
    image: {
      flex: 1,
      width: dWidth,
      height: dHeight,
      resizeMode: "cover",
      justifyContent: "center",
      backgroundColor: '#fff'
    },
    titleWrapper:{
        padding: 20,
        paddingTop: 50,
        paddingLeft: 8
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
        maxWidth: dWidth > 575 ? 400 : 250,
        height: 67,
        borderRadius: 12,
        opacity: 0.95,
        backgroundColor: '#F6F6F6',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 13,
        elevation: 5,

        color:'#44577C',
        fontSize: 17,
        fontFamily:'Poppins-Bold'
    }
})

export default Home
