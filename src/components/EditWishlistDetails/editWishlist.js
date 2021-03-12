import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Wizard from 'react-native-wizard';
import Svg, { Path } from "react-native-svg";
import NetInfo from "@react-native-community/netinfo";

import InfoForm from '../Forms/wishlistForms/wishlistInfoForm';
import ItemsForm from '../Forms/wishlistForms/wishlistItemsForm';
import ModalButtonView from '../../UIComponents/Buttons/ModalButton/modalButtonView';
import ErrorSuccessAlert from '../../components/Alerts/ErrorSuccess/errorSuccessAlert';
import NoConnectionAlert from '../../components/Alerts/noConnection/noConnectionAlert';

import {removeExcessWhiteSpace} from '../../includes/functions';
import {dHeight} from '../../includes/variables';

export default class editWishlist extends Component {
    wizard = React.createRef();
    timeoutAlert;
    unsubscribeNetworkUpdate;

    initialList = this.props.wishlistInfo.listItems.map((itemObject) => (itemObject.item));

    state={
        showError: false,
        savingData: false,
        wizard:{
            currentStep: 0
        },
        wishlistInfo:{
            name: {
              value: this.props.wishlistInfo.name,
              focused: false
            },
            category:{
              value: this.props.wishlistInfo.category,
              focused: false
            },
            description:{
              value: this.props.wishlistInfo.description,
              focused: false
            }
        },
        listItems: this.props.wishlistInfo.listItems.map((itemObject) => (itemObject.item)),
        alertMessage:{
            show: false,
            type: '',
            title:'',
            subtitle: ''
        },
        hasNetworkConnection: true,
    }


    componentDidMount(){
        this.unsubscribeNetworkUpdate = NetInfo.addEventListener(state => {
        //   console.log("Connection type", state.type);
        //   console.log("Is connected?", state.isConnected);
          this.setState({hasNetworkConnection: state.isConnected});
        });
      }
    
      componentWillUnmount(){
        this.unsubscribeNetworkUpdate();
        clearTimeout(this.timeoutAlert)
      }

    setInfoState = (parentKey, childKey, childValue) => {
        this.setState({
            wishlistInfo: {
                ...this.state.wishlistInfo,
                [parentKey] : {
                    ...this.state.wishlistInfo[parentKey],
                    [childKey]: typeof childValue == 'string' ? removeExcessWhiteSpace(childValue) : childValue
                }
            }
        })
    };

