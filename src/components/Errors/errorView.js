import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'

import {dWidth, dHeight} from '../../includes/variables'

export default function errorView(props) {
    let SVG = props.svg;
    return (
        <View style={[styles.noContentWrapper, props.contentWrapperStyle ? props.contentWrapperStyle : null]}>
            <View>
                {props.title ? (<View style={{flexDirection: 'row', justifyContent:'center'}}>
                    <Text style={[styles.noContentText, {marginBottom: 20}]}>{props.title}</Text> 
                </View>) : null}
                <View style={styles.noContentSVG}>
                    <SVG width={(dWidth - 90)} />
                </View>
                {(props.message || props.action) ? (<View style={[styles.noContentTextWrapper, props.eachOnNewLine ? {flexDirection: 'column',} : null]}>
                    {props.message ? (<Text style={styles.noContentText}>{props.message}</Text> ) : null}
                    {props.action ? (<TouchableWithoutFeedback hitSlop={200} onPress={props.action.function}> 
                        <Text style={[styles.noContentText, styles.noContentTextAction, props.eachOnNewLine ? {marginLeft: 30} : null]}>{props.action.text}</Text>
                    </TouchableWithoutFeedback>) : null}
                </View>) : null}
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    noContentWrapper:{
        flex: 1,
        width: '100%',
        justifyContent:'center',
        alignItems:'center'
      },
      noContentSVG:{
        opacity: 0.9,
        marginBottom: 30,
        alignItems : 'center'
      },
      noContentTextWrapper:{
        flexDirection: 'row', 
        justifyContent:'center'
      },
      noContentText:{
        textAlign:'center',
        marginHorizontal: 30,
        color:'rgba(68, 87, 124, 0.9)',
        fontSize: 21,
        fontFamily: 'Poppins-Medium',
        opacity: 0.8
      },
      noContentTextAction:{
        marginLeft:-25, 
        color:'#CFA280',
        opacity: 1
      }
})
