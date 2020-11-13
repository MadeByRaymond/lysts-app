import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions,Platform, TouchableNativeFeedback, TouchableOpacity,BackHandler } from 'react-native'
import Wizard from 'react-native-wizard';
import {Navigation} from 'react-native-navigation';

import Header from '../../components/Headers/createWishlistHeader';
import InfoForm from '../../components/Forms/wishlistForms/wishlistInfoForm';
import ItemsForm from '../../components/Forms/wishlistForms/wishlistItemsForm';
import CreationPreview from '../../components/wishlistCreation/creationPreview';

import ButtonView from '../../UIComponents/Buttons/ButtonWithShadow/floatingButton';
import {removeExcessWhiteSpace} from '../../includes/functions';

let dHeight = Dimensions.get("window").height;
let dWidth = Dimensions.get("window").width;

let Touchable = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity ;

class createWishlist extends Component {

    constructor(props) {
        super(props)
        this.wizard = React.createRef();

        this.state = { 
            wizard:{
                currentStep: 0,
                isLastStep: false,
                infoButtonDisabledStatus: true,
                itemButtonDisabledStatus: true,
            },
            wishlistInfo:{
              name: {
                value: '',
                focused: false
              },
              category:{
                value: props.selectedCategory,
                focused: false
              },
              description:{
                value: '',
                focused: false
              }
            },
            listItems: [
                '',
            ],
            previewDetails:{
                svgHeight: 0,
                expandIndex: null
            },



            // wizard:{
            //     currentStep: 0,
            //     isLastStep: false,
            //     infoButtonDisabledStatus: false,
            //     itemButtonDisabledStatus: true,
            // },
            // wishlistInfo:{
            //   name: {
            //     value: 'Raymond’s Ultimate House Warming List',
            //     focused: false
            //   },
            //   category:{
            //     value: 'house_warming',
            //     focused: false
            //   },
            //   description:{
            //     value: '',
            //     focused: false
            //   }
            // },
            // listItems: [
            //     'A Daisy Lamp',
            //     '4TB Western Digital External Hard Disk Drive',
            //     'Leicester Football Jersey',
            //     '4TB Western Digital External Hard Disk Drive',
            //     'Leicester Football Jersey',
            //     '4TB Western Digital External Hard Disk Drive',
            //     'Leicester Football Jersey',
            //     '4TB Western Digital External Hard Disk Drive',
            //     'Leicester Football Jersey',
            //     '4TB Western Digital External Hard Disk Drive',
            //     'Leicester Football Jersey',
            //     '4TB Western Digital External Hard Disk Drive',
            //     'Leicester Football Jersey',
            //     '4TB Western Digital External Hard Disk Drive',
            //     'Leicester Football Jersey',
            //     '4TB Western Digital External Hard Disk Drive',
            //     'Leicester Football Jersey',
            //     '4TB Western Digital External Hard Disk Drive',
            //     'Leicester Football Jersey',
            //     '4TB Western Digital External Hard Disk Drive',
            //     'Leicester Football Jersey',
            //     '4TB Western Digital External Hard Disk Drive',
            //     'Leicester Football Jersey'
            // ]
        };
    }

