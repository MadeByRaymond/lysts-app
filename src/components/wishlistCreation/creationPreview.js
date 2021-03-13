import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native'

import * as IconSVG from '../../SVG_Files/wishlistIconsSVG/';
import {getCategoryDisplay} from '../../includes/functions';
import * as Fade from '../../UIComponents/GradientFade/gradientFade';

const creationPreview = (props) => {
    let Icon = IconSVG[props.category]
    let listItems = props.items.map((item, i) => {
        return (
            <View style={styles.tableDataWrapper} key={i+1}>
                <View style={[styles.tableData, {minWidth: 50}]}><Text style={styles.tableDataText}>{i+1}</Text></View>
                <View style={[styles.tableData, {paddingRight: 45}]}>
                    <TouchableWithoutFeedback onLongPress={()=>{props.setExpandIndex(i)}} onPress={()=>{props.setExpandIndex(i)}}>
                        <Text style={styles.tableDataText} numberOfLines={props.expandIndex == i ? 10 : 1} ellipsizeMode='tail'>{item}</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    });
    return (
        <View style= {styles.container}>
            <ScrollView contentContainerStyle={{paddingBottom: 37+80}}>
                <View>
                    <View style={[styles.infoBG, {paddingRight: (props.svgHeight - 35 - (props.svgHeight/3.2)) + 5}]}>
                        <View ><Text style={styles.categoryText}>{getCategoryDisplay(props.category)}</Text></View>
                        <View><Text style={styles.nameText}>{props.name}</Text></View>
                    </View>
                    <View style={[styles.SVGWrapper,{right: -(props.svgHeight/3.2)}]} onLayout={(e) => {props.setSVGHeight(e.nativeEvent.layout.height)}}>
                        <Icon height ={(props.svgHeight - 20)} width={props.svgHeight} />
                    </View>
                </View>

                <View>
                    <View style={styles.tableHeadWrapper}>
                        <View style={[styles.tableHead, {minWidth: 50}]}><Text style={styles.tableHeadText}>SN</Text></View>
                        <View style={styles.tableHead}><Text style={styles.tableHeadText}>Item</Text></View>
                    </View>
                    {listItems}
                </View>
            </ScrollView>
            <Fade.Bottom  /> 
        </View>
        
    )
}

export default creationPreview

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    infoBG:{
        backgroundColor: 'rgba(196, 196, 196, 0.1)',
        marginHorizontal: 35,
        marginTop: 30,
        marginBottom: 30,
        paddingVertical: 25,
        paddingHorizontal: 30,
        paddingRight: 100,
        borderRadius: 23
    },
    SVGWrapper:{
        position:'absolute',
        height: '100%',
        paddingTop: 10
        // backgroundColor: 'gray'
    },
    categoryText:{
        fontSize: 26,
        fontFamily: 'Poppins-SemiBold',
        color: '#515D70'
    },
    nameText:{
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#515D70'
    },
    tableHeadWrapper:{
        flexDirection: 'row',
        paddingHorizontal: 30,
        paddingBottom: 15,
        marginTop: 20
    },
    tableHead:{
        // backgroundColor: 'red',
        alignItems: 'center',
        marginHorizontal: 8
    },
    tableHeadText:{
        color: '#515D70',
        fontSize: 16.5,
        fontFamily: 'Poppins-Medium'
    },
    tableDataWrapper:{
        flexDirection: 'row',
        paddingHorizontal: 30,
        paddingBottom: 25
    },
    tableData:{
        // backgroundColor: 'red',
        alignItems: 'center',
        marginHorizontal: 8
    },
    tableDataText:{
        color: '#515D70',
        fontSize: 16.5,
        fontFamily: 'Poppins-Medium'
    }
})
