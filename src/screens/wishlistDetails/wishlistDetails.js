import React, { Component } from 'react'
import Realm from 'realm';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { Navigation } from "react-native-navigation";
import Svg, { Circle, Path } from "react-native-svg";
import NetInfo from "@react-native-community/netinfo";
import debounce from 'lodash.debounce';
import Clipboard from "@react-native-community/clipboard";

import {ActionsModal} from '../../UIComponents/Modals/ActionsModal';
import DefaultModal from '../../UIComponents/Modals/DefaultModal';
import {wishlistDetailsError, wishlistNotExist, noInternet} from '../../SVG_Files/UI_SVG/errors';
import ErrorView from '../../components/Errors/errorView';
import ErrorSuccessAlert from '../../components/Alerts/ErrorSuccess/errorSuccessAlert';
import NoConnectionAlert from '../../components/Alerts/noConnection/noConnectionAlert';
import AvatarRender from '../../components/avatarRender/avatarRender';

import * as ImageSVG from '../../SVG_Files/viewWishlistSVG';
import Loader from '../../components/Loader/loader';
import {Bottom as FadeBottom} from '../../UIComponents/GradientFade/gradientFade';
import {getCategoryDisplay, onShare, onBookmark as onBookmarkFunc, onReport as onReportFunc} from '../../includes/functions';
import {dWidth, dHeight, mongoClientCluster} from '../../includes/variables';
import {categories, avatarCustomizer} from '../../includes/datasets';

import {app as realmApp} from '../../../storage/realm';
import * as Schemas from '../../../storage/schemas';

// let pexels = (value) =>{return PixelRatio.getPixelSizeForLayoutSize(value)};
let prevComponentId;

export default class wishlistDetails extends Component {

    // Class Variables
    realm;
    user = realmApp.currentUser;
    // notLoggedIn = (this.user) ? ((!this.user.isLoggedIn) ? true : false) : true;
    notLoggedInAndAnonymous = (this.user) ? ((!this.user.isLoggedIn || this.user.providerType == 'anon-user') ? true : false) : true;
    showTopBar;
    unsubscribeNetworkUpdate;
    timeoutAlert;

    state={
        isOwner: null,
        isLoading: true,
        isArchived: null,
        isSaved: null,
        silentReload: false,
        goBack: false,
        scrollPosition: 0,
        loaderProgress: 0,
        updateSettings: true,
        hasNetworkConnection: null,
        wishlistInfo:{
            name: '',
            category: categories[0],
            ownerId: '',
            owner: '',
            dateCreated: '',
            description:'',
            listItems: [
                // {
                //     item: 'A Daisy Lamp',
                //     status: 'active'
                // }
            ]
        },
        avatarFeatures: {
            accessory : `${avatarCustomizer.accessory[0]}`,
            bgColor : `${avatarCustomizer.bgColor[0]}`,
            bgShape : `${avatarCustomizer.bgShape[0]}`,
            body : `${avatarCustomizer.body[0]}`,
            clothing : 'shirt',
            clothingColor : `${avatarCustomizer.clothingColor[0]}`,
            eyebrows : `${avatarCustomizer.eyebrows[0]}`,
            eyes : `${avatarCustomizer.eyes[0]}`,
            facialHair : 'none',
            graphic : 'none',
            hair : 'none',
            hairColor : `${avatarCustomizer.hairColor[0]}`,
            hat : 'none',
            hatColor : `${avatarCustomizer.hatColor[0]}`,
            lashes : false,
            lipColor : 'red',
            mouth : `${avatarCustomizer.mouth[0]}`,
            showBackground : true,
            skinTone : `${avatarCustomizer.skinTone[0]}`,
        },
        noData: {value:true, message: 'Loading...', svgComponent: wishlistNotExist},
        actionsModal : false,
        actionsModalOwnerItems:[
            {
                text: 'Edit Wishlist',
                action: () => {this.onEdit()},
                disabled: false
            },
            {
                text: 'Copy code',
                action: () => {Clipboard.setString(this.props.wishlistCode)},
                disabled: false
            },
            {
                text: 'Share to...',
                action: () => {onShare('Share your Wishlink', `Checkout my Wishlist on Lysts App with https://lystsapp.com/wishlink/${this.props.wishlistCode}`, this.state.wishlistInfo.name)},
                disabled: false
            },
            {
                text: 'Mark all as done',
                action: () => {this.onMarkAllItemsComplete()},
                disabled: false
            },
            {
                text: 'Bookmark',
                action: () => {
                    //Sets Dynamically With State
                },
                disabled: false
            },
            {
                text: 'Archive',
                action: () => {
                    //Sets Dynamically With State
                },
                disabled: false
            },
            {
                text: 'Delete',
                action: () => {this.onDelete()},
                disabled: false
            },
        ],
        actionsModalGuestItems:[
            {
                text: 'Save wishlist',
                action: () => {
                    //Sets Dynamically With State
                },
                disabled: this.notLoggedInAndAnonymous
            },
            {
                text: 'Copy code',
                action: () => {Clipboard.setString(this.props.wishlistCode)},
                disabled: false
            },
            {
                text: 'Share to...',
                action: () => {onShare('Share this Wishlink', `Checkout ${this.state.wishlistInfo.owner}'s Wishlist on Lysts App with https://lystsapp.com/wishlink/${this.props.wishlistCode}`, this.state.wishlistInfo.name)},
                disabled: false
            },
            {
                text: 'Report...',
                action: () => {this.setState({reportModal: true})},
                disabled: false
            },
        ],
        editModal : false,
        reportModal: false,
        alertMessage: {
            show: false,
            type: '',
            title: '',
            subtitle: ''
        }
    }

