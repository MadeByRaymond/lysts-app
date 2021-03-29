import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

// LINK WITH react-native link react-native-webview 

export default function WebViewComp({uri}) {
  return (
    <View style={styles.container}>
        <WebView source={{ uri }} />
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1A2C34',
        backgroundColor: '#FCFCFC'
    }
})
