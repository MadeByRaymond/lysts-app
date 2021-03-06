import React from 'react'
import { View, Text, StyleSheet, Dimensions, PixelRatio, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Shadow } from 'react-native-neomorph-shadows';

import {getCategoryDisplay} from '../../includes/functions';

import * as iconSVG from '../../SVG_Files/wishlistIconsSVG/';
import SaveButton from '../saveWishlistButton/saveButton';

let dHeight = Dimensions.get("window").height;
let dWidth = Dimensions.get("window").width;

  export default function portraitListItem({data, cardsPerRow, action}) {
    let Icon = iconSVG[data.type.toLowerCase()];
    // let cardsPerRow = dWidth > 575 ? 3 : 2
    let cardWidth = ((dWidth /cardsPerRow ) - 30);
    return (
        <Shadow
            useArt 
            style={[styles.cardBoxShadow, {width: cardWidth}]}
        >
            <TouchableOpacity activeOpacity={0.8} onPress={() => action(data.id, data.saved)}>
                <View style={[styles.cardBox, {width: cardWidth}]}>
                    <View style={styles.left}>
                        <View style={styles.svgIconBox}>
                            <Icon height={70} width={(cardWidth/3.5)-26} />
                        </View>
                    </View>
                    <View style={[styles.right, {width: cardWidth - 13 - ((cardWidth/3.5)-26)}]}>
                        
                        <View style={styles.savedIconBox}>
                            <TouchableOpacity activeOpacity={0.9} hitSlop={{top:16, bottom: 16, left: 3444}}>
                                <SaveButton width={20} height={20} saved={data.saved} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View><Text style={styles.wishlistName} numberOfLines={2} ellipsizeMode='tail'>{data.name}</Text></View>
                        </View>
                        <View>
                            <View><Text style={styles.wishlistType}>{getCategoryDisplay(data.type)}</Text></View>
                            <View><Text style={styles.wishlistType}>by {data.owner}</Text></View>
                        </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        height: 138,
    },
    left:{
        position: 'relative',
    },
    savedIconBox:{
        position: 'absolute',
        right: 18,
        top: 16
    },
    svgIconBox:{
        paddingLeft: 13,
        // paddingVertical: 20
        // paddingVertical: 50
        // marginTop: 50,
    },


    right:{
        // marginTop: 21,
        // marginBottom: 13,
        paddingHorizontal: 13,
        paddingVertical: 20,
        paddingRight: 50,
        height: 138,
        // height: 200,
        justifyContent: 'space-evenly',

    },
    wishlistName: {
        color: '#44577C',
        fontSize: 16,
        fontFamily:'Poppins-Medium',
        paddingBottom: 3,
    },
    wishlistType:{
        color: '#44577C',
        fontSize: 13,
        fontFamily:'Poppins-Medium',
        opacity: 0.9
    }
})