    componentDidMount() {
        this.navigationEventListener = Navigation.events().bindComponent(this);

        this.unsubscribeNetworkUpdate = NetInfo.addEventListener(state => {
            // console.log("Connection type", state.type);
            // console.log("Is connected?", state.isConnected);
            state.isConnected 
            ? this.setState({
                hasNetworkConnection: state.isConnected,
                isLoading: this.state.wishlistInfo.name.trim() == '' ? true : false,
                silentReload: this.state.wishlistInfo.name.trim() == '' ? false : true,
                updateSettings: true
            })
            : this.setState({
                hasNetworkConnection: state.isConnected,
                isLoading: false,
                silentReload: false,
                updateSettings: true
            });
            
        });
    
        prevComponentId = global.activeComponentId;
        global.activeComponentId = this.props.componentId;
    }

    componentDidCatch(error, info){
        if(__DEV__){
            console.log(error);
            return;
        }

        // console.log(error, info);
    }

    componentWillUnmount() {
        this.unsubscribeNetworkUpdate();
        clearTimeout(this.timeoutAlert);

        if(this.realm !== null && typeof this.realm !== 'undefined' && this.realm !== ""){
            this.realm.isInTransaction ? this.realm.cancelTransaction() : null;
            this.realm.isClosed ? null : this.realm.close();
        }
        
        global.activeComponentId = prevComponentId;
    }
    
    navigationButtonPressed({ buttonId }) {
        // if (buttonId === 'saveButton') {
        //     Navigation.updateProps('com.lysts.component.SavedButton', {
        //         saved: true,
        //         height: 22,
        //         width: 22,
        //         color: '#515D70'
        //     });
        // }
        
        if (buttonId === 'actionsButton') {
           this.setState({
                actionsModal: true
           });
        }
    }

