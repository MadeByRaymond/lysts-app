import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal';


import {TouchableIOSHighlight} from '../../includes/variables';

const ActionsModal = (props) => {
    return (
        <Modal 
            isVisible={props.modalState} 
            backdropOpacity={0.6} 
            useNativeDriver={true}
            // statusBarTranslucent={true} 
            style={styles.actionModalViewWrapper}
            // onSwipeComplete={() => props.closeFunction()}
            animationIn= "zoomIn"
            animationOut="zoomOut"
            // animationOutTiming={500}
            hideModalContentWhileAnimating={true}
            swipeDirection={["down", "left", "up", "right"]}
            onBackdropPress= {() => props.closeModal()}
            onBackButtonPress= {() => props.closeModal()}
        >
           <View>
                <View style={styles.actionModalView}>

                    {
                        props.actionItems.map((item, i) => {
                            return (
                                <TouchableIOSHighlight 
                                    key={i}
                                    onPress={() => {
                                        // item.action();
                                        props.closeModal();
                                    }} 
                                    underlayColor="#EDEDED"
                                >
                                    <View style={[
                                        styles.actionItem, 
                                        i == 0 ? {paddingTop: 15} : null,
                                        (i == (props.actionItems.length - 1)) ? {paddingBottom: 15} : null
                                    ]}><Text style={styles.actionItemText}>{item.text}</Text></View>
                                </TouchableIOSHighlight>
                            )
                        })
                    }                    
                </View>
           </View>
        </Modal>
    )
}

export default ActionsModal

const styles = StyleSheet.create({
    actionModalViewWrapper:{
        flex: 1,
        backgroundColor:'transparent',
        justifyContent:'center',
        alignItems:'center',
        margin: 0,
        padding: 0,
    },
    actionModalView: {
        backgroundColor: '#fff',
        minWidth: 250,
        elevation: 3
    },
    actionItem:{
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    actionItemText:{
        fontSize: 15.5,
        fontFamily: 'Poppins-Regular'
    },
})
