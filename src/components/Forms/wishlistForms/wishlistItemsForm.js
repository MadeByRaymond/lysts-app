import React from 'react'
import { StyleSheet, Text, View, Keyboard, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Dimensions  } from 'react-native'
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from "react-native-svg"

import {ItemsInput as Input} from '../../../UIComponents/Inputs/index';
import * as Fade from '../../../UIComponents/GradientFade/gradientFade';

let dHeight = Dimensions.get("window").height;
let dWidth = Dimensions.get("window").width;

function CircleSVG(props) {
  return (
    <Svg width={64} height={65} viewBox="0 0 64 65" fill="none" {...props}>
      <Circle
        cx={31.681}
        cy={32.519}
        r={23.04}
        fill="#FAF0F2"
        fillOpacity={0.52}
        stroke="url(#prefix__paint0_linear)"
        strokeWidth={17.28}
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={18.721}
          y1={8.039}
          x2={41.761}
          y2={58.439}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#CFA280" stopOpacity={0.7} />
          <Stop offset={1} stopColor="#6990C4" stopOpacity={0.54} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

const wishlistItemsForm = (props) => {
    let items = props.items.map((item, i) => {
        return (
            <View style={styles.contentWrapper} key={i}>
                <View style={styles.inputWrapper}>
                    <View style={{alignItems:'center'}}><CircleSVG height={30} width={30} /></View>
                    <Input 
                        // {...props} 
                        inputStyles={styles.input} 
                        value={item} 
                        placeholder='Item Name' 
                        maxLength = {40} 
                        onChangeText={(val) => {props.onUpdateItem(val, i)}}
                        onBlur={(e) => props.onRemoveAllEmptyItems()}
                        autoFocus={true}
                    />
                </View>
                <View style={styles.deleteWrapper}>
                    <TouchableOpacity disabled={props.items.length == 1} onPress={() => {props.onRemoveItem(i)}}>
                        <View>
                            <Svg width={30} height={30} viewBox="0 0 53 54" fill="none">
                                <Path d="M42.1458 16.4824L31.8513 26.7769L42.2488 37.1745L36.5353 42.888L26.1378 32.4904L15.8947 42.7335L10.49 37.3289L20.7331 27.0858L10.2841 16.6368L15.9976 10.9233L26.4466 21.3723L36.7412 11.0777L42.1458 16.4824Z" 
                                    fill={props.items.length == 1 ? '#DCBCA8' : "#C06A46"}
                                />
                            </Svg>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    })
    return (
        <View style={{flex:1}}>
            <View style={styles.actionTextWrapper}>
                <View><TouchableOpacity onPress={() => {props.onClearItems()}}><Text style={styles.actionText}>Clear all ({props.items.length})</Text></TouchableOpacity></View>
                <View><TouchableOpacity onPress={() => {props.onAddItem()}}><Text style={styles.actionText}>+ Item</Text></TouchableOpacity></View>
            </View>
            <ScrollView showsVerticalScrollIndicator = {false}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                    props.onRemoveAllEmptyItems();
                }} >
                    <View style={styles.container}>
                        {items}
                        {/* <View style={styles.inputWrapper}><Input.InputText targetKey ='name' {...props} placeholder='Wishlist Name' maxLength = {35} /></View> */}
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>  
            <Fade.Top style={{top: 45}} />
            <Fade.Bottom  />  
        </View>
        
    )
}

export default wishlistItemsForm

const styles = StyleSheet.create({
    container:{
        // flex: 1,
        height: '100%',
        paddingHorizontal: 35,
        paddingVertical: 20,
        paddingBottom: 37+70, 
        marginBottom: 26,
        // backgroundColor: 'red'
    },
    contentWrapper:{
        // backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    inputWrapper: {
        // width: dWidth - (35 + 35 + 30),
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        backgroundColor:'#fff',
        width: dWidth - (35 + 35 + 30 + 30),
    },
    deleteWrapper:{
        width: 30,
        // backgroundColor: '#000'
    },
    actionTextWrapper:{
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingHorizontal: 35,
        paddingTop: 10,
        paddingBottom: 10
    },
    actionText:{
        fontSize: 15.5,
        fontFamily: 'Poppins-SemiBold',
        color: '#515D70'
    }
})
