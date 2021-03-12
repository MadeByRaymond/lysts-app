import React from 'react'
import { StyleSheet, FlatList } from 'react-native'

import PortraitListItem from './portraitListItem';
import HorizontalListItem from './horizontalListItem';

import {dWidth} from '../../includes/variables';

const wishlistList = (props) => {
    let cardsPerRow_Portrait = dWidth > 575 ? 3 : 2;
    let cardsPerRow_Horizontal = dWidth > 575 ? 2 : 1;

    let portraitList = (
        <FlatList 
            contentContainerStyle = {styles.listWrapper} 
            data={props.renderData}
            numColumns= {cardsPerRow_Portrait}
            renderItem={({ item }) => <PortraitListItem action={props.listAction} data={item} cardsPerRow = {cardsPerRow_Portrait} savingInProgress={props.savingInProgress ? props.savingInProgress : null} updateUIFunction={props.updateUIFunction ? props.updateUIFunction : null} saveWishlistError={props.saveWishlistError ? props.saveWishlistError : null} />}
            keyExtractor={item => {return item.id}}

            showsVerticalScrollIndicator = {false}
            decelerationRate = 'normal'
            onRefresh = {() => props.onRefresh()}
            refreshing = {props.refreshing}
        />
    )

    let horizontalList = (
        <FlatList 
            contentContainerStyle = {styles.listWrapper} 
            data={props.renderData}
            numColumns= {cardsPerRow_Horizontal}
            renderItem={({ item }) => <HorizontalListItem action={props.listAction} data={item} cardsPerRow = {cardsPerRow_Horizontal} savingInProgress={props.savingInProgress ? props.savingInProgress : null} updateUIFunction={props.updateUIFunction ? props.updateUIFunction : null} saveWishlistError={props.saveWishlistError ? props.saveWishlistError : null} />}
            keyExtractor={item => {return item.id}}

            showsVerticalScrollIndicator = {false}
            decelerationRate = 'normal'
            onRefresh = {() => props.onRefresh()}
            refreshing = {props.refreshing}
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
