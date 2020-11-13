import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, ScrollView,Platform,TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import {Navigation} from 'react-native-navigation';
import debounce from 'lodash.debounce';

import Header from '../../components/Headers/createWishlistHeader';
import ButtonView from '../../UIComponents/Buttons/ButtonWithShadow/floatingButton';
import * as Fade from '../../UIComponents/GradientFade/gradientFade';

import * as iconSVG from '../../SVG_Files/wishlistIconsSVG';
import {categories} from '../../includes/datasets';
import {getCategoryDisplay} from '../../includes/functions'

let dHeight = Dimensions.get("window").height;
let dWidth = Dimensions.get("window").width;

let Touchable = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity ;

class selectCategory extends Component {

    state={
        categories: categories,
        selectedCategory: null
    }

    goBack = () =>{
        Navigation.pop(this.props.componentId);
    }

    goToNext = debounce(() =>{
        // alert('ddd')
        Navigation.push(this.props.componentId, {
          component: {
            name: 'com.lysts.screen.createWishlist', // Push the screen registered with the 'Settings' key
            options: { // Optional options object to configure the screen
              bottomTabs: {
                animate: false,
                visible: false
              },
            },
            passProps: {
                selectedCategory: this.state.selectedCategory,
                setNewListAdded: this.props.setNewListAdded
            }
          }
        });
      }, 1000, {leading: true,trailing: false})

    listCategories = () =>{
        let categoriesList = this.state.categories;
        let selectedCategory = this.state.selectedCategory;
        return categoriesList.map((item,key) => {
            let Icon = iconSVG[item];
            Icon = Icon ? Icon : iconSVG['birthday'];
            let ifSelected = item === selectedCategory ? true : false;
            return (
            <View style={styles.selectBoxWrapper} key={key}>
                <Touchable useForeground={true} activeOpacity={0.9} onPress={() => {
                    this.setState({
                        selectedCategory: item
                    })
                }}>
                    <View style={[styles.selectBox, ifSelected ? styles.selectBoxSelected : null]}>
                        <View style={styles.selectTextWrapper}><Text style={[styles.selectText, ifSelected ? styles.selectTextSelected : null]}>{getCategoryDisplay(item)}</Text></View>
                        <View style={styles.iconWrapper}>
                            <Icon height={47 } width={47 } />
                        </View>
                    </View>
                </Touchable>
            </View>
            )
        })
    }

    render() {
        

        return (
            <View style={styles.container}>
                <Header 
                    text = {'Wishlist \nCategory'}
                    subText='This will help us in recommending better experiences in updated versions '
                    onPress={() => {this.goBack()}}
                />
                <View style={styles.scrollWrapper}>
                    <ScrollView 
                        style={styles.scrollView}
                        showsVerticalScrollIndicator = {false}
                        decelerationRate = 'normal'
                    >
                        <View style={styles.scrollViewContainer}>{this.listCategories()}</View>
                    </ScrollView>
                    <Fade.Top />
                    <Fade.Bottom />
                </View>
                {this.state.selectedCategory !== null ? <ButtonView onPress={()=>{this.goToNext()}}>Continue</ButtonView> : null}
            </View>
        )
    }
}

export default selectCategory;

const styles = StyleSheet.create({
    container:{
        flex:1,
        width: dWidth,
        height: dHeight,
        backgroundColor: '#fff'
    },
    scrollWrapper:{
        flex: 1,
        marginTop: 20
    },
    scrollView:{
        flex: 1,
    },
    scrollViewContainer:{
        flex: 1,
        marginBottom: 100,
        marginTop: 30,
    },
    selectBoxWrapper:{
        overflow: 'hidden',
        borderRadius: 20,
        marginBottom: 15,
        marginHorizontal: 15,
    },
    selectBox:{
        backgroundColor: '#F9F9F9',
        height: 85,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        borderRadius: 20,
        paddingHorizontal: 25
    },
    selectBoxSelected:{
        backgroundColor: '#515D70',
    },
    selectTextWrapper:{
        paddingLeft: 10,
        paddingTop: 5
    },
    selectText:{
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
        color: '#515D70',
    },
    selectTextSelected:{
        color: '#fff'
    },
    iconWrapper:{
        marginTop: 5
    }
})
