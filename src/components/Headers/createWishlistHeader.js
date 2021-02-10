import React from 'react'
import { StyleSheet, Text, View,Dimensions } from 'react-native';

import HeaderText from '../../UIComponents/Texts/createHeaderText';
import BackButton from '../../UIComponents/Buttons/BackButton/backButton';

let dWidth = Dimensions.get("window").width;

const createWishlistHeader = (props) => {
    return (
        <View style={styles.top}>
            <View style={styles.topBar}>
                <View>
                    <HeaderText>{props.text}</HeaderText>
                </View>
                <View style={{marginTop: 5, marginRight: 3}}><BackButton onPress = {props.onPress} /></View>
            </View>
            {props.subText ? (<View style={styles.subTextWrapper}><Text style={styles.subText}>{props.subText}</Text></View> ) : null}
        </View>
    )
}

export default createWishlistHeader

const styles = StyleSheet.create({ 
    top:{
        paddingHorizontal: 25,
        width: '100%'
    },
    topBar:{
        marginTop: 40,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        width: '100%'
    },
    subTextWrapper:{
        width: (dWidth * 835)/1080,
        marginTop: 12
    },
    subText:{
        color: '#515D70',
        fontSize: 15.8,
        fontFamily:'Poppins-Medium',
        lineHeight: 28
    }
})
