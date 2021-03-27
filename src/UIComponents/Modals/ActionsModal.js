import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal';
import Sound from 'react-native-sound';


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
                            let TouchableView = item.disabled ? View : TouchableIOSHighlight;
                            return (
                                <TouchableView 
                                    disabled={item.disabled}
                                    key={i}
                                    onPress={() => {
                                        props.closeModal();
                                        item.action();
                                    }} 
                                    underlayColor="#EDEDED"
                                >
                                    <View style={[
                                        styles.actionItem, 
                                        item.disabled ? {opacity: 0.3} : null,
                                        i == 0 ? {paddingTop: 15} : null,
                                        (i == (props.actionItems.length - 1)) ? {paddingBottom: 15} : null
                                    ]}><Text style={styles.actionItemText}>{item.text}</Text></View>
                                </TouchableView>
                            )
                        })
                    }                    
                </View>
           </View>
        </Modal>
    )
}

const SoundsModal = (props) => {
    let notiSound;
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
                    <View style={{paddingTop: 0}}>
                        {
                            props.soundsList.map((item,i) => (
                                <TouchableIOSHighlight onPress={() => {
                                    // setActiveState(item);
                                    props.setNotificationSound(item)
                                    // Sound.setCategory
                                    notiSound = new Sound(item.sound, Sound.MAIN_BUNDLE, (error) => {
                                        if (error) {
                                            if(__DEV__){
                                                console.log('failed to load the sound', error);
                                            }
                                            return;
                                        }
                                        // loaded successfully
                                        // console.log('duration in seconds: ' + notiSound.getDuration() + 'number of channels: ' + notiSound.getNumberOfChannels());
                                        
                                        
                                        // Stop the sound and rewind to the beginning
                                        notiSound.stop(() => {
                                            // Note: If you want to play a sound after stopping and rewinding it,
                                            // it is important to call play() in a callback.
                                            
                                            // Play the sound with an onEnd callback
                                            notiSound.play((success) => {
                                                if (success) {
                                                    // console.log('successfully finished playing');
                                                } else {
                                                    console.log('playback failed due to audio decoding errors');
                                                }
                                                notiSound.release();
                                            });

                                            
                                        });
                                    })
                                    // notiSound.play(() => {
                                    //     notiSound.release();
                                    // });
                                }} key={i} >
                                    <View style={[styles.actionItem, props.notificationSound.id == item.id ? styles.actionItemActive : null]}>
                                        <Text style={styles.actionItemText}>{item.title}</Text>
                                    </View>
                                </TouchableIOSHighlight>
                            ))
                        }
                        {/* <Touchable activeOpacity={0.8}>
                            <View style={styles.saveButton}>
                                <Text style={styles.saveButtonText}>Save</Text>
                            </View>
                        </Touchable> */}
                    </View>                    
                </View>
           </View>
        </Modal>
    )
}

const InfoModal = (props) => {
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
        >
            <View style={styles.actionModalView}>
                <View><Text>{props.text}</Text></View>
                <View>
                    {props.buttons.map((item, i) => {
                        return(
                            <TouchableIOSHighlight
                                key={i}
                                onPress={() => {
                                    item.func();
                                }} 
                                underlayColor="#EDEDED"
                            >
                                <View>{item.text}</View> 
                            </TouchableIOSHighlight>
                        )
                    })}
                </View>    
            </View>
        </Modal>
    )
}

export {ActionsModal, SoundsModal,InfoModal}

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
    actionItemActive:{
        backgroundColor:'#F9C9B6'
    },

    // saveButton:{
    //     paddingVertical: 10,
    //     paddingHorizontal: 20,
    //     backgroundColor: '#FFFDF3'
    // },
    // saveButtonText:{
    //     fontSize: 15.5,
    //     fontFamily: 'Poppins-Regular',
    //     textAlign: 'center',
    //     color:'#AC6651'
    // }
})
