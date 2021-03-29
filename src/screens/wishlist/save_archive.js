import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {Navigation} from 'react-native-navigation';
import NetInfo from "@react-native-community/netinfo";

import {noSaved, noArchive, noInternet} from '../../SVG_Files/UI_SVG/errors';
import ErrorView from '../../components/Errors/errorView';
import NavHeader from '../../components/Headers/profileNavHeader';
import ErrorSuccessAlert from '../../components/Alerts/ErrorSuccess/errorSuccessAlert';
import NoConnectionAlert from '../../components/Alerts/noConnection/noConnectionAlert';

import {goToViewWishlistScreen} from '../../includes/functions';
import ListView from '../../components/wishlistList/wishlistList';
import * as Fade from '../../UIComponents/GradientFade/gradientFade';
import Loader from '../../components/Loader/loader';
import { dHeight, mongoClientCluster } from '../../includes/variables';

import {app as realmApp} from '../../../storage/realm';
import {WishlistSchemas} from '../../../storage/schemas';

let prevComponentId;

export default class save_archive extends Component {
    // Class Variables
    realm;
    user = realmApp.currentUser;
    timeoutAlert;
    unsubscribeNetworkUpdate;

    state ={
      isArchive : this.props.show == 'archive' ? true : false,
      isSaved : this.props.show == 'saved' ? true : false,
      hasNetworkConnection: true,
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
        // console.log("Connection type", state.type);
        // console.log("Is connected?", state.isConnected);
        this.setState({hasNetworkConnection: state.isConnected});
        
      });

      prevComponentId = global.activeComponentId;
      global.activeComponentId = this.props.componentId;
    }

    componentWillUnmount() {
      global.activeComponentId = prevComponentId;

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
              (code, value) => {
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
            }

            saveWishlistError = {() => {this.setState({
              alertMessage: {
                show: true,
                type: 'error',
                title: 'Error Saving Wishlist',
                subtitle: ''
              }
            })}}
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
      </View>
      )
    }

    getWishlistsFromRealm = async () => {
      try {
        let wishlistData = [];
        let ownerData = [];

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
          });

          // let wishlistFilters = filter.trim() == "" ? "" : `&& (${filter})`;

          wishlistData = savedWishlists.length < 1 ? [] : this.realm.objects("wishlist").filtered(`status == 'active' && (${filter})`).sorted("dateCreated", true);

          if(wishlistData.length > 0){
            wishlistData.forEach((val,i) => {
              ownersFilter.push({userID : val.owner})
            });

            let ownerDataTemp = await this.user.mongoClient(mongoClientCluster).db("lysts").collection("users").find({
              $or: ownersFilter
            })

            ownerData = JSON.parse(JSON.stringify(ownerDataTemp));
          }
        }  else{
          wishlistData = [];
        }    
            
        if (wishlistData.length < 1) { 
          listData = [];
        } else {
          
          for (const val of wishlistData) {
            let ownerName = '';
            ownerData.forEach(user => {
              if (user.userID == val.owner){
                ownerName = (
                  (typeof user.displayName == 'undefined' || user.displayName == null || user.displayName.trim() == "") 
                  ? user.fullName.trim().trimStart() : user.displayName.trim().trimStart());
              }
            })

            listData.push({
              id: val._id,
              name: val.name,
              type: val.category,
              code: val.code,
              owner: this.state.isSaved ? ownerName : this.user.id,
              saved: this.user.customData.savedLists.includes(val.code)
            });
          }
          
        }
    
        this.setState({
          isLoading: false,
          silentReload: false,
          listData
        })
        
      } catch (error) {
          throw error;
      }
    }

    getWishlists = async() => {
      try{        
        const config = {
          schema: [
            WishlistSchemas.wishlistSchema,
            WishlistSchemas.wishlist_listItemsSchema
          ],
          sync: {
            user: this.user,
            partitionValue: "public",
            error: (s, e) => {
              this.setState({
                isLoading: false, 
                silentReload: false,
                alertMessage: {
                    show: true,
                    type: 'warning',
                    title: 'Oops! Error Syncing With Server...',
                    subtitle: 'Kindly check your network connection'
                }
              });
            }
          },
        };
        

        if(this.realm != null && !this.realm.isClosed){
          // await this.getWishlistsFromRealm();
        }else{
          this.realm = await Realm.open(config);
          await this.getWishlistsFromRealm();
        }
        
      } catch (error) {
        console.log(error);
        this.setState({
          isLoading: false, 
          silentReload: false,
          alertMessage: {
              show: true,
              type: 'error',
              title: 'Couldn\'t Sync With Server...',
              subtitle: 'Kindly check your network connection'
          }
        });   
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
                {this.state.hasNetworkConnection ? null : <NoConnectionAlert />}
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
