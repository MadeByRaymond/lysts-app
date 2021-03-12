import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import Svg, { Rect, Circle } from "react-native-svg";


const profileNavHeader = ({theme = 'theme1' ,avatarImage, onPressFunc}) => {
    return (
        <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={onPressFunc}>
                <View style={styles.headerSVGWrapper}>
                    <Svg width={((159*60)/115)} height={60} viewBox="0 0 159 115" fill="none">
                        <Rect
                            opacity={0.4}
                            x={0.666}
                            y={20.862}
                            width={95.04}
                            height={95.04}
                            rx={14.4}
                            transform="rotate(-12.375 .666 20.862)"
                            fill= {theme.toLowerCase() == 'theme2' ? "#28A664" : "#E76666"}
                        />
                        <Circle opacity={0.44} cx={111.16} cy={66.76} r={47.52} fill={theme.toLowerCase() == 'theme1' ? '#28A664' : theme.toLowerCase() == 'theme2' ? "#214BC0" : "#28A664"} />
                    </Svg>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={onPressFunc}>
                <View style={styles.profileWrapper}>
                <View style={styles.profileAvatarWrapper}>
                    <Image source={{uri: avatarImage}} resizeMethod='scale' resizeMode='cover' style={styles.profileAvatar} />
                    {/* <AvatarSVGView width={60} height={60} avatarFeatures={realmApp.currentUser.customData.avatarFeatures} /> */}
                </View>
                <View style={styles.profileTextWrapper}><Text style={styles.profileText}>Profile</Text></View>
                </View>
            </TouchableOpacity>
            
        </View>
    )
}

export default profileNavHeader

const styles = StyleSheet.create({
    headerWrapper:{
        paddingHorizontal: 25,
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    headerSVGWrapper:{

    },
    profileWrapper:{
        alignItems: 'center'
    },
    profileAvatarWrapper:{
    
    },
    profileAvatar:{
        resizeMode: 'cover',
        height: 60,
        width: 60,
        borderRadius: 1000
    },
    profileTextWrapper:{

    },
    profileText:{
        color:'#515D70',
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
        marginTop: 3
    }
})
