import React, { Component } from 'react'
import Realm from 'realm';
import { Text, StyleSheet, View, Image, Dimensions, ScrollView, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import { Navigation } from "react-native-navigation";
import Svg, { Circle, Path } from "react-native-svg";
import ActionsModal from '../../UIComponents/Modals/ActionsModal';
// import LottieView from 'lottie-react-native';
import Reactotron from 'reactotron-react-native';

import * as ImageSVG from '../../SVG_Files/viewWishlistSVG';
import {Bottom as FadeBottom} from '../../UIComponents/GradientFade/gradientFade';
import {getCategoryDisplay} from '../../includes/functions';
import {TouchableIOSHighlight, dWidth, dHeight} from '../../includes/variables';

import {app as realmApp} from '../../../storage/realm';

let LottieView = require("lottie-react-native");



export default class wishlistDetails extends Component {
    state={
        owner: this.props.booly,
        loading: false,
        scrollPosition: 0,
        wishlistInfo:{
            name: 'Raymond’s Ultimate House Warming List',
            category: 'house_warming',
            owner: 'Dora Patsone',
            dateCreated: '12/12/2020',
            description:'Awesome news!!!. I just got a new place so please nothing cheap 😂😂😂. Here’s my list folks.',
            listItems: [
                {
                    item: 'A Daisy Lamp',
                    status: 'active'
                },
                {
                    item: 'PlayStation 5',
                    status: 'active'
                },
                {
                    item: 'MacBook Pro 2016 Model',
                    status: 'completed'
                },
                {
                    item: '4TB Western Digital External harddisk drive.',
                    status: 'active'
                },
                {
                    item: 'Brand New Jordan Kicks',
                    status: 'active'
                },
                {
                    item: 'Leicester Football Jersey',
                    status: 'completed'
                },
                {
                    item: 'Barbie Night Lamp Stand',
                    status: 'active'
                },
                {
                    item: 'Pink Ponytail Princess Doll',
                    status: 'completed'
                },
                {
                    item: 'Gold, Frankincense and Myrrh',
                    status: 'completed'
                },
                {
                    item: 'Gold, Frankincense and Myrrh',
                    status: 'active'
                },
                {
                    item: 'Gold, Frankincense and Myrrh',
                    status: 'active'
                },
                {
                    item: 'Gold, Frankincense and Myrrh',
                    status: 'active'
                },
                {
                    item: 'd d d d d d d d d d d d d d d d d d d d d d  d d d d d d dd d  d dd d  dd d d d d d ',
                    status: 'completed'
                },
            ]
        },
        actionsModal : false,
        actionsModalOwnerItems:[
            {
                text: 'Edit Wishlist',
                action: () => {alert('jjkk')}
            },
            {
                text: 'Copy code',
                action: () => {alert('jjkk')}
            },
            {
                text: 'Share to...',
                action: () => {alert('jjkk')}
            },
            {
                text: 'Mark all as done',
                action: () => {alert('jjkk')}
            },
            {
                text: 'Bookmark',
                action: () => {alert('jjkk')}
            },
            {
                text: 'Archive',
                action: () => {alert('jjkk')}
            },
            {
                text: 'Delete',
                action: () => {alert('jjkk')}
            },
        ],
        actionsModalVisitorItems:[
            {
                text: 'Save wishlist',
                action: () => {alert('jjkk')}
            },
            {
                text: 'Copy code',
                action: () => {alert('jjkk')}
            },
            {
                text: 'Share to...',
                action: () => {alert('jjkk')}
            },
            {
                text: 'Report...',
                action: () => {alert('jjkk')}
            },
        ]
    }

    componentDidMount() {
        this.navigationEventListener = Navigation.events().bindComponent(this);

        async function openRealm() {
            let user = realmApp.currentUser;
            // await user.logOut();
            // alert(user.isLoggedIn);
            // user = await realmApp.logIn( Realm.Credentials.emailPassword("demo@mymail.com", "password"));
            // alert(user.isLoggedIn);
            let realm;
            try {
              
              console.log(`Logged in with the user: ${user.id}`);
              const config = {
                schema: [
                  {
                    name: "wishlist",
                    primaryKey: "_id",
                    properties: {
                        _id: "objectId",
                        _partition: "string",
                        category: "string",
                        code: "string",
                        dateCreated: "date",
                        dateModified: "date",
                        description: "string",
                        listItems: "items[]",
                        name: "string",
                        owner: "string",
                        status: "string"
                      }
                  },
                  {
                    name: "items",
                    properties :{
                        item: "string",
                        status: "string"
                    }
                  }
                ],
                sync: {
                  user: user,
                  partitionValue: null,
                }
              };
              
              console.log("step2");
              realm = await Realm.open(config);
              console.log("step3");
            //   alert(this.props.wishlistCode);
            //   let datas = realm.objects("wishlist").filtered("code == 'WSH-1234'")
            //   console.log("step4");
            //   console.log(datas);
            //   alert(datas);
            //   Reactotron.log(datas);
            } catch (error) {
                throw `Error opening realm: ${JSON.stringify(error,null,2)}`;
                
            }
          }

          openRealm();
    }

    
    
    navigationButtonPressed({ buttonId }) {
        if (buttonId === 'saveButton') {
            Navigation.updateProps('com.lysts.component.SavedButton', {
                saved: true,
                height: 22,
                width: 22,
                color: '#515D70'
            });
        }
        
        if (buttonId === 'actionsButton') {
           this.setState({
                actionsModal: true
           });
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
        });
      };


    renderList = () => {
        return this.state.wishlistInfo.listItems.map((item, i) => {
            let TouchableView = this.state.owner ? TouchableOpacity : View;
            let ifItemCompleted = item.status === 'completed' ? true : false
            let displayCheck = ifItemCompleted ? (
                <Svg width={20} height={20} viewBox="0 0 70 70" fill="none" >
                    <Circle cx={35.158} cy={35.36} r={34.56} fill="#28A664" />
                    <Path
                        d="M17.158 35.36l11.52 11.52 24.48-23.04"
                        stroke="#fff"
                        strokeWidth={5.76}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </Svg> 
            ) : null;
            return (
            
            <TouchableView activeOpacity={0.7} onPress={() => this.onUpdateItemStatus(ifItemCompleted ? 'active' : 'completed' , i)} key={i}>
                <View style={styles.listDataWrapper} >
                    <View style={styles.listData}><Text style={[styles.listDataText, ifItemCompleted ? {opacity: 0.4} : null]}>{i+1}</Text></View>
                    <View style={[styles.listData, styles.listDataContent]}>
                        <View>
                            <Text style={[
                                styles.listDataText, 
                                this.state.owner ? {width: dWidth - 20 - 60 - 20 - 40,} : null,
                                ifItemCompleted ? styles.listDataTextDone : null
                            ]} >{item.item}</Text>
                        </View>
                        <View style={styles.listDataChecked}>
                            {this.state.owner ? (
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
            actionItems = {this.state.owner ? this.state.actionsModalOwnerItems : this.state.actionsModalVisitorItems}
        />
        // <Modal 
        //     isVisible={this.state.actionsModal} 
        //     backdropOpacity={0.6} 
        //     useNativeDriver={true}
        //     // statusBarTranslucent={true} 
        //     style={styles.actionModalViewWrapper}
        //     // onSwipeComplete={() => props.closeFunction()}
        //     animationIn= "zoomIn"
        //     animationOut="zoomOut"
        //     // animationOutTiming={500}
        //     hideModalContentWhileAnimating={true}
        //     swipeDirection={["down", "left", "up", "right"]}
        //     onBackdropPress= {() => {this.setState({actionsModal: false})}}
        //     onBackButtonPress= {() => {this.setState({actionsModal: false})}}
        // >
        //    <View>
        //         <View style={styles.actionModalView}>
        //             <TouchableIOSHighlight
        //                 underlayColor="#EDEDED"
        //                 onPress={() => {}}
        //             >
        //                 <View style={[styles.actionItem, {paddingTop: 15}]}><Text style={styles.actionItemText}>Edit Wishlist</Text></View>
        //             </TouchableIOSHighlight>
        //             <TouchableIOSHighlight>
        //                 <View style={styles.actionItem}><Text style={styles.actionItemText}>Copy code</Text></View>
        //             </TouchableIOSHighlight>
        //             <TouchableIOSHighlight>
        //                 <View style={styles.actionItem}><Text style={styles.actionItemText}>Share to...</Text></View>
        //             </TouchableIOSHighlight>
        //             <TouchableIOSHighlight>
        //                 <View style={styles.actionItem}><Text style={styles.actionItemText}>Mark all as done</Text></View>
        //             </TouchableIOSHighlight>
        //             <TouchableIOSHighlight>
        //                 <View style={styles.actionItem}><Text style={styles.actionItemText}>Bookmark</Text></View>
        //             </TouchableIOSHighlight>
        //             <TouchableIOSHighlight>
        //                 <View style={styles.actionItem}><Text style={styles.actionItemText}>Archive</Text></View>
        //             </TouchableIOSHighlight>
        //             <TouchableIOSHighlight>
        //                 <View style={[styles.actionItem, {paddingBottom: 15}]}><Text style={styles.actionItemText}>Delete</Text></View>
        //             </TouchableIOSHighlight>                    
        //         </View>
        //    </View>
        // </Modal>
    )


    render() {
        let listInfo = this.state.wishlistInfo;
        let showTopBar = this.state.scrollPosition > ((dHeight/2.8) + 16) ? true : false;
        showTopBar = this.state.loading ? true : showTopBar;
        if(showTopBar){
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

        return this.state.loading ? (
            <View>
                {this.actionModal()}
                <LottieView 
                    style={{width: '100%', height: 250, alignSelf: 'center'}}
                    source={require('../../lotti_animations/16270-simple-wishlist.json')} 
                    autoPlay loop 
                    autoSize= {true}
                    speed={1}
                />
                <LottieView 
                    style={{width: '100%', height: 250, alignSelf: 'center'}}
                    source={require('../../lotti_animations/lf30_editor_6DkvCd.json')} 
                    autoPlay 
                    loop={false}
                    autoSize= {true}
                    speed={0.5}
                />
            </View>
        )
        :(
            <View style={styles.container}>
                {this.actionModal()}
                <FadeBottom />
                <View style={styles.ImageWrapper}>
                    <ImageSVG.christmas width={(dWidth-60)} height={(dHeight/2.8)} />
                </View>
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    style={{flex: 1}} 
                    contentContainerStyle={{ paddingTop: ((dHeight/2.8) + 35 + 30)}}
                    onScroll={(e) => { this.setState({scrollPosition: e.nativeEvent.contentOffset.y})}}
                >
                    <View style={[styles.contentWrapper, showTopBar ? styles.contentWrapperWithTopBar : null]}>
                        <View style={styles.topWrapper}>
                            <View style={{maxWidth: dWidth - 60 - 70,}}>
                                <View style={styles.category}><View style={styles.categorySeparator}></View><View><Text style={styles.categoryText}>{getCategoryDisplay(listInfo.category)}</Text></View></View>
                                <View style={styles.name}><Text style={styles.nameText}>{listInfo.name}</Text></View>
                            </View>
                            <View>
                                <Image 
                                    style={styles.imageAvatar}
                                    blurRadius={0}
                                    source={{uri: 'data:image/jpeg;base64,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'}}
                                    resizeMode='cover'
                                ></Image>
                            </View>
                        </View>
                        <View style={styles.metaDataWrapper}>
                            <View><Text style={styles.metaText} numberOfLines={1} ellipsizeMode="tail">by {listInfo.owner}</Text></View>
                            <View><View style={styles.metaSeparator}></View></View>
                            <View><Text style={styles.metaText}>6 months ago</Text></View>
                        </View>
                        <View style={styles.description}>
                            <Text style={styles.descriptionText}>{listInfo.description}</Text>
                        </View>
                        <View style={styles.listWrapper}>
                            {this.renderList()}
                        </View>
                        
                    </View>    
                </ScrollView>
                
            </View>
            )
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