    getWishlistFromRealm = async () => {
        try{
            let wishlistData = this.realm.objects("wishlist").filtered(`code == '${this.props.wishlistCode}'`);
            
            if (wishlistData.length < 1) { this.setState({
                isLoading: false,
                silentReload: false,
                noData: {value:true, message: "Wishlist doesn't exist", svgComponent: wishlistNotExist}}) } 
            else if ((wishlistData[0].status && wishlistData[0].status != 'active') && wishlistData[0].owner != this.user.id.toString()) {  this.setState({
                isLoading: false,
                silentReload: false,
                noData: {value:true, message: "This wishlist is no longer active", svgComponent: wishlistNotExist}}) } 
            else {
                let ownerData = (
                    wishlistData[0].owner == this.user.id 
                    ? [this.user.customData] 
                    : JSON.parse(JSON.stringify(await this.user.mongoClient(mongoClientCluster).db("lysts").collection("users").find({ userID: `${wishlistData[0].owner}` })))
                );
                
                if (ownerData.length < 1){ this.setState({
                    isLoading: false,
                    silentReload: false,
                    noData: {value:true, message: "This wishlist no longer exists", svgComponent: wishlistNotExist}}) }
                else {                    
                    this.setState({
                        isOwner: (this.user.id == wishlistData[0].owner) ? true : false,
                        isArchived: wishlistData[0].status == 'active' ? false : true,
                        isSaved: this.user.providerType == 'anon-user' ? false  : this.user.customData.savedLists.includes(this.props.wishlistCode),
                        isLoading: false,
                        silentReload: false,
                        noData: {value:false, message: "Wishlist exists"},
                        wishlistInfo: {
                            name: wishlistData[0].name.trim().trimStart(),
                            category: wishlistData[0].category.trim().trimStart(),
                            dateCreated: wishlistData[0].dateCreated,
                            description:wishlistData[0].description.trim().trimStart(),
                            listItems: JSON.parse(JSON.stringify(wishlistData[0].listItems)),
                            ownerId: wishlistData[0].owner,
                            owner: (
                                (typeof ownerData[0].displayName == 'undefined' || ownerData[0].displayName == null || ownerData[0].displayName.trim() == "") 
                                ? `${ownerData[0].fullName.trim().trimStart()}` : ownerData[0].displayName.trim().trimStart())
                        },
                        avatarFeatures: ownerData[0].avatarFeatures
                    })
                }
            }
        }catch(err){
            throw err;
        }
    }

    openRealm = async() => {
        let noLoading = {isLoading: false,silentReload: false};

        try{
        //   console.log(`Logged in with the user: ${this.user.id}`);
          const config = {
            schema: [
                Schemas.WishlistSchemas.wishlistSchema,
                Schemas.WishlistSchemas.wishlist_listItemsSchema
            ],
            sync: {
              user: this.user,
              partitionValue: "public",
              error: async (s, e) => {
                (this.state.wishlistInfo.listItems.length <= 0 && this.state.wishlistInfo.name.trim() == '')
                ? this.setState({
                    ...noLoading,
                    noData: {
                        value:true, 
                        message: "Oops! Error loading wishlist", 
                        svgComponent: wishlistDetailsError, 
                        eachOnNewLine:true, 
                        action: {
                            text: 'Try again',
                            function: () => this.setState({isLoading: true, silentReload: false})
                        }
                    },
                    alertMessage:{show:false}
                }) 
                : this.setState({
                    ...noLoading,
                    alertMessage: {
                        show: true,
                        type: 'warning',
                        title: 'Retrying To Sync With Server...',
                        subtitle: 'Kindly check you network connection'
                    },
                    noData: {value: false}
                })
              }
            },
          };
          

          if(this.realm != null && !this.realm.isClosed){
            await this.getWishlistFromRealm();
          }else{
            this.realm = await Realm.open(config);
            await this.getWishlistFromRealm();
          }
          
        } catch (error) {
            (this.state.wishlistInfo.listItems.length <= 0 && this.state.wishlistInfo.name.trim() == '') 
            ? this.setState({
                ...noLoading,
                noData: {
                    value:true, 
                    message: "Oops! Error loading wishlist", 
                    svgComponent: wishlistDetailsError, 
                    eachOnNewLine:true, 
                    action: {
                        text: 'Try again',
                        function: () => this.setState({isLoading: true, silentReload: false})
                    }
                }
            }) 
            : this.setState({
                ...noLoading,
                alertMessage: {
                    show: true,
                    type: 'warning',
                    title: 'Retrying To Sync With Server...',
                    subtitle: 'Kindly check you network connection'
                }
            })
        }
      }

      

