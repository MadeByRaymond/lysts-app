import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Svg, { Rect, Circle } from "react-native-svg"
import {Navigation} from 'react-native-navigation';

import {goToViewWishlistScreen} from '../../includes/functions';
import ListView from '../../components/wishlistList/wishlistList';
import * as Fade from '../../UIComponents/GradientFade/gradientFade';
import { Touchable } from '../../includes/variables';

import {app as realmApp} from '../../../storage/realm';
import {WishlistSchemas, UserSchemas} from '../../../storage/schemas';

// import PushNotificationIOS from "@react-native-community/push-notification-ios";
// import PushNotification from "react-native-push-notification";

export default class save_archive extends Component {
    // Class Variables
    realm;
    user = realmApp.currentUser;

    state ={
      isArchive : this.props.show == 'archive' ? true : false,
      isSaved : this.props.show == 'saved' ? true : false,
      isLoading : true,
      listData: [
            // {
            //   id: '1233',
            //   name: 'Raymond’s Ultimate House Warming List',
            //   type: 'Graduation',
            //   owner: 'Dora Patsone',
            //   saved: true,
            // },
            // {
            //   id: '1234',
            //   name: 'Cute and Cuddly',
            //   type: 'Birthday',
            //   owner: 'Daisy Oh',
            //   saved: true,
            // },
            // {
            //   id: '1235',
            //   name: 'Raymond’s Ultimate House Warming List',
            //   type: 'job_promotion',
            //   owner: 'Nicky Patsone',
            //   saved: false,
            // },
            // {
            //   id: '1236',
            //   name: 'Christ Birthday',
            //   type: 'christmas',
            //   owner: 'Paul Micca',
            //   saved: true,
            // },
            // {
            //   id: '1237',
            //   name: 'Raymond’s Ultimate House Warming List',
            //   type: 'father0s_day',
            //   owner: 'Dora Patsone',
            //   saved: false,
            // },
            // {
            //   id: '1238',
            //   name: 'Raymond’s Ultimate House Warming List',
            //   type: 'house_warming',
            //   owner: 'Dora Patsone',
            //   saved: false,
            // },
            // {
            //   id: '1239',
            //   name: 'Raymond’s Ultimate House Warming List',
            //   type: 'house_warming',
            //   owner: 'Dora Patsone',
            //   saved: false,
            // },
            // {
            //   id: '1240',
            //   name: 'Raymond’s Ultimate House Warming List',
            //   type: 'house_warming',
            //   owner: 'Dora Patsone',
            //   saved: false,
            // },
            // {
            //   id: '12389',
            //   name: 'Raymond’s Ultimate House Warming List',
            //   type: 'house_warming',
            //   owner: 'Dora Patsone',
            //   saved: false,
            // },
            // {
            //   id: '12388',
            //   name: 'Raymond’s Ultimate House Warming List',
            //   type: 'house_warming',
            //   owner: 'Dora Patsone',
            //   saved: false,
            // }
          ]
    }

    

    renderItemsList = () =>{
        return (
          <ListView 
            listAction={(id, saveStatus) => goToViewWishlistScreen(this.props.componentId,id,saveStatus)} 
            renderType= {this.state.isArchive ? 'portrait' : this.state.isSaved ? 'horizontal' : 'portrait'}
            renderData={this.state.listData} 
            onRefresh = {this.getWishlists}
            refreshing = {this.state.isLoading}

          />
        )
    }

    renderNoItems = () => {
      let isArchiveSVG = (<Text>is Archive</Text>);
      let isSavedSVG = (<Text>is Saved</Text>);
      return this.state.isArchive ? isArchiveSVG : this.state.isSaved ? isSavedSVG : null
    }

    renderHeaderSVG = () => {
      // alert(this.state.isArchive)
      return (
        <Svg width={((159*60)/115)} height={60} viewBox="0 0 159 115" fill="none">
          <Rect
            opacity={0.4}
            x={0.666}
            y={20.862}
            width={95.04}
            height={95.04}
            rx={14.4}
            transform="rotate(-12.375 .666 20.862)"
            fill= {this.state.isArchive ? '#E76666' : this.state.isSaved ? "#28A664" : "#E76666"}
          />
          <Circle opacity={0.44} cx={111.16} cy={66.76} r={47.52} fill={this.state.isArchive ? '#28A664' : this.state.isSaved ? "#214BC0" : "#28A664"} />
        </Svg>
      )
    }

    loadingItems = () => {
      return(
        <View><Text>Loading ....</Text>{this.getWishlists()}</View>
      )
    }

