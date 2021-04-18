import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet } from 'react-native';
import { BigHead } from 'react-native-bigheads'

export default function avatarRender({ avatarFeatures, size}) {
    return (
    <View>
      <BigHead
          accessory={avatarFeatures.accessory}
          bgColor={avatarFeatures.bgColor}
          bgShape={avatarFeatures.bgShape}
          body={avatarFeatures.body}
          clothing={avatarFeatures.clothing}
          clothingColor={avatarFeatures.clothingColor}
          eyebrows={avatarFeatures.eyebrows}
          eyes={avatarFeatures.eyes}
          facialHair={avatarFeatures.facialHair}
          graphic={avatarFeatures.graphic}
          hair={avatarFeatures.hair}
          hairColor={avatarFeatures.hairColor}
          hat={avatarFeatures.hat}
          hatColor={avatarFeatures.hatColor}
          lashes={avatarFeatures.lashes}
          lipColor={avatarFeatures.lipColor}
          mouth={avatarFeatures.mouth}
          showBackground={avatarFeatures.showBackground}
          size={size}
          skinTone={avatarFeatures.skinTone}
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