    onUpdateItemStatus = (value, index) => {
        this.setState(state => {
          const listItems = state.wishlistInfo.listItems.map((listItem, i) => {
            if (i === index) {
              return (
                  {
                      item: listItem.item,
                      status: value
                  }
                );
            }else{
                return listItem; 
            }
          });
          
          return {
            wishlistInfo:{
                ...state.wishlistInfo,
                listItems
            }
          };
        },
        () => {
            this.realm.write(() => {
                let wishlistData = this.realm.objects("wishlist").filtered(`code == '${this.props.wishlistCode}'`)[0]; 
                wishlistData.listItems[index] = {
                    item: wishlistData.listItems[index].item,
                    status: value
                };
            });
        });
      };

    onMarkAllItemsComplete = () => {
      this.setState(state => {
        const listItems = state.wishlistInfo.listItems.map((listItem) => {
            return (
                {
                    item: listItem.item,
                    status: 'completed'
                }
            );
        });
        
        return {
            wishlistInfo:{
                ...state.wishlistInfo,
                listItems
            }
        };
      },
        () => {
            this.realm.write(() => {
                let wishlistData = this.realm.objects("wishlist").filtered(`code == '${this.props.wishlistCode}'`)[0]; 
                wishlistData.listItems = this.state.wishlistInfo.listItems;
            });
      });
    };

    bookmarkInProgress = () => {
        this.setState({
            isSaved: 'loading',
            updateSettings: true
        })
    }

    onBookmark = (value) => {
        onBookmarkFunc(
            value,
            this.props.wishlistCode,
            () => this.bookmarkInProgress(),
            (finalValue) => {
                this.setState({
                    isSaved: finalValue,
                    updateSettings: true
                }, () =>{this.props.updateUI ? this.props.updateUI() : null})
            },
            () => this.setState({
                alertMessage: {
                    show: true,
                    type: 'error',
                    title: 'Oops! Error updating your info...',
                    subtitle: 'Relaunch your Lysts app if this continues'
                }
            })
        )
    }

    onArchive = debounce((value) => {
        this.realm.write(() => {
            let wishlistData = this.realm.objects("wishlist").filtered(`code == '${this.props.wishlistCode}'`)[0]; 
            wishlistData.status = value ? 'inactive' : 'active';
        });

        this.setState({
            isArchived: value,
            updateSettings: true,
            alertMessage: {
                show: true,
                type: 'success',
                title: value ? 'Wishlist Archived!' : 'Removed From Archived',
                subtitle: ''
            }
        }, ()=>{this.props.updateUI ? this.props.updateUI() : null;});
    }, 1000, {leading: true,trailing: false});

    onDelete = debounce(() => {
        this.realm.write(() => {
            let wishlistData = this.realm.objects("wishlist").filtered(`code == '${this.props.wishlistCode}'`)[0]; 
            this.realm.delete(wishlistData);

            wishlistData = null;
        });

        this.props.updateUI ? this.props.updateUI({showAlert:true,type:'success', message:'Wishlist Deleted!'}) : null

        this.setState((prevState) => {
            return {
                goBack: true,
                wishlistInfo:{
                    ...prevState.wishlistInfo,
                    listItems: []
                }
            }
        })        
    }, 1000, {leading: true,trailing: false});

    onEdit = () => {
        this.setState({editModal: true})
    }

