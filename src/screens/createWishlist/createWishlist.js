import React, { Component } from 'react'
import Realm from 'realm';
import { Text, StyleSheet, View, BackHandler} from 'react-native'
import Wizard from 'react-native-wizard';
import {Navigation} from 'react-native-navigation';
import NetInfo from "@react-native-community/netinfo";

import Header from '../../components/Headers/createWishlistHeader';
import InfoForm from '../../components/Forms/wishlistForms/wishlistInfoForm';
import ItemsForm from '../../components/Forms/wishlistForms/wishlistItemsForm';
import CreationPreview from '../../components/wishlistCreation/creationPreview';
import ErrorSuccessAlert from '../../components/Alerts/ErrorSuccess/errorSuccessAlert';
import NoConnectionAlert from '../../components/Alerts/noConnection/noConnectionAlert';

import ButtonView from '../../UIComponents/Buttons/ButtonWithShadow/floatingButton';
import {removeExcessWhiteSpace} from '../../includes/functions';
import {dWidth, dHeight} from '../../includes/variables';


import {app as realmApp} from '../../../storage/realm';
import {WishlistSchemas} from '../../../storage/schemas';
import {ObjectId} from 'bson';

let prevComponentId;

class createWishlist extends Component {
    
    // Class Variables
    realm;
    wishlistCode;
    user = realmApp.currentUser;
    timeoutAlert;
    unsubscribeNetworkUpdate;

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
            showError: false,
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
            hasNetworkConnection: null,
            alertMessage:{
                show: false,
                type: '',
                title: '',
                subtitle: '',
            },
            savingInfo: false,
        };
    }

    componentDidMount() {
        prevComponentId = global.activeComponentId;
        global.activeComponentId = this.props.componentId;

        BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );

        this.unsubscribeNetworkUpdate = NetInfo.addEventListener(state => {
            // console.log("Connection type", state.type);
            // console.log("Is connected?", state.isConnected);
            this.setState({hasNetworkConnection: state.isConnected});
            
        });
    }
    
    componentWillUnmount() {
        global.activeComponentId = prevComponentId;

        BackHandler.removeEventListener(
            "hardwareBackPress",
            this.backAction
        );
        clearTimeout(this.timeoutAlert);
        this.unsubscribeNetworkUpdate();

        (typeof this.realm !== 'undefined' && this.realm !== null && this.realm !== "") ? (this.realm.isClose ? null : this.realm.close()) : null
    }

    onAddItem = () => {
        this.setState(state => {
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
            this.setState({savingInfo: true})
        } else {
            this.wizard.current.next();
        }
        return true;
     }
    
     createNewWishlist = () => {
        try{
        //   console.log(`Logged in with the user: ${this.user.id}`);
          let newWishlist;
          let listItems = this.state.listItems.map(item => ({
            item, 
            status: "active"
          }))

          this.wishlistCode = "LY" + this.randomString(4);
          
          const config = {
            schema: [
              WishlistSchemas.wishlistSchema,
              WishlistSchemas.wishlist_listItemsSchema
            ],
            sync: {
              user: this.user,
              partitionValue: "public",
              error: (s, e) => {
                //   console.log(`An error occurred with sync session with details: \n${s} \n\nError Details: \n${e}`);
                  this.setState((prevState) => ({
                    wizard:{
                        ...prevState.wizard,
                        infoButtonDisabledStatus: true
                    },
                    savingInfo: false,
                    alertMessage:{
                        show: true,
                        type: 'error',
                        title: 'Error Syncing With Server...',
                        subtitle: 'Kindly check your network connection',
                    }
                  }))
                }
            },
          };
          

          Realm.open(config).then((realm) => {
            this.realm = realm;
            let keepCheckingCode = true
            while(keepCheckingCode){
                let wishlistObject = this.realm.objects("wishlist").filtered(`code == '${this.wishlistCode}'`);
                if(wishlistObject.length > 0){
                    this.wishlistCode = "LY" + this.randomString(4)
                }else{
                    keepCheckingCode = false
                }
            }

            this.realm.write(() => {
                newWishlist = realm.create("wishlist", { 
                    _id : new ObjectId(),
                    _partition : 'public',
                    name: this.state.wishlistInfo.name.value,
                    category: this.state.wishlistInfo.category.value,
                    code: `${this.wishlistCode}`,
                    dateCreated: new Date(),
                    dateModified: new Date(),
                    description: this.state.wishlistInfo.description.value,
                    owner: this.user.id,
                    status: 'active',
                    listItems
                });
            });

            this.props.setNewListAdded(true,this.state.wishlistInfo.name.value, `${this.wishlistCode}`, `https://lystsapp.com/wishlink/${this.wishlistCode}`, {
                id: `temp_id_${Math.random()}`,
                name: this.state.wishlistInfo.name.value,
                type: this.state.wishlistInfo.category.value,
                code: `${this.wishlistCode}`,
                saved: false,
            });
            Navigation.popToRoot(this.props.componentId);
            // Vibration.vibrate(350);
          }).catch((e) => {
            // console.log(e);
            this.setState({
                savingInfo: false,
                alertMessage:{
                    show: true,
                    type: 'error',
                    title: 'Wishlist Creation Failed',
                    subtitle: 'Please check your network connection...',
                }
            })
          })
        } catch (error) {
            // console.log(error);
            this.setState({
                savingInfo: false,
                alertMessage:{
                    show: true,
                    type: 'error',
                    title: 'Error Connection To Server',
                    subtitle: 'Please check your network connection...',
                }
            })
            // throw `Error opening realm: ${JSON.stringify(error,null,2)}`;
            
        }
      }

      randomString = (length, chars = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ') => {
        length = Math.floor(length);
        let firstChar = 'ADEJMNUVXY'
        let result = firstChar[Math.round(Math.random() * (firstChar.length - 1))];
        for (let i = (length-1); i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return (length < 1) ? '' : result;
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
                content: <InfoForm selectedCategory={this.props.selectedCategory} infoState = {this.state.wishlistInfo} setInfoState={this.setInfoState} showError={this.state.showError} backspaceEvent={() => {this.state.showError ? null : this.setState({showError : true})}} />
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

        
        this.state.alertMessage.show ? this.resetAlert() : null;

        this.state.savingInfo ? this.createNewWishlist() : null;

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

               {this.state.hasNetworkConnection ? buttonDisabledStatus ? null : (
                    <ButtonView disabled={this.state.savingInfo} onPress={() => {this.nextAction()}}>{
                        this.state.savingInfo ? 'Please wait...' : currentStepValue == 1 ? 'Preview' : currentStepValue == 2 ? 'Finish' : 'Next'
                    }</ButtonView>
               ) : <NoConnectionAlert wrapperContainerStyle={{top: dHeight - 20 - 55 }} />}

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
