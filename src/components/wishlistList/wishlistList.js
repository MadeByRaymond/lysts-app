import React from 'react'
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native'

import PortraitListItem from './portraitListItem';
import HorizontalListItem from './horizontalListItem';

let dHeight = Dimensions.get("window").height;
let dWidth = Dimensions.get("window").width;

const wishlistList = (props) => {
    let cardsPerRow_Portrait = dWidth > 575 ? 3 : 2;
    let cardsPerRow_Horizontal = dWidth > 575 ? 2 : 1;

    let portraitList = (
        <FlatList 
            contentContainerStyle = {styles.listWrapper} 
            data={props.renderData}
            numColumns= {cardsPerRow_Portrait}
            renderItem={({ item }) => <PortraitListItem action={props.listAction} data={item} cardsPerRow = {cardsPerRow_Portrait} />}
            keyExtractor={item => {return item.id}}

            showsVerticalScrollIndicator = {false}
            decelerationRate = 'normal'
        />
    )

    let horizontalList = (
        <FlatList 
            contentContainerStyle = {styles.listWrapper} 
            data={props.renderData}
            numColumns= {cardsPerRow_Horizontal}
            renderItem={({ item }) => <HorizontalListItem action={props.listAction} data={item} cardsPerRow = {cardsPerRow_Horizontal} />}
            keyExtractor={item => {return item.id}}

            showsVerticalScrollIndicator = {false}
            decelerationRate = 'normal'
        />
    )

    return props.renderType === 'portrait' ? portraitList : props.renderType === 'horizontal' ? horizontalList : portraitList
}

export default wishlistList

const styles = StyleSheet.create({
    listWrapper:{
        flexDirection: 'column',
        // flexWrap: 'wrap',
        // alignContent: 'space-between',
        // alignItems: "flex-end",
        // justifyContent: 'space-between',
        alignContent: 'space-between',
        paddingTop: 25,
        paddingHorizontal: 10,
        paddingBottom: 80,
    }
})
