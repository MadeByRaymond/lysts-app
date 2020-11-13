import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Svg, { Rect, Circle } from "react-native-svg"
import {Navigation} from 'react-native-navigation';

import {goToViewWishlistScreen} from '../../includes/functions';
import ListView from '../../components/wishlistList/wishlistList';
import * as Fade from '../../UIComponents/GradientFade/gradientFade';
import { Touchable } from '../../includes/variables';

export default class save_archive extends Component {
    state ={
      isArchive : this.props.show == 'archive' ? true : false,
      isSaved : this.props.show == 'saved' ? true : false,
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


    render() {
        let whatToRender = this.state.listData.length == 0 ? this.renderNoItems() : this.renderItemsList();
        
        return (
            <View style={styles.container}>
                <View style={styles.headerWrapper}>
                    <View style={styles.headerSVGWrapper}>
                      {this.renderHeaderSVG()}
                    </View>
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
