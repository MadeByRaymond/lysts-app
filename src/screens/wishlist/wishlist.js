import React, {Component} from 'react';
import Realm from 'realm';
import { View, Text, StyleSheet, Dimensions, PixelRatio, Button, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import LottieView from 'lottie-react-native';
import Svg, { Rect } from "react-native-svg"
import debounce from 'lodash.debounce';
import { Navigation } from "react-native-navigation";
import * as Animatable from 'react-native-animatable';

import {app as realmApp} from '../../../storage/realm';
import {WishlistSchemas} from '../../../storage/schemas';

import FabView from '../../UIComponents/Buttons/FabButton/fabButton';
import ModalButtonView from '../../UIComponents/Buttons/ModalButton/modalButtonView';
import ListView from '../../components/wishlistList/wishlistList';
import ModalView from '../../UIComponents//Modals/ModalView';
import Modal from '../../UIComponents/Modals/DefaultModal'
import {onShare} from '../../includes/functions';
import {dWidth, dHeight} from '../../includes/variables';
import {goToViewWishlistScreen} from '../../includes/functions';

import WishlistEmptySVG from '../../SVG_Files/UI_SVG/noWishlist/noWishlist';
import * as iconSVG from '../../SVG_Files/wishlistIconsSVG/';
import * as SaveSVG from '../../SVG_Files/saveSVG/saveSVG';

let pexels = (value) =>{return PixelRatio.getPixelSizeForLayoutSize(value)};

export default class Wishlist extends Component {

  // Class Variables
  realm;
  user = realmApp.currentUser;

  state = {
    isLoading: true,
    silentReload: false,
    newListAdded: false,
    newListInfoModal:{
      // shareLink: 'here\s a code WLA235B',
      // wishlistName: 'Raymond’s Ultimate Anniversay List',
      // wishListCode: 'WLA235B'
      
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
      // },
      // {
      //   id: '1234',
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'Birthday',
      //   saved: true,
      // },
      // {
      //   id: '1235',
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'job_promotion',
      //   saved: false,
      // },
      // {
      //   id: '1236',
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'christmas',
      //   saved: true,
      // },
      // {
      //   id: '1237',
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'father0s_day',
      //   saved: false,
      // },
      // {
      //   id: '1238',
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'house_warming',
      //   saved: false,
      // },
      // {
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'job_promotion',
      //   saved: false,
      // },
      // {
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'christmas',
      //   saved: true,
      // },
      // {
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'Anniversary',
      //   saved: true,
      // },
      // {
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'Birthday',
      //   saved: true,
      // },
      // {
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'job_promotion',
      //   saved: false,
      // },
      // {
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'christmas',
      //   saved: true,
      // },
      // {
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'Anniversary',
      //   saved: true,
      // },
      // {
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'Birthday',
      //   saved: true,
      // },
      // {
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'job_promotion',
      //   saved: false,
      // },
      // {
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'christmas',
      //   saved: true,
      // },
      // {
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'Anniversary',
      //   saved: true,
      // },
      // {
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'Birthday',
      //   saved: true,
      // },
      // {
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'job_promotion',
      //   saved: false,
      // },
      // {
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'christmas',
      //   saved: true,
      // },
      // {
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'Anniversary',
      //   saved: true,
      // },
      // {
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'Birthday',
      //   saved: true,
      // },
      // {
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'job_promotion',
      //   saved: false,
      // },
      // {
      //   name: 'Raymond’s Ultimate House Warming List',
      //   type: 'christmas',
      //   saved: true,
      // },
    ]
  }

  animatableView = ref => this.animatableView = ref;
  

  goToAddScreen = debounce(() =>{
    // alert('ddd')
    Navigation.push(this.props.componentId, {
      component: {
        name: 'com.lysts.screen.selectCategory', // Push the screen registered with the 'Settings' key
        options: { // Optional options object to configure the screen
          bottomTabs: {
            animate: false,
            visible: false
          },
        },
        passProps: {
          setNewListAdded: ((boolean, name, code, shareLink, newListData) => {
            this.setState({
              silentReload: true,
              newListAdded: boolean,
              newListInfoModal:{
                wishlistName: name,
                wishListCode: code,
                shareLink: shareLink
              },
              listData: [newListData, ...this.state.listData]
          })})
        }
      }
    });
  }, 1000, {leading: true,trailing: false})


  renderNoItems = () =>{
    return(
      <View style={styles.noContentWrapper}>
        <View>
          <View><Text style={styles.noContentText}>Oops, it’s empty!</Text></View>
          <View style={styles.noContentSVG}>
            <WishlistEmptySVG height={dWidth > 575 ? 400 : 260} width={dWidth} />
          </View>
          <View style={{flexDirection: 'row', justifyContent:'center'}}>
            <Text style={styles.noContentText}>Let’s fill in</Text> 
            <TouchableWithoutFeedback hitSlop={200} onPress={() => this.goToAddScreen()}> 
              <Text style={[styles.noContentText, styles.noContentTextAction]}>from here</Text>
            </TouchableWithoutFeedback>
          </View>
        </View> 
      </View>
    )
  }

  renderItemsList = () =>{
    return (
      <ListView 
        listAction={(code, saveStatus) => goToViewWishlistScreen(this.props.componentId,code,saveStatus)} 
        renderType='portrait' 
        renderData={this.state.listData} 
        onRefresh = {this.getWishlists}
        refreshing = {this.state.isLoading}
      />
      )
    // let listData = this.state.listData;
    // return listData.map((item, key) =>{
    //   let Icon = iconSVG[item.type.toLowerCase()];
    //   let cardsPerRow = dWidth > 575 ? 3 : 2
    //   let cardWidth = ((dWidth /cardsPerRow ) - 30);
    //   let SavedIcon = item.saved ? SaveSVG.Saved : SaveSVG.Unsaved;
    //   return (
    //     <View key={key} style={{
    //       width: cardWidth, 
    //       elevation:3, 
    //       backgroundColor: '#fff', 
    //       marginBottom: 20,
    //       borderRadius: 10
    //     }}>
    //       <View style={{
    //         position: 'relative'
    //       }}>
    //         <View style={{
    //           position: 'absolute',
    //           right: 15,
    //           top: 13
    //         }}>
    //           <TouchableOpacity activeOpacity={0.9}>
    //             <SavedIcon width={20} height={20} />
    //           </TouchableOpacity>
    //         </View>
    //         <View style={{
    //           marginTop: 50,
    //         }}>
    //           <Icon height={(cardWidth*68)/148} width={cardWidth} />
    //         </View>
    //       </View>
    //       <View style={{
    //         marginTop: 21,
    //         marginBottom: 13,
    //         paddingHorizontal: 13
    //       }}>
    //         <View><Text style={{
    //           color: '#44577C',
    //           fontSize: 14.5,
    //           fontFamily:'Poppins-Medium'
    //         }} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text></View>
    //         <View><Text style={{
    //           color: '#44577C',
    //           fontSize: 14,
    //           fontFamily:'Poppins-Medium',
    //           opacity: 0.9
    //         }}>{this.capitalizeFirstLetters(item.type.replace('_', ' '))}</Text></View>
    //       </View>
          
    //     </View>
        
    //   )
    // })
  }

  showLoading = () => (
    <View style={{
      flex: 1,
      justifyContent: "center"
  }}>
      <View>
          <LottieView 
              style={{width: '100%', height: 250, marginTop: 0, alignSelf: 'center',backgroundColor:'transparent', opacity:0.9}}
              source={require('../../lotti_animations/37725-loading-50-among-us.json')} 
              autoPlay 
              loop={true}
              autoSize= {true}
              speed={1}
          />
      </View>
      {this.getWishlists()}
  </View>
  )


  getWishlistsFromRealm = () => {
    let listData = [];
    let wishlistData = this.realm.objects("wishlist").filtered(`owner == '${this.user.id}' && status == 'active'`).sorted("dateModified", true);
        
    console.log(wishlistData);
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


  getWishlists = (checkIfLoading = true) => {
    try{
      console.log(`Logged in with the user: ${this.user.id}`);
      // If should show loading screen when loading
      // checkIfLoading ? ((!this.state.isLoading) ? this.setState({isLoading: true}) : null ) : null;
      
      
      const config = {
        schema: [
          WishlistSchemas.wishlistSchema,
          WishlistSchemas.wishlist_listItemsSchema
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

  handelModal = () => {
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
    let listData = this.state.listData;
    let hasData = false;
    let whatToRender;
    if (this.state.isLoading && (listData.length == 0 || listData == null)){
      hasData = false;
      whatToRender = this.showLoading();
    }else if (this.state.isLoading){
        hasData = true;
        whatToRender = this.renderItemsList(true);
    } else {
      if (listData != null && listData.length !== 0){
        hasData = true;
        whatToRender = this.renderItemsList();
      }else{
        hasData = false;
        whatToRender = this.renderNoItems();
      }
    }

    this.state.silentReload ? this.getWishlists() : null;

    return (
      <View style={styles.container}>
        {this.state.newListAdded ? this.handelModal() : null}
        <View style={[styles.container, hasData ? styles.grayBG : styles.whiteBg]}>
          <View style={styles.top}>
            <Text style={styles.topText}>Wishlists</Text>
          </View>
          <View style={styles.bottom}>
            {whatToRender}
          </View>
        </View>
        { hasData ? <FabView onPress={() => this.goToAddScreen()} /> : null}
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
    fontSize: pexels(10.5),
    fontSize: 28,
    fontFamily: 'Poppins-SemiBold'
  },
  bottom:{
    flex:1,
    width: '100%',
    zIndex: 1,
  },


  noContentWrapper:{
    flex: 1,
    width: '100%',
    justifyContent:'center',
    alignItems:'center'
  },
  noContentSVG:{
    opacity: 0.6,
    marginTop: 21,
    marginBottom: 30
  },
  noContentText:{
    textAlign:'center',
    color:'rgba(68, 87, 124, 0.9)',
    fontSize: pexels(9.5),
    fontSize: 25,
    fontFamily: 'Poppins-Medium'
  },
  noContentTextAction:{
    marginLeft:5, 
    color:'#CFA280'
  }
})