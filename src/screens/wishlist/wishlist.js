import React, {Component} from 'react';
import Realm from 'realm';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import {message} from '../../services/FCMService';

import {app as realmApp} from '../../../storage/realm';
import {WishlistSchemas} from '../../../storage/schemas';

import FabView from '../../UIComponents/Buttons/FabButton/fabButton';
import NoConnectionAlert from '../../components/Alerts/noConnection/noConnectionAlert';
import ListView from '../../components/wishlistList/wishlistList';
import ErrorSuccessAlert from '../../components/Alerts/ErrorSuccess/errorSuccessAlert';
import Modal from '../../UIComponents/Modals/DefaultModal'
import {noInternet, noWishlist} from '../../SVG_Files/UI_SVG/errors';
import ErrorView from '../../components/Errors/errorView';
import {dWidth, dHeight} from '../../includes/variables';
import {goToViewWishlistScreen, goToScreen} from '../../includes/functions';
import Loader from '../../components/Loader/loader';

let prevComponentId;

export default class Wishlist extends Component {

  // Class Variables
  realm;
  user = realmApp.currentUser;
  unsubscribeNetworkUpdate;
  timeoutAlert;
  
  animatableView = ref => this.animatableView = ref;

  state = {
    isLoading: true,
    hasNetworkConnection: true,
    silentReload: false,
    newListAdded: false,
    newListInfoModal:{      
      shareLink: '',
      wishlistName: '',
      wishListCode: ''
    },
    listData: [
      // {
      //   id: '1233',
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'Graduation',
      //   saved: true,
      // }
    ],
    alertMessage:{show:false, type:'',title:'',subtitle:''}
  }

  componentDidMount(){
    this.unsubscribeNetworkUpdate = NetInfo.addEventListener(state => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
      this.setState({hasNetworkConnection: state.isConnected});
    });

    this.user.customData.settings.notification.appUpdates ? message.subscribeToTopic('app_updates') : message.unsubscribeFromTopic('app_updates')
    this.user.customData.settings.notification.systemNotifications ? message.subscribeToTopic('general') : message.unsubscribeFromTopic('general')

    prevComponentId = global.activeComponentId;
    global.activeComponentId = this.props.componentId;
    
