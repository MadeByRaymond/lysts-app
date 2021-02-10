import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Svg, { Rect, Circle } from "react-native-svg"
import {Navigation} from 'react-native-navigation';
import LottieView from 'lottie-react-native';
import NetInfo from "@react-native-community/netinfo";

import {noSaved, noArchive, noInternet} from '../../SVG_Files/UI_SVG/errors';
import ErrorView from '../../components/Errors/errorView';
import NavHeader from '../../components/Headers/profileNavHeader';
import ErrorSuccessAlert from '../../components/Alerts/ErrorSuccess/errorSuccessAlert';

import {goToViewWishlistScreen} from '../../includes/functions';
import ListView from '../../components/wishlistList/wishlistList';
import * as Fade from '../../UIComponents/GradientFade/gradientFade';
import Loader from '../../components/Loader/loader'
import { dHeight, Touchable } from '../../includes/variables';

import {app as realmApp} from '../../../storage/realm';
import {WishlistSchemas, UserSchemas} from '../../../storage/schemas';

// import PushNotificationIOS from "@react-native-community/push-notification-ios";
// import PushNotification from "react-native-push-notification";

export default class save_archive extends Component {
    // Class Variables
    realm;
    user = realmApp.currentUser;
    timeoutAlert;
    unsubscribeNetworkUpdate;

    state ={
      isArchive : this.props.show == 'archive' ? true : false,
      isSaved : this.props.show == 'saved' ? true : false,
      hasNetworkConnection: null,
      isLoading : true,
      silentReload: false,
      listData: [
            // {
            //   id: '1233',
            //   name: 'Raymond’s Ultimate House Warming List',
            //   type: 'Graduation',
            //   owner: 'Dora Patsone',
            //   saved: true,
            // }
      ], 
      alertMessage:{
        show:false, 
        type:'',
        title:'',
        subtitle: ''
      }
    }