    onReport = (type, message, email='', callbackFunc = ()=>{}, errorCallbackFunc = ()=>{}) => {
        let wishlist_items = '';
        for (const listItem of this.state.wishlistInfo.listItems) {
            wishlist_items = `${wishlist_items}- [${listItem.item}] \n`;
        }
        
        let data = {
            template_params: {
                email: !this.notLoggedInAndAnonymous ? this.user.customData.contactEmail : email,
                from_name: !this.notLoggedInAndAnonymous ? this.user.customData.fullName : 'Anonymous',
                wishlist_owner_name: this.state.wishlistInfo.owner,
                wishlist_name: this.state.wishlistInfo.name,
                wishlist_description: this.state.wishlistInfo.description,
                wishlist_code: this.props.wishlistCode,
                wishlist_owner_id: this.state.wishlistInfo.ownerId,
                wishlist_items: wishlist_items.trim(),
                subject: type,
                message: message,
                type: 'wishlist'

            }
        };

      // SENDS API CALL USING FETCH API 
        onReportFunc(
            data.template_params,
            ()=>{
                callbackFunc();
                this.setState({
                    reportModal: false,
                    alertMessage: {
                        show: true,
                        type: 'success',
                        title: 'Report Sent!',
                        subtitle: ''
                    }
                });
            },
            () => errorCallbackFunc()
        );
    }




    renderList = () => {
        return this.state.wishlistInfo.listItems.map((item, i) => {
            let TouchableView = (this.state.isOwner && this.state.hasNetworkConnection) ? TouchableOpacity : View;
            let ifItemCompleted = item.status === 'completed' ? true : false;

            return (
                <TouchableView disabled={!this.state.hasNetworkConnection} activeOpacity={0.7} onPress={() => this.onUpdateItemStatus(ifItemCompleted ? 'active' : 'completed' , i)} key={i}>
                    <View style={styles.listDataWrapper} >
                        <View style={styles.listData}><Text style={[styles.listDataText, ifItemCompleted ? {opacity: 0.4} : null]}>{i+1}</Text></View>
                        <View style={[styles.listData, styles.listDataContent]}>
                            <View>
                                <Text style={[
                                    styles.listDataText, 
                                    this.state.isOwner ? {width: dWidth - 20 - 60 - 20 - 40,} : null,
                                    ifItemCompleted ? styles.listDataTextDone : null
                                ]} >{item.item}</Text>
                            </View>
                            <View style={styles.listDataChecked}>
                                {this.state.isOwner ? (
                                    <Svg width={20} height={20} viewBox="0 0 70 70" fill="none" >
                                        <Circle cx={35.158} cy={35.36} r={34.56} fill={ifItemCompleted ? '#28A664' : '#F2F2F2'} />
                                        <Path
                                            d="M17.158 35.36l11.52 11.52 24.48-23.04"
                                            stroke="#fff"
                                            strokeWidth={5.76}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </Svg>
                                ) : null}
                            </View>
                        </View>
                        
                    </View> 
                </TouchableView>
            )
        })
    }

    actionModal = () => (
        <ActionsModal 
            modalState = {this.state.actionsModal}
            closeModal = {() => this.setState({actionsModal: false})}
            actionItems = {this.state.isOwner ? this.state.actionsModalOwnerItems : this.state.actionsModalGuestItems}
        />
    )

    editModal = () => (
        <DefaultModal 
            isVisible={this.state.editModal}
            closeFunction = {() => {this.setState({editModal: false})}}
            type= 'editWishlist'

            wishlistInfo = {this.state.wishlistInfo}
            realmInfo = {this.realm}
            userInfo = {this.user}
            wishlistCode = {this.props.wishlistCode}

            updateUI = {()=>{
                this.props.updateUI ? this.props.updateUI() : null;

                this.setState({
                    silentReload: true,
                    alertMessage: {
                        show: true,
                        type: 'success',
                        title: 'Wishlist Updated!',
                        subtitle: ''
                    }
                });

            }}
      />
    )

    reportModal = () => (
        <DefaultModal 
            isVisible={this.state.reportModal}
            closeFunction = {() => {this.setState({reportModal: false})}}
            type= 'reportWishlist'
            modalTitle='Report Wishlist'

            reportFunction = {this.onReport}
            userLoggedIn = {!this.notLoggedInAndAnonymous}
      />
    )

