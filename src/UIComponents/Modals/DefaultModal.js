import React, {useRef} from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Clipboard from "@react-native-community/clipboard";
import Svg, { Rect } from "react-native-svg"


import ModalView from './ModalView';
import ModalButtonView from '../Buttons/ModalButton/modalButtonView';
import EditModalContent from '../../components/EditWishlistDetails/editWishlist';
import ReportModalContent from '../../components/EditWishlistDetails/reportWishlist';

import {dWidth} from '../../includes/variables';
import {onShare} from '../../includes/functions';

let svgWidth = dWidth > 500 ? 400 : (dWidth-100);

const DefaultModal = (props) => {

    const animatableView = useRef(null);

    let modalContent;

    switch (props.type) {
        case 'newWishlist':
            modalContent = (
              <View>
                <TouchableWithoutFeedback onPress={() => {
                    // console.log(this.animatableView)
                    animatableView.current.bounceIn(300).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled')),
                    Clipboard.setString(props.newListInfoModal.wishListCode)
                  }}>
                    <Animatable.View useNativeDriver={true} ref={animatableView} style={styles.modalCodeWrapper}>
                      <Svg width={svgWidth} height={(svgWidth*252)/638} viewBox="0 0 638 252" fill="none">
                        <Rect
                          x={6.518}
                          y={6.56}
                          width={624.96}
                          height={239.04}
                          rx={23.04}
                          fill="#fff"
                          stroke="#44577C"
                          strokeWidth={11.52}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="14.4 43.2"
                        />
                      </Svg>
                      <View style={styles.modalCodeTextWrapper}>
                        <View><Text style={styles.modalCodeText}>{props.newListInfoModal.wishListCode}</Text></View>
                      </View>
                      <View style={styles.copyWrapper}><Text style={styles.copyText}>Tap to copy</Text></View>
                      {/* <View style={styles.copyWrapper}></View> */}
                    </Animatable.View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={styles.modalWishlist}>{props.newListInfoModal.wishlistName}</Text>
                </View>
                <View>
                    <ModalButtonView 
                        buttonText = 'share'
                        onPress={() => {onShare('Share your Wishlink', `See my new Wishlist on Lysts App with ${props.newListInfoModal.shareLink}`, props.newListInfoModal.wishlistName)}}
                    />
                </View>
              </View>
            )
            break;
        
        case 'contactDetails' :
            modalContent = (
                <View>
                    <View style={styles.contactInfoWrapper}>
                        <View><Text style={styles.contactInfoText}>{props.contactInfo.email}</Text></View>
                        <View><Text style={styles.contactInfoText}>{props.contactInfo.phone}</Text></View>
                    </View>
                    <View>
                        <ModalButtonView 
                            buttonText = 'Edit'
                            onPress={() => {
                              props.goToScreen();
                            }}
                        />
                    </View>
                </View>
                
            )
            break;

        case 'editWishlist' :
            modalContent = (
              <EditModalContent 
                onClose={props.closeFunction} 
                wishlistInfo={props.wishlistInfo} 
                realmInfo = {props.realmInfo} 
                userInfo = {props.userInfo} 
                wishlistCode={props.wishlistCode} 
                updateUI={props.updateUI} 
                closeFunction = {props.closeFunction} 
              />
            )
            break;

        case 'reportWishlist' :
          modalContent = (
            <ReportModalContent 
              reportFunction = {props.reportFunction}
              userLoggedIn = {props.userLoggedIn}
              type = {props.type}
            />
          )
          break;

        case 'reportIssue' :
          modalContent = (
            <ReportModalContent 
              reportFunction = {props.reportFunction}
              userLoggedIn = {props.userLoggedIn}
              type = {props.type}
            />
          )
          break;

        default:
            break;
    }

    return(
      <ModalView

        isVisible={props.isVisible} 
        closeFunction = {props.closeFunction}
        containerViewStyle = {props.type == 'editWishlist' ? {paddingHorizontal:30} : null}
      >
        {
          props.type == 'editWishlist' ? null :(
            <View>
              <View><Text style={styles.modalHeader}>{props.modalTitle}</Text></View>
              {props.type == 'reportWishlist' ? null :(<View><Text style={styles.modalSubheader}>{props.modalSubtitle}</Text></View>)}
            </View>
          )
        }
        
            {modalContent}
        
      </ModalView>
    )
}

export default DefaultModal;

const styles = StyleSheet.create({
      modalHeader:{
        color: '#515D70',
        textAlign: 'center',
        letterSpacing: 0.6,
        fontSize: 24,
        fontFamily: 'Poppins-Medium'
      },
      modalSubheader:{
        color: '#44577C',
        opacity: 0.8,
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Poppins-Medium'
      },
      modalCodeWrapper:{
        // borderWidth: 5.5,
        // borderColor: '#44577C',
        // borderRadius: 20,
        // borderStyle: 'dashed',
        // paddingVertical: 20
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
      },
      modalCodeTextWrapper:{
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      },
      modalCodeText:{
        color:'#44577C',
        textAlign: 'center',
        letterSpacing: 0.6,
        fontSize: 32,
        fontFamily: 'Poppins-Medium',
      },
      copyWrapper:{
        // backgroundColor: '#44577C',
        // height: 40,
        // width: 40,
        // borderRadius: 1000,
        // position: 'absolute',
        // right: -10,
        // top: -10
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 52
    
      },
      copyText: {
        color: '#44577C',
        opacity: 0.5,
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'Poppins-Medium'
      },
      modalWishlist:{
        textAlign: 'center',
        paddingHorizontal: 10,
        marginTop:28,
        color: '#44577C',
        letterSpacing: 0.6,
        fontSize: 20,
        fontFamily: 'Poppins-Medium'
      },

      contactInfoWrapper: {
        marginTop:40,
        marginBottom: 60
      },
      contactInfoText:{
        textAlign: 'center',
        paddingHorizontal: 10,
        marginBottom:14,
        color: '#44577C',
        letterSpacing: 0.6,
        fontSize: 20,
        fontFamily: 'Poppins-Medium'
      },
})