    if (typeof global.launchWithCode == 'string' && global.launchWithCode.trim().length == 6) {
      goToViewWishlistScreen(
        this.props.componentId,
        global.launchWithCode,
        false,
        (showAlertInfo={showAlert:false, type:'', message:''}) => {
            this.setState({
              silentReload: true, 
              alertMessage:{
                show:showAlertInfo.showAlert, 
                type:showAlertInfo.type,
                title:showAlertInfo.message,
                subtitle: ''
              }
            })
        })

        global.launchWithCode = '';
    }
  }

  componentWillUnmount() {
    global.activeComponentId = prevComponentId;

    this.unsubscribeNetworkUpdate();
    clearTimeout(this.timeoutAlert)
  }
  

  goToAddScreen = () => {
    goToScreen(this.props.componentId,'com.lysts.screen.selectCategory', {
      setNewListAdded: ((shoNewListModal, name, code, shareLink, newListData) => {
        this.setState({
          silentReload: true,
          // isLoading: true,
          newListAdded: shoNewListModal,
          newListInfoModal:{
            wishlistName: name,
            wishListCode: code,
            shareLink: shareLink
          },
          listData: [newListData, ...this.state.listData]
      }, ()=>{console.log('New state==> ',this.state);})})
    });
  }


  renderNoItems = () =>{
    return(
      <ErrorView title={"Oops, it’s empty!"} message={"Let’s fill in"} svg={noWishlist} action={{
        text: 'from here',
        function: () => this.goToAddScreen()
      }} />
    )
  }

  renderItemsList = () =>{
    return (
      <ListView 
        listAction={(code, saveStatus) => goToViewWishlistScreen(this.props.componentId,code,saveStatus,(showAlertInfo={showAlert:false,type:'', message:''})=>{this.setState({silentReload: true, alertMessage:{show:showAlertInfo.showAlert, type:showAlertInfo.type,title:showAlertInfo.message,subtitle: ''}})})} 
        renderType='portrait' 
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
        updateUIFunction = {() => {this.setState({silentReload: true})}}
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

  showLoading = () => {
    this.getWishlists();

    return (<View style={{
      flex: 1,
      justifyContent: "center"
    }}>
      <Loader lottieViewStyle={{opacity:0.9}} />
  </View>)
}


  getWishlistsFromRealm = () => {
    let listData = [];
    let wishlistData = this.realm.objects("wishlist").filtered(`owner == '${this.user.id}' && status == 'active'`).sorted("dateModified", true);
        
    if (wishlistData.length < 1) { 
      listData = [];
    } 
    else {
      
      for (const val of wishlistData) {
        listData.push({
          id: val._id,
          name: val.name,
          type: val.category,
          code: val.code,
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


  getWishlists = async() => {
    try{
      // console.log(`Logged in with the user: ${this.user.id}`);      
      
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
            }, ()=>{
                // console.log(`An error occurred with sync session with details: \n${s} \n\nError Details: \n${e}`);
            })
          }
        },
      };
      

      if(this.realm != null && !this.realm.isClosed){
        this.getWishlistsFromRealm();
      }else{
        this.realm = await Realm.open(config);
        this.getWishlistsFromRealm();
      }
      
    } catch (error) {
        this.setState({
          isLoading: false,
          silentReload: false,
        }, ()=>{
            // throw `Error opening realm: ${JSON.stringify(error,null,2)}`;
        })
    }
  }

  handelModal = () => {
    return(
      <Modal 
        isVisible={this.state.newListAdded}
        closeFunction = {() => {this.setState({newListAdded: false})}}
        type= 'newWishlist'
        modalTitle='Wishlist created'
        modalSubtitle='Share your wishlist link or lyst code with friends and family'
        
        newListInfoModal = {this.state.newListInfoModal}
      />
    )
  }

  resetAlert = () => {
      this.timeoutAlert = setTimeout(()=>{
          this.setState({alertMessage: {show: false}})
          clearTimeout(this.timeoutAlert);
      }, 4500)
  }

  render() {
    let listData = this.state.listData;
    let hasData = (listData.length == 0 || listData == null) ? false : true;
    let whatToRender;
    if(!this.state.hasNetworkConnection){
      if(hasData){
        whatToRender = this.renderItemsList();
      }else{
        whatToRender = (<ErrorView message="No Internet Connection" svg={noInternet} />)
      }
    }else if (this.state.isLoading && hasData){
      whatToRender = this.renderItemsList();
      this.getWishlists();
    }else if (this.state.isLoading){
      whatToRender = this.showLoading();
    } else {
      whatToRender = hasData ? this.renderItemsList() : this.renderNoItems();
    }

    this.state.silentReload ? this.getWishlists() : null;

    this.state.alertMessage.show ? this.resetAlert() : null;

    return (
      <View style={styles.container}>
        {this.state.newListAdded ? this.handelModal() : null}
        <View style={[styles.container, hasData ? styles.grayBG : styles.whiteBg]}>
          <View style={styles.top}>
            <Text style={styles.topText}>Wishlists</Text>
          </View>
          { hasData ? this.state.hasNetworkConnection ? null : <View style={{flex:1, position: 'absolute', width:dWidth, height: dHeight, backgroundColor:'rgba(0, 0, 0, 0.05);', zIndex:999}}></View> : null}
          <View style={styles.bottom}>
            {whatToRender}
          </View>
        </View>
        { hasData ? (this.state.hasNetworkConnection ? <FabView onPress={() => this.goToAddScreen()} /> : <NoConnectionAlert />) : null}
        {this.state.alertMessage.show ? (<ErrorSuccessAlert 
            type = {this.state.alertMessage.type}
            title = {this.state.alertMessage.title}
            subtitle = {this.state.alertMessage.subtitle}
            wrapperContainerStyle = {{top: dWidth > 575 ? (dHeight - (56 + 56) - 50) : (dHeight - (56 + 56) - 15)}}
        /> )
        : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    height: dHeight,
    width: dWidth,
  },
  whiteBg:{
    backgroundColor: '#fff'
  },
  grayBG: {
    backgroundColor: '#FCFCFC'
  },
  top:{
    paddingLeft:25,
    paddingTop: 22,
    zIndex:100,
    // backgroundColor: '#fff'
  },
  topText:{
    color:'#515D70',
    // fontSize: pexels(10.5),
    fontSize: 28,
    fontFamily: 'Poppins-SemiBold'
  },
  bottom:{
    flex:1,
    width: '100%',
    zIndex: 1,
  }
})