    getWishlistsFromRealm = () => {
      
      let wishlistData = [];
      let ownerData = [];
      

      // for (const value of temp) {
      //   filter = filter + `code == '${value}'`
      // }

      let listData = [];
      if (this.state.isArchive){
        wishlistData = this.realm.objects("wishlist").filtered(`owner == '${this.user.id}' && status == 'inactive'`).sorted("dateModified", true);
      }else if(this.state.isSaved){
        let savedWishlists = this.user.customData.savedLists
        let filter = "status == 'inactive'";
        let ownersFilter = "";

        savedWishlists.forEach((val, i) =>{
          if (i == 0){
            filter = `code == '${val}'`
          }else{
            filter = filter + ` || code == '${val}'`
          }
        })
        wishlistData = this.realm.objects("wishlist").filtered(`${filter}`).sorted("dateCreated", true);
        // console.log(wishlistData.length);
        if(wishlistData.length > 0){
          wishlistData.forEach((val,i) => {
            if (i == 0){
              ownersFilter = `userID == '${val.owner}'`
            }else{
              ownersFilter = ownersFilter + ` || userID == '${val.owner}'`
            }
          })
          // console.log(ownersFilter);
          ownerData = this.realm.objects("user").filtered(ownersFilter);
        }
        // ownerData = this.realm.objects("user").filtered(`userID == '${wishlistData[0].owner}'`);
      }  else{
        wishlistData = [];
      }    
          
      console.log(wishlistData);
      if (wishlistData.length < 1) { 
        listData = [];
      } 
      else {
        
        for (const val of wishlistData) {
          let ownerName = '';
          console.log(ownerData);
          ownerData.forEach(user => {
            if (user.userID == val.owner){
              ownerName = (
                (user.displayName == undefined || user.displayName == null || user.displayName.trim() == "") 
                ? user.fullName.trim().trimStart() : user.displayName.trim().trimStart());
              // break;
            }
          })

          listData.push({
            id: val._id,
            name: val.name,
            type: val.category,
            code: val.code,
            owner: this.state.isSaved ? ownerName : this.user.id,
            saved: this.user.customData.savedLists.includes(val.code)
          })
        }
        
      }
  
      this.setState({
        isLoading: false,
        silentReload: false,
        listData
      })
    }

    getWishlists = (checkIfLoading = true) => {
      try{
        console.log(`Logged in with the user: ${this.user.id}`);        
        
        const config = {
          schema: [
            WishlistSchemas.wishlistSchema,
            WishlistSchemas.wishlist_listItemsSchema,
            UserSchemas.userSchema,
            UserSchemas.user_settingsSchema,
            UserSchemas.user_settings_notificationSchema
          ],
          sync: {
            user: this.user,
            partitionValue: "public",
            error: (s, e) => {console.log(`An error occurred with sync session with details: \n${s} \n\nError Details: \n${e}`);}
          },
        };
        
        console.log("log step 2");
      //   realm = await Realm.open(config);
      if(this.realm != null && !this.realm.isClosed){
        this.getWishlistsFromRealm();
      }else{
        Realm.open(config).then((realm) => {
          console.log("log step 3/5");
          this.realm = realm;
          this.getWishlistsFromRealm();
          
      //   console.log(datas);
          console.log("log step 3");
        }).catch((e) => {
          console.log(e);
        }).finally(() => {
          // if (Realm !== null && !Realm.) {
          //     // Real.close();
          //   }
        });
      }
        
      } catch (error) {
          throw `Error opening realm: ${JSON.stringify(error,null,2)}`;
          
      }
    }

    render() {
        let whatToRender = (this.state.isLoading  
          ? (this.loadingItems()) 
          : (this.state.listData.length == 0 ? this.renderNoItems() : this.renderItemsList()));
        
        
        return (
            <View style={styles.container}>
                <View style={styles.headerWrapper}>
                    <TouchableOpacity onPress={this.testNotification}>
                    <View style={styles.headerSVGWrapper}>
                      {this.renderHeaderSVG()}
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {Navigation.popToRoot(this.props.componentId);}}>
                      <View style={styles.profileWrapper}>
                        <View style={styles.profileAvatarWrapper}><Image style={styles.profileAvatar} source={require('../../assets/images/avatars/avatar1.png')} /></View>
                        <View style={styles.profileTextWrapper}><Text style={styles.profileText}>Profile</Text></View>
                      </View>
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.titleWrapper}><Text style={styles.title}>{this.state.isArchive ? 'Archived Lists' : this.state.isSaved ? 'My saved wishlists' : null} {this.state.listData.length == 0 ? null : `(${this.state.listData.length})`}</Text></View>
                <View style={styles.listWrapper}>
                  <Fade.Top color='#FCFCFC' style={{height: 40}} />
                  <Fade.Bottom color='#FCFCFC' />
                    {whatToRender}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1A2C34',
        backgroundColor: '#FCFCFC'
    },
    headerWrapper:{
      paddingHorizontal: 25,
      paddingTop: 20,
      flexDirection: 'row',
      justifyContent:'space-between',
    },
    headerSVGWrapper:{},
    profileWrapper:{
      alignItems: 'center'
    },
    profileAvatarWrapper:{
      
    },
    profileAvatar:{
      resizeMode: 'cover',
      height: 60,
      width: 60,
      borderRadius: 1000
    },
    profileTextWrapper:{},
    profileText:{
      color:'#515D70',
      fontSize: 13,
      fontFamily: 'Poppins-Medium',
      marginTop: 3
    },
    titleWrapper:{},
    title:{
      paddingHorizontal: 25,
      paddingTop: 10,
      paddingBottom: 3,
      color: '#515D70',
      fontSize: 15,
      fontFamily: 'Poppins-Medium'
    },
    listWrapper:{
      flex: 1
    }
})
