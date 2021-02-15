import React from 'react'
import { View, Text, StyleSheet, Dimensions, PixelRatio, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Shadow } from 'react-native-neomorph-shadows';

import {getCategoryDisplay, onBookmark} from '../../includes/functions';

import * as iconSVG from '../../SVG_Files/wishlistIconsSVG/';
import SaveButton from '../saveWishlistButton/saveButton';

let dHeight = Dimensions.get("window").height;
let dWidth = Dimensions.get("window").width;

  export default function portraitListItem({data, cardsPerRow, action, updateUIFunction, savingInProgress, saveWishlistError}) {
    let Icon = iconSVG[data.type.toLowerCase()];
    // let cardsPerRow = dWidth > 575 ? 3 : 2
    let cardWidth = ((dWidth /cardsPerRow ) - 30);
    return (
        <Shadow
            useArt 
            style={[styles.cardBoxShadow, {width: cardWidth, height: ((cardWidth*68)/148)+125.5}]}
        >
            <TouchableOpacity activeOpacity={0.8} onPress={() => action(data.code, data.saved)}>
                <View style={[styles.cardBox, {width: cardWidth}]}>
                    <View style={styles.top}>
                    <View style={styles.savedIconBox}>
                        <TouchableOpacity activeOpacity={0.9}>
                            <SaveButton saveFunc={() => onBookmark(!data.saved, data.code,()=>{savingInProgress ? savingInProgress(data.code) : null}, (value)=> {updateUIFunction ? updateUIFunction(data.code, value) : null}, saveWishlistError )} width={20} height={20} savedStatus={data.saved == null ? 'loading' : (data.saved ? 'saved' : 'unsaved')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.svgIconBox}>
                        <Icon height={(cardWidth*68)/148} width={cardWidth} />
                    </View>
                    </View>
                    <View style={styles.bottom}>
                    <View><Text style={styles.wishlistName} numberOfLines={1} ellipsizeMode='tail'>{data.name}</Text></View>
                    <View><Text style={styles.wishlistType}>{getCategoryDisplay(data.type)}</Text></View>
                    </View>
                </View>  
            </TouchableOpacity>
                
        </Shadow>
    )
}

const styles = StyleSheet.create({
    cardBox:{  
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    cardBoxShadow: {
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.05,
        shadowColor: "#000000",
        shadowRadius: 10,
        borderRadius: 10,
        backgroundColor: 'transparent',
        // height:560, 
        // overflow: 'hidden' ,
        marginBottom: 20,
        marginHorizontal: 10,
    },
    top:{
        position: 'relative',
    },
    savedIconBox:{
        position: 'absolute',
        right: 15,
        top: 13
    },
    svgIconBox:{
        marginTop: 50,
    },


    bottom:{
        marginTop: 21,
        marginBottom: 13,
        paddingHorizontal: 13
    },
    wishlistName: {
        color: '#44577C',
        fontSize: 14.5,
        fontFamily:'Poppins-Medium'
    },
    wishlistType:{
        color: '#44577C',
        fontSize: 14,
        fontFamily:'Poppins-Medium',
        opacity: 0.9
    }
})
