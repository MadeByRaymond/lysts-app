import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet } from 'react-native';

import * as AvatarSVG from '../../SVG_Files/avatarSVG';

export default function avatarRender({ avatarFeatures}) {
    const [showAvatar, setShowAvatar] = useState(false)  

    let AvatarSVGView = avatarFeatures.avatarId.toLowerCase().includes('f') 
                            ? AvatarSVG.Female[avatarFeatures.avatarId] 
                            : AvatarSVG.Male[avatarFeatures.avatarId];


    let showAvatarTimeout = showAvatar ? null : setTimeout(() => {
      setShowAvatar(true)
    }, 50); 


    useEffect(() => {
      return () => {
        clearTimeout(showAvatarTimeout)
      };
    }, []);
    return (
    <View>
        <View style={[styles.image,{display: showAvatar ? 'flex' : 'none'}]}>
          <AvatarSVGView width={60} height={60} avatarFeatures={avatarFeatures} />
        </View>
        <Image
            style={[styles.image,{display: showAvatar ? 'none' : 'flex'}]}
            blurRadius={80}
            resizeMode='cover'
            source={{uri: 'f001'}}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  image:{
    width:60, 
    height:60, 
    borderRadius: 1000, 
    overflow: 'hidden'
  }
})