    diffBetweenDateAndNow = (date) => {
        let now = new Date();
        let diff =(now.getTime() - date.getTime()) / 1000;
        if (diff < 60){
            return (`${Math.abs(Math.floor(diff))} Seconds`)
        }else if(diff >=60 && diff < 3600){
            diff /= (60);
            return (`${Math.abs(Math.floor(diff))} Minutes`)
        }else if(diff >=3600 && diff < 86400){
            diff /= (3600);
            return (`${Math.abs(Math.floor(diff))} Hours`)
        }else if(diff >=86400 && diff < 604800){
            diff /= (86400);
            return (`${Math.abs(Math.floor(diff))} Days`)
        }else if(diff >=604800 && diff < 2592000){
            diff /= (604800);
            return (`${Math.abs(Math.floor(diff))} Weeks`)
        }else if(diff >=2592000 && diff < 31536000){
            diff /= (2592000);
            return (`${Math.abs(Math.floor(diff))} Months`)
        }else if(diff >=31536000){
            diff /= (31536000);
            return (`${Math.abs(Math.floor(diff))} Years`)
        }

    }

    resetAlert = () => {
        this.timeoutAlert = setTimeout(()=>{
            this.setState({alertMessage: {show: false}})
            clearTimeout(this.timeoutAlert);
        }, 4500)
      }

