import React from 'react'
import { StyleSheet, View,Dimensions } from 'react-native'

import Modal from 'react-native-modal';
import { BlurView } from "@react-native-community/blur";

let dHeight = Dimensions.get("window").height;
let dWidth = Dimensions.get("window").width;

const ModalView = (props) => {
    return (
      <Modal 
        backdropOpacity={100} 
        isVisible={props.isVisible} 
        statusBarTranslucent={true} 
        style={styles.modal}
        onSwipeComplete={() => props.closeFunction()}
        onBackButtonPress= {() => props.closeFunction()}
        swipeDirection="down"
        // useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        customBackdrop= {
          <BlurView
            style={styles.blurView}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
        }
      >
          <View style={styles.modalContainerWrapper}>
            <View style={styles.modalContainer}>
              <View style={styles.modalSwipeIndicator}></View>
              {props.children}
            </View>
          </View>
      </Modal>
    )
}

export default ModalView

const styles = StyleSheet.create({
    modal:{
        // width: Dimensions.get('screen').width,
        // height: Dimensions.get('screen').height,
        // backgroundColor: 'red',
        margin: 0
    },
    modalContainerWrapper:{
        flex:1, 
        justifyContent:'flex-end'
    },
    modalContainer:{
        backgroundColor:'#fff',
        paddingBottom: 50,
        paddingTop: 20,
        paddingHorizontal: 50,
        elevation: 50,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50
    },
    modalSwipeIndicator: {
        backgroundColor:'#F2F2F2', 
        alignSelf:'center', 
        height: 5, 
        width: dWidth/6, 
        marginBottom: 30, 
        borderRadius: 1000
    },
    blurView: {
      position: "absolute",
      // flex:1,
      // height: Dimensions.get('window').height,
      // width: Dimensions.get('screen').width,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
})