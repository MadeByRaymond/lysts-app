import React, {useEffect} from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Linking } from 'react-native';
import Svg, { Path } from "react-native-svg";

let prevComponentId;

export default function support_donations(props) {
  useEffect(() => {

    prevComponentId = global.activeComponentId;
    global.activeComponentId = props.componentId;

    return () => {
      global.activeComponentId = prevComponentId;
    };
  }, []);

  let supportLinks = [
    {
      name: 'Make A Wish Foundation',
      link: 'https://www.worldwish.org/donate/'
    },
    {
      name: 'Feed My Starving Children',
      link: 'https://give.fmsc.org/checkout/donation?eid=76206'
    },
    {
      name: 'Toys For Tots Box',
      link: 'https://toysfortotsbox.com/?utm_source=ToysforTotsBox&utm_medium=Website&utm_campaign=Homepage_DonateButton/#shop'
    },
    {
      name: 'Save The Children',
      link: 'https://support.savethechildren.org/site/Donation2?df_id=1620&1620.donation=form1'
    }
  ]

  let randomCharityIndex = Math.floor(Math.random() * 4)

  return (
    <View style={styles.container}>
        <View style={styles.titleWrapper}><Text style={styles.title}>Support Channels</Text></View>
        <View style={styles.settingsWrapper}>
          <TouchableOpacity activeOpacity={0.8} onPress={()=>{Linking.openURL('http://lystsapp.com/buymeacoffee')}}>
            <View style={styles.settingRow}>
              <View style={styles.settingSVGWrapper}>
                <Svg height={35} width={32} viewBox="0 0 364 418" fill="none">
                  <Path
                    d="M5.414 315.956a5 5 0 01-2.504-9.33l31.738-18.324a4.997 4.997 0 016.83 1.83 5 5 0 01-1.83 6.83L7.91 315.286c-.788.454-1.65.67-2.496.67zM358.586 315.956a4.987 4.987 0 01-2.496-.67l-31.738-18.324a5 5 0 01-1.83-6.83 4.997 4.997 0 016.83-1.83l31.738 18.324a5 5 0 01-2.504 9.33zM182 42.724a5 5 0 01-5-5V5.088a5 5 0 015-5 5 5 0 015 5v32.636a5 5 0 01-5 5zM182 417.912a5 5 0 01-5-5v-32.636a5 5 0 015-5 5 5 0 015 5v32.636a5 5 0 01-5 5z"
                    fill="#A58BC9"
                  />
                  <Path
                    d="M361.092 102.714L184.5.758a5.006 5.006 0 00-5 0L2.908 102.714a5.003 5.003 0 00-2.5 4.33v203.91c0 1.786.954 3.436 2.5 4.33L179.5 417.24a5.002 5.002 0 005 0l176.592-101.956a5.003 5.003 0 002.5-4.33v-203.91a5.003 5.003 0 00-2.5-4.33zM182 407.138l-171.592-99.07V115.704l84.322 48.684a4.998 4.998 0 006.83-1.83 5 5 0 00-1.83-6.83l-84.322-48.684L182 10.862l166.592 96.182-84.322 48.684a5 5 0 105 8.66l84.322-48.684v192.364L182 407.138z"
                    fill="#846F75"
                  />
                  <Path
                    d="M222.634 164c11.91-11.086 18.888-26.714 18.888-43.53 0-32.822-26.702-59.522-59.522-59.522-32.82 0-59.522 26.7-59.522 59.522 0 16.816 6.978 32.442 18.888 43.53-33.666 1.04-60.732 28.75-60.732 62.662v89.392a5 5 0 005 5h192.73a5 5 0 005-5v-89.392c.002-33.912-27.066-61.622-60.73-62.662zm50.732 147.052H90.634V226.66c0-29.054 23.638-52.692 52.692-52.692h13.74a5.002 5.002 0 002.29-9.446c-16.58-8.54-26.878-25.42-26.878-44.054 0-27.306 22.216-49.522 49.522-49.522 27.306 0 49.522 22.216 49.522 49.522 0 18.634-10.298 35.514-26.878 44.054a5 5 0 002.29 9.446h13.74c29.054 0 52.692 23.638 52.692 52.692v84.392z"
                    fill="#846F75"
                  />
                  <Path
                    d="M182 291.958a4.996 4.996 0 01-3.676-1.612c-4.112-4.462-40.17-44.216-40.17-66.002 0-14.716 11.972-26.69 26.69-26.69 6.38 0 12.398 2.232 17.158 6.26 4.76-4.028 10.778-6.26 17.158-6.26 14.716 0 26.69 11.972 26.69 26.69 0 21.786-36.06 61.54-40.17 66.002a5.004 5.004 0 01-3.68 1.612zm-17.158-84.302c-9.202 0-16.69 7.488-16.69 16.69 0 13.62 21.832 41.386 33.848 55.12 12.016-13.734 33.848-41.5 33.848-55.12 0-9.202-7.488-16.69-16.69-16.69-5.192 0-10.004 2.374-13.202 6.514a4.999 4.999 0 01-7.916 0c-3.194-4.14-8.006-6.514-13.198-6.514z"
                    fill="#A58BC9"
                  />
                </Svg>
              </View>
              <View style={styles.settingTextWrapper}><Text style={styles.settingText}>Support the developers</Text></View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity activeOpacity={0.8} onPress={()=>{Linking.openURL(supportLinks[randomCharityIndex].link)}}>
            <View style={styles.settingRow}>
              <View style={styles.settingSVGWrapper}>
                <Svg width={35} height={32} viewBox="0 0 428 439" fill="none">
                  <Path
                    d="M395.536 388.806H32.464a5 5 0 01-5-5 5 5 0 015-5h363.072a5 5 0 110 10z"
                    fill="#EBE7F2"
                  />
                  <Path
                    d="M364.62 65.644c6.128-7.018 9.642-16.108 9.642-25.796C374.262 18.212 356.66.61 335.024.61c-21.634 0-39.236 17.602-39.236 39.238 0 9.686 3.514 18.776 9.638 25.792a40.678 40.678 0 00-12.134 3.53 5 5 0 00-2.41 6.648 4.998 4.998 0 006.648 2.41 30.956 30.956 0 0113.21-2.922h8.626a5 5 0 002.29-9.444c-9.788-5.044-15.87-15.01-15.87-26.01 0-16.122 13.116-29.238 29.236-29.238S364.26 23.73 364.26 39.852c0 11-6.082 20.966-15.872 26.01a5 5 0 002.292 9.444h8.626c17.218 0 31.226 14.008 31.226 31.228v56.132a5 5 0 005 5 5 5 0 005-5V106.53c.004-20.934-15.68-38.274-35.912-40.886zM32.464 167.664a5 5 0 005-5V106.53c0-17.218 14.008-31.228 31.228-31.228h8.628a4.998 4.998 0 002.29-9.444c-9.79-5.044-15.87-15.01-15.87-26.01 0-16.122 13.116-29.238 29.236-29.238s29.238 13.116 29.238 29.238c0 11-6.082 20.966-15.87 26.01a5 5 0 002.29 9.444h8.628c4.62 0 9.066.984 13.212 2.922a5.001 5.001 0 004.236-9.06 40.802 40.802 0 00-12.134-3.528c6.126-7.016 9.638-16.104 9.638-25.792 0-21.636-17.602-39.238-39.238-39.238-21.634 0-39.236 17.602-39.236 39.238 0 9.688 3.514 18.78 9.642 25.794-20.236 2.612-35.918 19.954-35.918 40.888v56.132a5.002 5.002 0 005 5.006z"
                    fill="#846F75"
                  />
                  <Path
                    d="M32.464 234.394a5 5 0 005-5c0-17.218 14.008-31.228 31.228-31.228h8.628a4.998 4.998 0 002.29-9.444c-9.79-5.044-15.87-15.01-15.87-26.01 0-16.122 13.116-29.238 29.236-29.238s29.238 13.116 29.238 29.238c0 11-6.082 20.966-15.87 26.01a5 5 0 002.29 9.444h8.628c17.218 0 31.228 14.008 31.228 31.228a5 5 0 005 5 5 5 0 005-5c0-17.218 14.008-31.228 31.228-31.228a5 5 0 005-5 5 5 0 00-5-5c-15.634 0-29.262 8.746-36.25 21.604-6.186-11.366-17.53-19.538-30.896-21.264 6.128-7.016 9.642-16.106 9.642-25.794 0-21.636-17.602-39.238-39.238-39.238-21.634 0-39.236 17.602-39.236 39.238 0 9.688 3.514 18.78 9.642 25.794-20.236 2.612-35.918 19.954-35.918 40.888a5 5 0 005 5zM364.62 188.506c6.128-7.018 9.642-16.108 9.642-25.796 0-21.636-17.602-39.238-39.238-39.238-21.634 0-39.236 17.602-39.236 39.238 0 9.688 3.514 18.778 9.642 25.796-13.362 1.726-24.708 9.898-30.896 21.264-6.988-12.858-20.616-21.604-36.25-21.604a5 5 0 00-5 5 5 5 0 005 5c17.218 0 31.226 14.008 31.226 31.228a5 5 0 005 5 5 5 0 005-5c0-17.218 14.01-31.228 31.228-31.228h8.626a5.003 5.003 0 004.86-3.822 5.002 5.002 0 00-2.568-5.622c-9.79-5.044-15.872-15.01-15.872-26.01 0-16.122 13.116-29.238 29.236-29.238s29.238 13.116 29.238 29.238c0 11-6.082 20.966-15.87 26.01a4.998 4.998 0 002.29 9.444h8.626c17.218 0 31.226 14.008 31.226 31.228a5 5 0 005 5 5 5 0 005-5c.006-20.934-15.678-38.274-35.91-40.888zM364.62 311.37c6.128-7.018 9.642-16.108 9.642-25.796 0-21.636-17.602-39.238-39.238-39.238-21.634 0-39.236 17.602-39.236 39.238 0 9.688 3.514 18.778 9.642 25.796-13.378 1.728-24.736 9.916-30.918 21.304-6.182-11.388-17.538-19.578-30.918-21.306 6.128-7.016 9.642-16.106 9.642-25.794 0-21.636-17.602-39.238-39.236-39.238-21.636 0-39.238 17.602-39.238 39.238 0 9.688 3.514 18.78 9.644 25.796-13.38 1.728-24.736 9.916-30.918 21.304-6.182-11.388-17.538-19.576-30.918-21.304 6.128-7.016 9.642-16.106 9.642-25.794 0-21.636-17.602-39.238-39.238-39.238-21.634 0-39.236 17.602-39.236 39.238 0 9.688 3.514 18.78 9.642 25.794-20.236 2.612-35.918 19.954-35.918 40.888v56.132a5 5 0 005 5h363.072a5 5 0 005-5v-56.132c.002-20.934-15.682-38.274-35.914-40.888zM37.464 352.256c0-17.218 14.008-31.228 31.228-31.228h8.628a4.998 4.998 0 002.29-9.444c-9.79-5.044-15.87-15.01-15.87-26.01 0-16.122 13.116-29.238 29.236-29.238s29.238 13.116 29.238 29.238c0 11-6.082 20.966-15.87 26.01a5 5 0 002.29 9.444h8.628c17.218 0 31.228 14.008 31.228 31.228v51.132H37.464v-51.132zm121.024 0c0-17.218 14.008-31.228 31.228-31.228h8.628a4.998 4.998 0 002.29-9.444c-9.79-5.044-15.872-15.01-15.872-26.01 0-16.122 13.116-29.238 29.238-29.238s29.236 13.116 29.236 29.238c0 11-6.08 20.968-15.87 26.01a5 5 0 002.29 9.446h8.628c17.218 0 31.226 14.008 31.226 31.228v51.132H158.486v-51.134h.002zm232.048 51.134H279.512v-51.132c0-17.218 14.01-31.228 31.228-31.228h8.626a5.003 5.003 0 004.86-3.822 5.002 5.002 0 00-2.568-5.622c-9.79-5.044-15.872-15.01-15.872-26.01 0-16.122 13.116-29.238 29.236-29.238s29.238 13.116 29.238 29.238c0 11-6.082 20.966-15.87 26.01a4.998 4.998 0 002.29 9.444h8.626c17.218 0 31.226 14.008 31.226 31.228v51.132h.004zM194.63 140.62a15.413 15.413 0 0010.97 4.544c4.144 0 8.04-1.614 10.97-4.544l41.224-41.224a15.41 15.41 0 004.544-10.972c0-4.144-1.614-8.042-4.542-10.97a15.418 15.418 0 00-10.97-4.544 15.406 15.406 0 00-10.97 4.544L205.6 107.708l-13.454-13.454a15.41 15.41 0 00-10.97-4.544 15.412 15.412 0 00-10.97 4.542 15.419 15.419 0 00-4.546 10.972c0 4.144 1.616 8.042 4.546 10.97l24.424 24.426zm-17.352-39.298a5.476 5.476 0 013.898-1.614 5.48 5.48 0 013.898 1.614l16.992 16.99a4.996 4.996 0 007.07 0l33.792-33.79c2.076-2.082 5.712-2.084 7.796 0a5.478 5.478 0 011.616 3.9 5.478 5.478 0 01-1.616 3.9L209.5 133.548c-2.084 2.082-5.714 2.082-7.798 0l-24.424-24.426a5.478 5.478 0 01-1.616-3.9c0-1.474.572-2.856 1.616-3.9z"
                    fill="#846F75"
                  />
                  <Path
                    d="M422.236 438.3H5.764a5 5 0 01-5-5V232.612a5 5 0 015-5h416.472a5 5 0 015 5V433.3a5 5 0 01-5 5zm-411.472-10h406.472V237.612H10.764V428.3zM279.02 179.056H148.98a5 5 0 01-5-5V44.016a5 5 0 015-5h130.04a5 5 0 015 5v130.04a5 5 0 01-5 5zm-125.04-10h120.04V49.016H153.98v120.04z"
                    fill="#ED9ABC"
                  />
                  <Path
                    d="M214 237.612a5 5 0 01-5-5V175.42a5 5 0 015-5 5 5 0 015 5v57.192a5 5 0 01-5 5z"
                    fill="#ED9ABC"
                  />
                </Svg>
              </View>
              <View style={styles.settingTextWrapper}><Text style={styles.settingText}>Support a Charity (<Text style={{fontFamily:'Poppins-SemiBold'}}>{supportLinks[randomCharityIndex].name}</Text>)</Text></View>
            </View>
          </TouchableOpacity>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1A2C34',
        backgroundColor: '#FCFCFC'
    },
    titleWrapper:{
      marginTop:30
    },
    title:{
      paddingHorizontal: 25,
      paddingTop: 10,
      paddingBottom: 3,
      color: '#515D70',
      fontSize: 15,
      fontFamily: 'Poppins-Medium'
    },


    settingsWrapper:{
      paddingHorizontal: 25,
      paddingVertical: 20
    },
    settingRow:{
        flexDirection:'row',
        alignItems: 'center',
        marginBottom: 20
    },
    settingSVGWrapper:{
        marginRight: 10
    },
    settingTextWrapper:{
        paddingTop: 2
    },
    settingText:{
        color: '#515D70',
        fontSize: 16.5,
        fontFamily: 'Poppins-Regular'
    }
})