    onAddItem = () => {
        this.setState(state => {
          return {
            listItems : state.listItems.includes("") ? state.listItems : state.listItems.concat('')
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
          return {
            listItems: state.listItems.filter((item, i) => index !== i),
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

    onRemoveAllEmptyItemsForSaving = () => {
        this.setState(state => {
            const listItems = state.listItems.filter((item) => {
                return (item.trim() === '') ? false : true
            });
        
            return {
                savingData: false,
                listItems,
            };
        });
    }

    
    arraysMatch = (arr1, arr2) => {
        // Create temporary arrays where all empty elements are removed 
        let tempArr1= arr1.filter((item) => {
            return (item.trim() === '') ? false : true
        });

        let tempArr2= arr2.filter((item) => {
            return (item.trim() === '') ? false : true
        });


        // Check if the arrays are the same length
        if (tempArr1.length !== tempArr2.length) return false;
    
        // Check if all items exist and are in the same order
        for (var i = 0; i < tempArr1.length; i++) {
            if (tempArr1[i] !== tempArr2[i]) return false;
        }
    
        // Otherwise, return true
        return true;
    
    };
    
    saveWishlist = () => {
        try{
            let realm = this.props.realmInfo;

            realm.write(() => {
                let wishlistData = realm.objects("wishlist").filtered(`code == '${this.props.wishlistCode}'`)[0]; 
                let filteredListItems = this.state.listItems.filter((item) => {
                    return (item.trim() === '') ? false : true
                });
                let listItems = JSON.parse(JSON.stringify(this.props.wishlistInfo.listItems));

                // console.log(listItems);

                wishlistData.name = this.state.wishlistInfo.name.value;
                wishlistData.category = this.state.wishlistInfo.category.value;
                wishlistData.description = this.state.wishlistInfo.description.value;
                wishlistData.dateModified = new Date();

                

                if(this.arraysMatch(this.initialList, this.state.listItems)){ 
                    // Do Nothing
                }else{
                    let wishlistItems = filteredListItems.map(item => {
                        for (let listItem of listItems) {
                            if(listItem.item == item){
                                return { item,status: listItem.status}
                            } 
                        }

                        return {item, status: "active"}
                    });

                    wishlistData.listItems = wishlistItems;
                }
            });

            

            this.props.updateUI ? this.props.updateUI() : null;

            this.props.closeFunction ? this.props.closeFunction() : null
        } catch (error) {
            this.setState({
                alertMessage:{
                    show: true,
                    type: 'error',
                    title:'Updates couldn\'t save...',
                    subtitle: 'Kindly check your internet connection'
                }
            })
            // throw `Error saving to realm: ${JSON.stringify(error,null,2)}`;
            
        }
    }

    resetAlert = () => {
        this.timeoutAlert = setTimeout(()=>{
            this.setState({alertMessage: {show: false}})
            clearTimeout(this.timeoutAlert);
        }, 4500)
      }

    render() {

        let stepsList = [
            {
                content: (
                    <InfoForm 
                        selectedCategory={this.state.wishlistInfo.category} 
                        infoState = {this.state.wishlistInfo} 
                        setInfoState={this.setInfoState} 
                        showError={this.state.showError} 
                        backspaceEvent={() => {this.state.showError ? null : this.setState({showError : true})}} 
                        customFormWrapperStyle = {{paddingHorizontal: 0, paddingTop: 10}}
                    />
                )
            },
            {
                content: (
                    <ItemsForm 
                        items= {this.state.listItems} 
                        onUpdateItem={this.onUpdateItem} 
                        onRemoveItem={this.onRemoveItem}
                        onRemoveAllEmptyItems = {this.onRemoveAllEmptyItems}
                        hideActions={true}
                        customFormWrapperStyle = {{paddingHorizontal: 0}}
                    />
                )
            }
        ]

        this.state.alertMessage.show ? this.resetAlert() : null;
        
        return (
            <View style={styles.container}>
                  <View style={styles.topBarWrapper}>
                      <View style={styles.topBarItem}>
                          <TouchableOpacity onPress={() => this.props.onClose()}>
                             <View><Text style={styles.topBarActionText}>Cancel</Text></View> 
                          </TouchableOpacity>
                      </View>
                      <View style={styles.topBarItem}>
                          <View><Text style={styles.topBarText}>Wishlist</Text></View> 
                      </View>
                      <View style={styles.topBarItem}>
                          <TouchableOpacity onPress={() => this.onAddItem()} disabled={(this.state.wizard.currentStep == 0)} activeOpacity={(this.state.wizard.currentStep == 0) ? 1 : 0.8}>
                             <View style={styles.topBarIcon}>
                                <Svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 57 57"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path
                                        d="M28.48 3.52v50.4M3.281 28.72h50.4"
                                        stroke= {(this.state.wizard.currentStep == 0) ? "#DCDFE2" : "#515D70"}
                                        strokeWidth={6}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </Svg>
                             </View> 
                          </TouchableOpacity>
                      </View>
                  </View>
                  <View style={styles.tabsWrapper}>
                    <View style={styles.tab}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.wizard.current.prev()}>
                            <View><Text style={[styles.tabText, this.state.wizard.currentStep == 0 ? styles.tabActiveStyle : styles.tabInactiveStyle]}>Info</Text></View>
                        </TouchableOpacity> 
                    </View>
                    <View style={styles.tab}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.wizard.current.next()}>
                            <View><Text style={[styles.tabText, this.state.wizard.currentStep == 1 ? styles.tabActiveStyle : styles.tabInactiveStyle]}>List Items</Text></View>
                        </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.wizardWrapper} >
                    <Wizard 
                        // activeStep = {this.state.wizard.currentStep}
                        // currentStep={({ currentStep }) => {this.setState({wizard:{...this.state.wizard, currentStep:currentStep}})}}
                        ref={this.wizard}
                        activeStep={0}
                        steps = {stepsList}
                        prevStepAnimation = 'fade'
                        nextStepAnimation='fade'
                        useNativeDriver = {true}
                        contentContainerStyle ={styles.wizardContentContainer}
                        onNext={()=>{
                            this.setState({wizard:{currentStep: 1}})
                        }}
                        onPrev={()=>{
                            this.setState({wizard:{currentStep: 0}})
                        }}
                    />
                  </View>
                  {this.state.hasNetworkConnection ? <View style={styles.ModalButtonWrapper}>
                    <ModalButtonView 
                        buttonText = 'Save'
                        onPress={() => {this.saveWishlist()}}
                    />
                  </View> : <NoConnectionAlert 
                      wrapperContainerStyle={{
                        width: '100%',
                        bottom: 0
                      }}
                  />}
                  {this.state.alertMessage.show ? (<ErrorSuccessAlert 
                    type = {this.state.alertMessage.type}
                    title = {this.state.alertMessage.title}
                    subtitle = {this.state.alertMessage.subtitle}
                /> )
                : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        // flex:1
        position: 'relative',
        height: dHeight - ((dHeight * 20)/100) - (20 + 5 + 30)
    },
    topBarWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    topBarItem:{
        width: '33.33333333333%'
    },
    topBarActionText:{
        fontSize: 15.8,
        fontFamily: 'Poppins-Medium',
        color: '#515D70'
    },
    topBarText:{
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        color: '#515D70'
    },
    topBarIcon:{
        width: '100%',
        alignItems: 'flex-end'
    },
    tabsWrapper:{
        flexDirection: 'row'
    },
    tab: {
        width: '50%',
    },
    tabText:{
        fontSize: 15.5,
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 0,
        borderColor: '#515D70',
        borderWidth: 1.8,
        borderStyle: 'solid'
    },
    tabActiveStyle:{
        backgroundColor: '#515D70',
        color:'#ffffff'
    },
    tabInactiveStyle:{
        backgroundColor: '#ffffff',
        color:'#515D70'
    },

    wizardWrapper:{
        flex:1
    },
    wizardContentContainer:{
        flex:1,
        paddingTop: 10
    },

    ModalButtonWrapper:{
        position:'absolute',
        bottom: -30,
        width: '100%'
    }
})