    componentDidMount() {
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    onAddItem = () => {
        this.setState(state => {
        //   if (state.listItems.includes("")){
        //       if(state.listItems.){
        //         let d = [].
        //       }
        //   }
          const listItems = state.listItems.includes("") ? state.listItems : state.listItems.concat('');
     
          return {
            listItems
          };
        });
      };

    onUpdateItem = (value, index) => {
        this.setState(state => {
          const listItems = state.listItems.map((item, i) => {
            if (i === index) {
              return (
                  value.trim() === '' ? '' 
                  : value !== value.trim() ? value === (value.trim() + ' ') ? (value.trim() + ' ') : (value.trim() + ' ') 
                  : value
                );
            }else{
                return item; 
            }
          });
     
          return {
            listItems,
          };
        });
      };

    onRemoveItem = (index) => {
        this.setState(state => {
          const listItems = state.listItems.filter((item, i) => index !== i);
     
          return {
            listItems,
          };
        });
      };

    onRemoveAllEmptyItems = () => {
        this.setState(state => {
            const listItems = state.listItems.filter((item, i) => {
                if(item.trim() === ''){
                    if(i === (state.listItems.length - 1)){ return true 
                    }else{ return false }
                }else{ return true }
            });
       
            return {
              listItems,
            };
          });
      }

    onClearItems = () => {
        this.setState({ listItems: [''] });
    };

    setInfoState = (parentKey, childKey, childValue) =>{
        let buttonDisabledStatus = this.state.wizard.infoButtonDisabledStatus;
        if (parentKey == 'name'){
            if(typeof childValue == 'boolean'){
                if(this.state.wishlistInfo.name.value.trim() == '' || this.state.wishlistInfo.name.value.trim().length < 3){buttonDisabledStatus = true;}else{buttonDisabledStatus = false;}
            } else if(childValue.toString().trim() == '' || childValue.toString().trim().length < 3)
            {buttonDisabledStatus = true;} else {buttonDisabledStatus = false;}
        }else{
            if(this.state.wishlistInfo.name.value.trim() == '' || this.state.wishlistInfo.name.value.trim().length < 3){buttonDisabledStatus = true;}else{buttonDisabledStatus = false;}
        }

        this.setState({
            wishlistInfo: {
                ...this.state.wishlistInfo,
                [parentKey] : {
                    ...this.state.wishlistInfo[parentKey],
                    [childKey]: typeof childValue == 'string' ? removeExcessWhiteSpace(childValue) : childValue
                }
            },
            wizard: {
                ...this.state.wizard,
                infoButtonDisabledStatus: buttonDisabledStatus
            }
        })
    }

    backAction = () =>{
       if(this.state.wizard.currentStep === 0){
            Navigation.pop(this.props.componentId);
       } else {
           this.wizard.current.prev();
       }
       return true;
    }

    nextAction = () =>{
        if(this.state.wizard.currentStep === 1){
            this.setState(state => {
                const listItems = state.listItems.filter((item) => item.trim() !== '');
           
                return {
                    previewDetails:{
                        ...state.previewDetails, 
                        expandIndex: 0
                    },
                    listItems,
                };
            });

            this.wizard.current.next();
        } else if(this.state.wizard.currentStep === 2){
            this.props.setNewListAdded(true,this.state.wishlistInfo.name.value, 'WLA235B', 'hhxhdh');
            Navigation.popToRoot(this.props.componentId);
        } else {
            this.wizard.current.next();
        }
        return true;
     }
     
    render() {
        let stepsList = [
            {
                content: <InfoForm selectedCategory={this.props.selectedCategory} infoState = {this.state.wishlistInfo} setInfoState={this.setInfoState} />
            },
            {
                content: (
                    <ItemsForm 
                        items= {this.state.listItems} 
                        onUpdateItem={this.onUpdateItem} 
                        onRemoveItem={this.onRemoveItem}
                        onClearItems={this.onClearItems}
                        onAddItem = {this.onAddItem}
                        onRemoveAllEmptyItems = {this.onRemoveAllEmptyItems}
                    />
                )
            },
            {
                content: (
                    <CreationPreview 
                        name = {this.state.wishlistInfo.name.value}
                        category = {this.state.wishlistInfo.category.value}
                        items={this.state.listItems} 
                        setSVGHeight = {(height) => {this.setState({previewDetails:{...this.state.previewDetails, svgHeight: height}})}}
                        svgHeight = {this.state.previewDetails.svgHeight}
                        setExpandIndex = {(index) => {this.setState({previewDetails:{...this.state.previewDetails, expandIndex: index == this.state.previewDetails.expandIndex ? null : index}})}}
                        expandIndex = {this.state.previewDetails.expandIndex}
                    />
                )
            }
        ]

        let currentStepValue = this.state.wizard.currentStep;
        let buttonDisabledStatus;
        if (currentStepValue == 0) {
            buttonDisabledStatus = this.state.wizard.infoButtonDisabledStatus;
        } else if (currentStepValue == 1) {
            buttonDisabledStatus = (
                (this.state.listItems.length == 1 && this.state.listItems[0].trim() === '') || 
                (this.state.listItems.length > 1 &&  this.state.listItems.filter((item, i) => item.trim() == '').length == this.state.listItems.length)
            )
        } else {
            buttonDisabledStatus = false;
        }
        return (
            <View style={styles.container}>

                <Header 
                    text = {'Create Your \nWishlist'}
                    onPress={() => {this.backAction()}}
                />

                <View style={styles.titleBoxWrapper}>
                    <View style={styles.titleBox}>
                        <View>
                            <Text 
                                style={[
                                    styles.title, 
                                    currentStepValue == 0 ? {color:'#C06A46'} : null,
                                    currentStepValue > 0 ? {color:'#CFA280'} : null
                                ]}
                            >Info</Text>
                        </View>
                        {currentStepValue == 0 ? <View style={styles.activeIndicator}></View> : null}
                    </View>
                    <View style={styles.titleBox}>
                        <View>
                            <Text 
                                style={[
                                    styles.title, 
                                    currentStepValue == 1 ? {color:'#C06A46'} : null,
                                    currentStepValue > 1 ? {color:'#CFA280'} : null,
                                ]}
                            >List Items</Text>
                        </View>
                        {currentStepValue == 1 ? <View style={styles.activeIndicator}></View> : null}
                    </View>
                    <View style={styles.titleBox}>
                        <View>
                            <Text 
                                style={[
                                    styles.title, 
                                    currentStepValue == 2 ? {color:'#C06A46'} : null,
                                ]}
                            >Preview</Text>
                        </View>
                        {currentStepValue == 2 ? <View style={styles.activeIndicator}></View> : null}
                    </View>
                </View>
                
                <View style={styles.wizardWrapper}>
                    <Wizard 
                        // activeStep = {this.state.wizard.currentStep}
                        currentStep={({ currentStep }) => {this.setState({wizard:{...this.state.wizard, currentStep:currentStep}})}}
                        ref={this.wizard}
                        activeStep={0}
                        steps = {stepsList}
                        prevStepAnimation = 'fade'
                        nextStepAnimation='fade'
                        useNativeDriver = {true}
                        contentContainerStyle ={{flex:1}}
                        onPrev={()=>{
                            this.setState({wizard:{...this.state.wizard}})
                        }}
                    />
                </View>

               {buttonDisabledStatus ? null : (
                    <ButtonView onPress={() => {this.nextAction()}}>{
                        currentStepValue == 0 ? 'Next' : currentStepValue == 1 ? 'Preview' : currentStepValue == 2 ? 'Finish' : 'Next'
                    }</ButtonView>
               )}
                
            </View>
        )
    }
}

export default createWishlist;

const styles = StyleSheet.create({
    container:{
        flex:1,
        width: dWidth,
        height: dHeight,
        backgroundColor: '#fff'
    },
    wizardWrapper:{
        flex:1
    },

    titleBoxWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 60,
        marginHorizontal: 30,
        paddingBottom: 20,
        paddingHorizontal: 5,
        paddingRight: 30,
        borderBottomWidth: 2,
        borderBottomColor: '#F2F2F2',
        paddingRight: dWidth > 575 ? ((dWidth - 60) - 485) : 30
    },
    titleBox:{
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title:{
        fontSize: 19,
        fontFamily: 'Poppins-SemiBold',
        color: '#515D70',
        marginBottom: 3
    },
    activeIndicator:{
        backgroundColor: '#515D70',
        height: 8,
        width: 8,
        borderRadius: 1000
    }

})