    showWishlistDetails = () =>{
        let listInfo = this.state.wishlistInfo;
        let CategoryImage = ImageSVG[listInfo.category.toLowerCase()];
        let CategoryImageColor = CategoryImage().color ? CategoryImage().color : null;
        let CategoryImageSVG= CategoryImage({width: dWidth-60, height: dHeight/2.8}).svg;

        if(this.state.updateSettings){
            if(this.state.isOwner){
                let newActionsModalOwnerItems = this.state.actionsModalOwnerItems.map((item) =>{
                    if(item.text == 'Bookmark' || item.text == 'Remove Bookmark'){
                        return (this.state.isSaved) ? {
                            text: 'Remove Bookmark',
                            action: () => {this.onBookmark(false)},
                            disabled: this.state.hasNetworkConnection ? false : true
                        } : {
                            text: 'Bookmark',
                            action: () => {this.onBookmark(true)},
                            disabled: this.state.hasNetworkConnection ? false : true
                        }
                    }else if(item.text == 'Archive' || item.text == 'Remove Archive'){
                        return (this.state.isArchived) ? {
                            text: 'Remove Archive',
                            action: () => {this.onArchive(false)},
                            disabled: this.state.hasNetworkConnection ? false : true
                        } : {
                            text: 'Archive',
                            action: () => {this.onArchive(true)},
                            disabled: this.state.hasNetworkConnection ? false : true
                        }
                    }else if(item.text != 'Copy code' && item.text != 'Share to...'){
                        return {
                            ...item,
                            disabled: this.state.hasNetworkConnection ? false : true
                        }
                    }else{
                        return item;
                    }
                });

                this.setState({
                    updateSettings: false,
                    actionsModalOwnerItems: newActionsModalOwnerItems
                })
            }else{
                let newActionsModalGuestItems = this.state.actionsModalGuestItems.map((item) =>{
                    if(item.text == 'Save wishlist' || item.text == 'Remove saved wishlist'){
                        return (this.state.isSaved) ? {
                            text: 'Remove saved wishlist',
                            action: () => {this.onBookmark(false)},
                            disabled: this.state.hasNetworkConnection ? this.notLoggedInAndAnonymous : true
                        } : {
                            text: 'Save wishlist',
                            action: () => {this.onBookmark(true)},
                            disabled: this.state.hasNetworkConnection ? this.notLoggedInAndAnonymous : true
                        }
                    } else if(item.text != 'Copy code' && item.text != 'Share to...'){
                        return {
                            ...item,
                            disabled: this.state.hasNetworkConnection ? false : true
                        }
                    } else {
                        return item;
                    }
                });

                this.setState({
                    updateSettings: false,
                    actionsModalGuestItems: newActionsModalGuestItems
                })
            }
        }
        // let AvatarSVGView = this.state.avatarFeatures.avatarId.toLowerCase().includes('f') 
        //                     ? AvatarSVG.Female[this.state.avatarFeatures.avatarId] 
        //                     : AvatarSVG.Male[this.state.avatarFeatures.avatarId];

        return (this.state.noData.value) 
        ? (
            <ErrorView 
                title={this.state.noData.title ? this.state.noData.title : null} 
                message={this.state.noData.message ? this.state.noData.message : null} 
                svg={this.state.noData.svgComponent ? this.state.noData.svgComponent : null} 
                action={this.state.noData.action ? this.state.noData.action : null} 
                eachOnNewLine={this.state.noData.eachOnNewLine ? this.state.noData.eachOnNewLine : null} 
            />
        )

        :  (
            <View style={[styles.container, CategoryImageColor ? {backgroundColor: CategoryImageColor} : null]}>
                {this.actionModal()}
                {this.state.isOwner ? this.editModal() : this.reportModal()}
                {this.state.hasNetworkConnection ? null : <NoConnectionAlert />}
                <FadeBottom />
                <View style={[styles.ImageWrapper, CategoryImageColor ? {backgroundColor: CategoryImageColor} : null]}>
                    {CategoryImageSVG}
                </View>
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    style={{flex: 1}} 
                    contentContainerStyle={{ paddingTop: ((dHeight/2.8) + 35 + 30)}}
                    onScroll={(e) => { this.setState({scrollPosition: e.nativeEvent.contentOffset.y})}}
                >
                    <View style={[styles.contentWrapper, this.showTopBar ? styles.contentWrapperWithTopBar : null]}>
                        <View style={styles.topWrapper}>
                            <View style={{maxWidth: dWidth - 60 - 70,}}>
                                <View style={styles.category}><View style={styles.categorySeparator}></View><View><Text style={styles.categoryText}>{getCategoryDisplay(listInfo.category)}</Text></View></View>
                                <View style={styles.name}><Text style={styles.nameText}>{listInfo.name}</Text></View>
                            </View>
                            <View>
                                <View style={styles.imageAvatar}>
                                    <AvatarRender avatarFeatures={this.state.avatarFeatures} size={60} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.metaDataWrapper}>
                            <View><Text style={styles.metaText} numberOfLines={1} ellipsizeMode="tail">by {listInfo.owner}</Text></View>
                            <View><View style={styles.metaSeparator}></View></View>
                            <View><Text style={styles.metaText}>{this.diffBetweenDateAndNow(new Date(listInfo.dateCreated))} ago</Text></View>
                        </View>
                        <View style={styles.description}>
                            <Text style={styles.descriptionText}>{listInfo.description}</Text>
                        </View>
                        <View style={styles.listWrapper}>
                            {this.renderList()}
                        </View>
                        
                    </View>    
                </ScrollView>
                {this.state.alertMessage.show ? (<ErrorSuccessAlert 
                    type = {this.state.alertMessage.type}
                    title = {this.state.alertMessage.title}
                    subtitle = {this.state.alertMessage.subtitle}
                /> )
                : null}
            </View>
        )
    }

    LoadingRender = () => {
        this.openRealm();
        return (
            <View style={{
                flex: 1,
                justifyContent: "center"
            }}>
                <Loader />
            </View>
        )
    }


    render() {
        this.state.goBack ?  Navigation.pop(this.props.componentId) : null;
        this.state.silentReload ? this.openRealm() : null;
        this.state.alertMessage.show ? this.resetAlert() : null;
        this.showTopBar = this.state.scrollPosition > ((dHeight/2.8) + 16) ? true : false;
        this.showTopBar = this.state.isLoading ? true : this.showTopBar;
        if(this.showTopBar){
            Navigation.mergeOptions(this.props.componentId, {
                topBar: {
                    background: {
                        color: '#ffffff'
                    },
                    title: {
                        text: this.state.wishlistInfo.name
                    },
                    elevation: 3,
                }
            })
        }else {
            Navigation.mergeOptions(this.props.componentId, {
                topBar: {
                    background: {
                        color: '#ffffff00'
                    },
                    title: {
                        text: ''
                    },
                    elevation: 0,
                }
            })
        }

        if (this.state.isLoading || this.state.noData.value) {
            Navigation.mergeOptions(this.props.componentId, {
                topBar: {
                    background: {
                        color: '#ffffff00'
                    },
                    title: {
                        text: ''
                    },
                    elevation: 0,
                    rightButtons: []
                }
            })
        } else if(this.state.updateSettings) {
            Navigation.mergeOptions(this.props.componentId, {
                topBar: {
                    rightButtons: [
                        {
                          id: 'actionsButton',
                          icon: require('../../assets/images/nav-icons/ellipse.png'),
                          text: 'actions'
                        },
                        this.user.providerType == 'anon-user' ? {} : {
                          id: 'saveButton',
                          text: 'save',
                          component: {
                            id: 'com.lysts.component.SavedButton',
                            name: 'com.lysts.component.SavedButton',
                            passProps: {
                              savedStatus: this.state.hasNetworkConnection ? (this.state.isSaved == 'loading' ? 'loading' : (this.state.isSaved ? 'saved' : 'unsaved')) : 'loading',
                              height: 22,
                              width: 22,
                              color: '#515D70',
                              saveFunc: () => this.onBookmark(!this.state.isSaved)
                            }
                          }
                        }
                      ]
                }
            })
        }

        return (this.state.hasNetworkConnection == false && this.state.wishlistInfo.name.trim() == '') ? 
        (
            <ErrorView 
                message={'No Internet Connection'} 
                svg={noInternet} 
            />
        )
        : (this.state.isLoading ? this.LoadingRender() : this.showWishlistDetails());
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#FFDAD4'
    },
    ImageWrapper: {
        backgroundColor: '#FFDAD4',
        paddingTop: 35,
        paddingBottom: 30,
        paddingHorizontal: 30,
        position: 'absolute',
        top: 0
    },
    contentWrapper:{
        // flex:1,
        backgroundColor: '#fff',
        elevation: 50,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        minHeight: dHeight - 40,
        paddingHorizontal: 30,
        paddingTop: 43
    },
    contentWrapperWithTopBar:{
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    topWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    category:{
        flexDirection: 'row',
        alignItems: 'center' ,
    },
    categoryText:{
        fontSize: 15,
        fontFamily:'Poppins-SemiBold',
        color:'#44577C'
    },
    categorySeparator:{
        backgroundColor: '#44577C',
        height: 7,
        width: 7,
        borderRadius: 1000,
        marginRight: 9,
        marginTop: -3
    },
    name:{
        marginTop: 4
    },
    nameText:{
        fontSize: 20,
        fontFamily:'Poppins-Bold',
        color:'#44577C'
    },
    description:{
        marginTop: 5
    },
    descriptionText:{
        color: '#515D70',
        fontSize: 15.5,
        fontFamily: 'Poppins-Regular',
        lineHeight: 25.5
    },
    imageAvatar:{
        height: 50,
        width: 50,
        marginTop: 5,
        borderRadius: 1000,
        resizeMode: 'cover'
    },
    metaDataWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    metaText:{
        color: '#515D70',
        opacity: 0.8,
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
        maxWidth: dWidth - (126 + 60 + 26)
    },
    metaSeparator:{
        backgroundColor: '#515D70',
        height: 6,
        width: 6,
        borderRadius: 1000,
        opacity: 0.6,
        marginHorizontal: 10
    },
    listWrapper:{
        marginTop: 20,
        marginBottom: 40,
    },

    listDataWrapper:{
        flexDirection: 'row',
        paddingVertical: 10
    },
    listData:{
        // backgroundColor: 'red',
        alignItems: 'center',
        marginHorizontal: 5,
        minWidth: 20
    },
    listDataContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: dWidth - 20 - 60 - 20
    },
    listDataText:{
        color: '#515D70',
        fontSize: 16.5,
        fontFamily: 'Poppins-Medium',
        lineHeight: 27.9,
        
    },
    listDataTextDone:{
        textDecorationLine: 'line-through',
        // color: '#DCBCA8',
        opacity: 0.4
    },
    listDataChecked:{
        paddingLeft: 20
    }

})