    componentDidMount(){
      this.unsubscribeNetworkUpdate = NetInfo.addEventListener(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        this.setState({hasNetworkConnection: state.isConnected});
        
      });
    }

    componentWillUnmount(){
      this.unsubscribeNetworkUpdate();
      clearTimeout(this.timeoutAlert);
    }

    

    renderItemsList = () =>{
        return (
          <ListView 
            listAction={(id, saveStatus) => goToViewWishlistScreen(this.props.componentId,id,saveStatus,(showAlertInfo={showAlert:false,type:'', message:''}) => { 
                this.setState({
                  silentReload: true, 
                  alertMessage:{
                    show:showAlertInfo.showAlert, 
                    type:showAlertInfo.type,
                    title:showAlertInfo.message,
                    subtitle: ''
                  }
                })
              }
            )} 
            renderType= {this.state.isSaved ? 'horizontal' : 'portrait'}
            renderData={this.state.listData} 
            onRefresh = {this.getWishlists}
            refreshing = {this.state.isLoading}
            savingInProgress = {(code)=>{
              this.setState((prevState) => {
                return ({
                  listData: prevState.listData.map((item) => {
                    if (item.code == code){
                      return {
                        ...item,
                        saved : null
                      }
                    }else{
                      return item
                    }
                  })
                }) 
              })
            }}
            updateUIFunction = {
              this.state.isSaved 
              ? (code, value) => {
                this.setState((prevState) => {
                  return ({
                    listData: prevState.listData.map((item, i) => {
                      if (item.code == code){
                        return {
                          ...item,
                          saved : value
                        }
                      }else{
                        return item
                      }
                    })
                  }) 
                })
              }
              : () => {this.setState({silentReload: true})} 
            }
          />
        )
    }

    renderNoItems = () => {
      let isArchiveSVG = (<ErrorView message={"Your archive is empty"} svg={noArchive} contentWrapperStyle={{justifyContent: 'flex-start', marginTop: (dHeight/10)}} />);
      let isSavedSVG = (<ErrorView message={"You haven't saved any\nwishlists yet"} svg={noSaved} contentWrapperStyle={{justifyContent: 'flex-start', marginTop: (dHeight/10)}} />);
      return this.state.isArchive ? isArchiveSVG : this.state.isSaved ? isSavedSVG : null
    }

    loadingItems = () => {
      this.getWishlists()
      return(
        <View style={{
          flex: 1,
          justifyContent: "center",
          marginTop: -90
      }}>
          <Loader lottieViewStyle={{opacity:0.9}} />
          {/* {this.getWishlists()} */}
      </View>
      )
    }

    getWishlistsFromRealm = async () => {
      
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
        let filter = "";
        let ownersFilter = [];

        savedWishlists.forEach((val, i) =>{
          if (i == 0){
            filter = `code == '${val}'`
          }else{
            filter = filter + ` || code == '${val}'`
          }
        })
        wishlistData = this.realm.objects("wishlist").filtered(`${filter} && status == 'active'`).sorted("dateCreated", true);
        // console.log(wishlistData.length);
        if(wishlistData.length > 0){
          wishlistData.forEach((val,i) => {
            ownersFilter.push({userID : val.owner})
            // if (i == 0){
            //   ownersFilter.push({userID : val.owner})
            //   ownersFilter = `userID == '${val.owner}'`
            // }else{
            //   ownersFilter = ownersFilter + ` || userID == '${val.owner}'`
            // }
          })
          // console.log(ownersFilter);
          console.log('aaaaa');
          let ownerDataTemp = await this.user.mongoClient("MongoDB-Atlas-mylystsapp-wishlists").db("lysts").collection("users").find({
            $or: ownersFilter
          })
          // ownerData = this.realm.objects('user').filtered(ownersFilter);
          ownerData = JSON.parse(JSON.stringify(ownerDataTemp));
          console.log('bbbbb ==> ', ownerData);
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
          // console.log("ownerData");
          ownerData.forEach(user => {
            console.log('userID ==>',user.userID);
            console.log('owner ==>',val.owner);
            if (user.userID == val.owner){
              ownerName = (
                (typeof user.displayName == 'undefined' || user.displayName == null || user.displayName.trim() == "") 
                ? user.fullName.trim().trimStart() : user.displayName.trim().trimStart());

                // console.log('ownerName ==>',ownerName);
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

          console.log('List Data ==> ', listData);
        }
        
      }
  
      this.setState({
        isLoading: false,
        silentReload: false,
        listData
      })
    }

    getWishlists = async() => {
      // console.log("uuuu");
      // return null;
      try{
        console.log(`Logged in with the user: ${this.user.id}`);  
        let schemaList = (
        // this.state.isSaved 
        // ? [
        //   WishlistSchemas.wishlistSchema,
        //   WishlistSchemas.wishlist_listItemsSchema,
        //   UserSchemas.userSchema,
        //   UserSchemas.user_avatarFeaturesSchema,
        //   UserSchemas.user_settingsSchema,
        //   UserSchemas.user_settings_notificationSchema,
        // ] 
        // : 
        [
          WishlistSchemas.wishlistSchema,
          WishlistSchemas.wishlist_listItemsSchema
        ]  )    
        // console.log(schemaList);
        const config = {
          schema: schemaList,
          sync: {
            user: this.user,
            partitionValue: "public",
            error: (s, e) => {
              this.setState({
                isLoading: false,
                silentReload: false
              }, () => { console.log(`An error occurred with sync session with details: \n${s} \n\nError Details: \n${e}`);})
            }
          },
        };
        
        console.log("log step 2");
        // realm = await Realm.open(config);
      if(this.realm != null && !this.realm.isClosed){
        console.log('hhhh:', this.realm.schema);
        await this.getWishlistsFromRealm();
      }else{
        console.log("log step 2/5");
        this.realm = await Realm.open(config)
        console.log("log step 3/5");
        console.log('hhhh:', this.realm.schema);
        await this.getWishlistsFromRealm();
        console.log("log step 3");
      //   Realm.open(config).then((realm) => {
      //     console.log("log step 3/5");
      //     console.log('hhhh:', realm.schema);
      //     this.realm = realm;
      //     // return this.getWishlistsFromRealm();
          
      // //   console.log(datas);
      //     // console.log("log step 3");
      //   }).then(() => {
      //     console.log("log step 3");
      //   }).catch((e) => {
      //     this.setState({
      //       isLoading: false,
      //       silentReload: false
      //     }, () => {console.log(e);})
      //   }).finally(() => {
      //     // if (Realm !== null && !Realm.) {
      //     //     // Real.close();
      //     //   }
      //   });
      }
        
      } catch (error) {
        this.setState({
          isLoading: false,
          silentReload: false
        }, () => { throw `Error opening realm: ${JSON.stringify(error,null,2)}`;})
         
          
      }
    }

    resetAlert = () => {
      this.timeoutAlert = setTimeout(()=>{
          this.setState({alertMessage: {show: false}})
          clearTimeout(this.timeoutAlert);
      }, 4500)
    }

    render() {
        let whatToRender = ((!this.state.hasNetworkConnection && this.state.listData.length == 0)
          ? <ErrorView message="No Internet Connection" svg={noInternet} contentWrapperStyle={{justifyContent: 'flex-start', marginTop: (dHeight/10)}} />
          : this.state.isLoading  
          ? (this.loadingItems()) 
          : (this.state.listData.length == 0 ? this.renderNoItems() : this.renderItemsList()));
        
        this.state.silentReload ? this.getWishlists() : null;

        this.state.alertMessage.show ? this.resetAlert() : null;

        return (
            <View style={styles.container}>
                <NavHeader 
                  onPressFunc={()=>{Navigation.popToRoot(this.props.componentId)}}
                  avatarImage = {this.props.avatarImage}
                  theme = {this.state.isArchive ? 'Theme1' : 'Theme2'}
                />
                <View style={styles.titleWrapper}><Text style={styles.title}>{this.state.isArchive ? 'Archived Lists' : this.state.isSaved ? 'My saved wishlists' : null} {this.state.listData.length == 0 ? null : `(${this.state.listData.length})`}</Text></View>
                <View style={styles.listWrapper}>
                  <Fade.Top color='#FCFCFC' style={{height: 40}} />
                  <Fade.Bottom color='#FCFCFC' />
                    {whatToRender}
                </View>
                {this.state.alertMessage.show ? (<ErrorSuccessAlert 
                    type = {this.state.alertMessage.type}
                    title = {this.state.alertMessage.title}
                    subtitle = {this.state.alertMessage.subtitle}
                /> )
                : null}
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
