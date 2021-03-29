import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

import {noArchive} from '../../SVG_Files/UI_SVG/errors';
import {dHeight} from '../../includes/variables';
import ErrorView from '../../components/Errors/errorView';

export default function WebViewComp({uri}) {
  return (
    <View style={styles.container}>
      <WebView 
        style={styles.container} 
        source={{ uri }} 
        startInLoadingState  
        renderError={()=>{
          return (<View style={styles.errorContainer}>
            <ErrorView 
              message={'It Seems Couldn\'t Load\nThis Page'}
              svg={noArchive} 
              contentWrapperStyle={{marginTop: -(dHeight/5)}} />
          </View>)
        }} />
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex: 1
    },

    errorContainer:{
      height: dHeight,
      backgroundColor: '#ffffff',
    }
})
