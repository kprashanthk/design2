// import {
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

// import {useNavigation} from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useTranslation} from 'react-i18next';
// import GenericButton from '../shared/component/GenericButton';
// import GenericPasswordField from '../shared/component/GenericPasswordField';
// import GenericInputField from '../shared/component/GenericInputField';
// import GenericDropDown from '../shared/component/GenericDropDown';
// import React, {useEffect, useState} from 'react';
// import useAsyncStorage from '../hooks/useAsyncStorage';
// import {Colors} from '../assets/colors/colors';
// import {Fonts} from '../assets/colors/fonts';

// export default function LoginScreen() {
//   const {clearData} = useAsyncStorage();
//   const {logAllKeys, getData} = useAsyncStorage();
//   const [loginType, setLoginType] = useState('FCI Admin');
//   const navigation = useNavigation();

//   const {t} = useTranslation();
//   useEffect(() => {
//     logAllKeys();
//     getData('roList');
//   }, []);
//   const clearLocalStorageAndNavigate = async (navigation: any) => {
//     try {
//       await clearData('roList');
//       navigation.navigate('Master Sync');
//       return 'Local storage cleared and navigation successful';
//     } catch (error) {
//       console.error('Error clearing local storage:', error);
//       return 'Error';
//     }
//   };
//   const handleSelect = (value: string) => {
//     console.log(value);
//     setLoginType(value);
//   };
//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={styles.scrollContentContainer}
//         keyboardShouldPersistTaps="handled">
//         <View style={styles.menuContainer}>
//           <TouchableOpacity
//             hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
//             onPress={() => {
//               navigation.navigate('Start Page');
//             }}>
//             <Ionicons
//               name="arrow-back-circle-sharp"
//               color={Colors.mainColor}
//               size={40}
//             />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.imageContainer}>
//           <Image
//             source={require('../assets/1.png')}
//             style={styles.imageStyles}
//           />
//           <LinearGradient
//             colors={['transparent', '#003831']}
//             style={styles.gradientOverlay}
//           />
//         </View>
//         <View style={styles.formContainer}>
//           <View style={styles.logoCenterStyles}>
//             <View style={styles.logoContainer}>
//               <Image
//                 source={require('../assets/2.png')}
//                 style={styles.logoStyles}
//               />
//             </View>
//           </View>
//           <View style={styles.titleContainer}>
//             <Text style={styles.titleStyles}>{t('Anna Darpan')}</Text>
//           </View>
//           <View style={styles.fieldsContainer}>
//             <GenericDropDown
//               Options={[
//                 {title: 'FCI Admin', value: 'FCI Admin'},
//                 {title: 'Miller', value: 'Miller'},
//                 {title: 'Others', value: 'Others'},
//               ]}
//               label={'Login Type'}
//               onSelect={handleSelect}
//               value={loginType}
//               containerStyles={{width: '85%'}}
//               buttonContainerStyles={{height: 50}}
//             />
//             <GenericInputField
//               label={'Username'}
//               placeholder={'Username'}
//               containerStyles={{width: '85%'}}
//               buttonContainerStyles={{height: 50}}
//             />
//             <GenericPasswordField
//               label={'Password'}
//               placeholder={'Password'}
//               containerStyles={{width: '85%'}}
//               buttonContainerStyles={{height: 50}}
//             />
//             <View style={styles.otpContainer}>
//               <GenericInputField
//                 label={'OTP'}
//                 placeholder={'Enter OTP'}
//                 containerStyles={{flex: 6, marginRight: 10}}
//                 buttonContainerStyles={{height: 50}}
//               />
//               <GenericButton
//                 title={'OTP'}
//                 onPress={() => {}}
//                 containerStyles={styles.otpButtonContainer}
//                 buttonStyles={{height: 50}}
//               />
//             </View>

//             <GenericButton
//               title={'Submit'}
//               onPress={async () => {
//                 const result = await clearLocalStorageAndNavigate(navigation);
//               }}
//               containerStyles={{width: '40%'}}
//             />
//             <View
//               style={{
//                 marginBottom: 5,
//                 marginTop: 5,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('Forget Password')}
//                 hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}>
//                 <Text style={styles.contactText}>{t('Forget Password')}?</Text>
//               </TouchableOpacity>
//             </View>
//             <View style={{justifyContent: 'center', alignItems: 'center'}}>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('Contact Us')}
//                 hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}>
//                 <Text style={styles.contactText}>
//                   {t('Contact Us & Support')}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#003831',
//   },
//   scrollContentContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     paddingBottom: 20,
//   },
//   imageContainer: {
//     width: '100%',
//     height: 400,
//     borderBottomLeftRadius: 25,
//     borderBottomRightRadius: 25,
//     overflow: 'hidden',
//     position: 'absolute',
//   },
//   imageStyles: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//     opacity: 0.8,
//   },
//   gradientOverlay: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: '30%',
//   },
//   formContainer: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     // marginTop: -300,
//   },
//   logoContainer: {
//     width: 200,
//     height: 200,
//     // backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 80,
//     // elevation: 30,
//     // shadowColor: 'green',
//   },
//   logoStyles: {
//     width: 200,
//     height: 200,
//     resizeMode: 'cover',
//   },
//   menuContainer: {
//     position: 'absolute',
//     top: 35,
//     left: 20,
//     zIndex: 20,
//   },
//   logoCenterStyles: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   titleContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 10,
//   },
//   titleStyles: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: Colors.mainColor,
//     fontFamily: Fonts.notoSans,
//   },
//   fieldsContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     width: '85%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
//   otpButtonContainer: {
//     flex: 4,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   contactText: {
//     color: Colors.mainColor,
//     marginTop: 15,
//   },
// });
// import {
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import GenericDropDown from '../shared/component/GenericDropDown';
// import GenericInputField from '../shared/component/GenericInputField';
// import GenericPasswordField from '../shared/component/GenericPasswordField';
// import GenericButton from '../shared/component/GenericButton';
// import {useNavigation} from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useTranslation} from 'react-i18next';
// import {Colors} from '../assets/colors/colors';

// export default function LoginScreen() {
//   const navigation = useNavigation();

//   const {t} = useTranslation();

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={styles.scrollContentContainer}
//         keyboardShouldPersistTaps="handled">
//         <View style={styles.menuContainer}>
//           <TouchableOpacity
//             hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
//             onPress={() => {
//               navigation.navigate('Start Page');
//             }}>
//             <Ionicons
//               name="arrow-back-circle-sharp"
//               color={Colors.themeColor}
//               size={40}
//             />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.imageContainer}>
//           <Image
//             source={require('../assets/1.jpg')}
//             style={styles.imageStyles}
//           />
//           <LinearGradient
//             colors={['transparent', Colors.backgroundColor]}
//             style={styles.gradientOverlay}
//           />
//         </View>
//         <View style={styles.formContainer}>
//           <View style={styles.logoCenterStyles}>
//             <View style={styles.logoContainer}>
//               <Image
//                 source={require('../assets/2.png')}
//                 style={styles.logoStyles}
//               />
//             </View>
//           </View>
//           <View style={styles.titleContainer}>
//             <Text style={styles.titleStyles}>{t('Anna Darpan')}</Text>
//           </View>
//           <View style={styles.fieldsContainer}>
//             <GenericDropDown
//               Options={[
//                 {title: 'Miller', value: 'Miller'},
//                 {title: 'Farmer', value: 'Farmer'},
//                 {title: 'FCI Admin', value: 'FCI Admin'},
//               ]}
//               label={'Login Type'}
//               containerStyles={{width: '85%'}}
//               buttonContainerStyles={{height: 50}}
//             />
//             <GenericInputField
//               label={'Username'}
//               placeholder={'Username'}
//               containerStyles={{width: '85%'}}
//               buttonContainerStyles={{height: 50}}
//             />
//             <GenericPasswordField
//               label={'Password'}
//               placeholder={'Password'}
//               containerStyles={{width: '85%'}}
//               buttonContainerStyles={{height: 50}}
//             />
//             <View style={styles.otpContainer}>
//               <GenericInputField
//                 label={'OTP'}
//                 placeholder={'Enter OTP'}
//                 containerStyles={{flex: 6, marginRight: 10}}
//                 buttonContainerStyles={{height: 50}}
//               />
//               <GenericButton
//                 title={'OTP'}
//                 onPress={() => {}}
//                 containerStyles={styles.otpButtonContainer}
//                 buttonStyles={{height: 50}}
//               />
//             </View>

//             <GenericButton
//               title={'Submit'}
//               onPress={() => {
//                 navigation.navigate('Master Sync');
//               }}
//               containerStyles={{width: '40%'}}
//             />
//             <View
//               style={{
//                 marginBottom: 5,
//                 marginTop: 5,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('Forget Password')}
//                 hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}>
//                 <Text style={styles.contactText}>{t('Forget Password')}?</Text>
//               </TouchableOpacity>
//             </View>
//             <View style={{justifyContent: 'center', alignItems: 'center'}}>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('Contact Us')}
//                 hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}>
//                 <Text style={styles.contactText}>
//                   {t('Contact Us & Support')}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.backgroundColor,
//   },
//   scrollContentContainer: {
//     flexGrow: 1,
//     justifyContent: 'space-between',
//     paddingBottom: 20,
//   },
//   imageContainer: {
//     width: '100%',
//     height: 400,
//     borderBottomLeftRadius: 25,
//     borderBottomRightRadius: 25,
//     overflow: 'hidden',
//   },
//   imageStyles: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//     opacity: 0.8,
//   },
//   gradientOverlay: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: '30%',
//   },
//   formContainer: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginTop: -300,
//   },
//   logoContainer: {
//     width: 160,
//     height: 160,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 80,
//     elevation: 30,
//     shadowColor: 'green',
//   },
//   logoStyles: {
//     width: 140,
//     height: 140,
//     resizeMode: 'cover',
//   },
//   menuContainer: {
//     position: 'absolute',
//     top: 35,
//     left: 20,
//     zIndex: 2,
//   },
//   logoCenterStyles: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   titleContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 10,
//   },
//   titleStyles: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#ebefef',
//   },
//   fieldsContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     width: '85%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
//   otpButtonContainer: {
//     flex: 4,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   contactText: {
//     color: '#ebefef',
//     marginTop: 15,
//   },
// });
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GenericDropDown from '../shared/component/GenericDropDown';
import GenericInputField from '../shared/component/GenericInputField';
import GenericPasswordField from '../shared/component/GenericPasswordField';
import GenericButton from '../shared/component/GenericButton';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {Colors} from '../assets/colors/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncStorage from '../hooks/useAsyncStorage';

export default function LoginScreen() {
  const {logAllKeys, getData} = useAsyncStorage();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {clearData} = useAsyncStorage();
  const [loginType, setLoginType] = useState('FCI Admin');

  // Animation for opacity and scaling of form elements

  useEffect(() => {
    // Trigger the animation on screen load
    logAllKeys();
    getData('roList');
  }, []);

  const clearLocalStorageAndNavigate = async (navigation: any) => {
    try {
      await clearData('roList');
      navigation.navigate('Master Sync');
      return 'Local storage cleared and navigation successful';
    } catch (error) {
      console.error('Error clearing local storage:', error);
      return 'Error';
    }
  };
  const handleSelect = (value: string) => {
    setLoginType(value);
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled">
        {/* Back Button */}
        <View style={styles.menuContainer}>
          <TouchableOpacity
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            onPress={() => navigation.navigate('Start Page')}>
            <Ionicons
              name="arrow-back-circle-sharp"
              color={Colors.mainColor}
              size={40}
            />
          </TouchableOpacity>
        </View>

        {/* Image and Gradient Overlay */}
        <View style={[styles.imageContainer]}>
          <Image
            source={require('../assets/1.png')}
            style={styles.imageStyles}
          />
          <LinearGradient
            colors={['transparent', Colors.mainColor]}
            style={styles.gradientOverlay}
          />
        </View>

        <View style={[styles.formContainer]}>
          {/* Logo */}
          <View style={styles.logoCenterStyles}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/2.png')}
                style={styles.logoStyles}
              />
            </View>
          </View>

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyles}>{t('Anna Darpan')}</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.fieldsContainer}>
            <GenericDropDown
              Options={[
                {title: 'FCI Admin', value: 'FCI Admin'},
                {title: 'Miller', value: 'Miller'},
                {title: 'Others', value: 'Others'},
              ]}
              label={t('Login Type')}
              containerStyles={{width: '85%'}}
              buttonContainerStyles={{height: 50}}
              setValue={setLoginType}
              onSelect={handleSelect}
              value={loginType}
            />
            <GenericInputField
              label={t('Username')}
              placeholder={t('Username')}
              containerStyles={{width: '85%'}}
              buttonContainerStyles={{height: 50}}
            />
            <GenericPasswordField
              label={t('Password')}
              placeholder={t('Password')}
              containerStyles={{width: '85%'}}
              buttonContainerStyles={{height: 50}}
            />

            {/* OTP Section */}
            <View style={styles.otpContainer}>
              <GenericInputField
                label={t('OTP')}
                placeholder={t('Enter OTP')}
                containerStyles={{flex: 6, marginRight: 10}}
                buttonContainerStyles={{height: 50}}
              />
              <GenericButton
                title={t('Send OTP')}
                onPress={() => {}}
                containerStyles={styles.otpButtonContainer}
                buttonStyles={{height: 50}}
              />
            </View>

            {/* Submit Button */}
            <GenericButton
              title={t('Submit')}
              onPress={async () => {
                const result = await clearLocalStorageAndNavigate(navigation);
              }}
              containerStyles={{width: '40%'}}
            />

            {/* Links for Forgot Password and Contact Us */}
            <View style={styles.contactLinksContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Forget Password')}
                hitSlop={{top: 5, bottom: 5, left: 20, right: 20}}>
                <Text style={styles.contactText}>{t('Forget Password')}?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.contactLinksContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Contact Us')}
                hitSlop={{top: 5, bottom: 5, left: 20, right: 20}}>
                <Text style={styles.contactText}>
                  {t('Contact Us & Support')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainColor,
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: 400,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: 'hidden',
  },
  imageStyles: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.8,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: -300,
  },
  logoContainer: {
    width: 160,
    height: 160,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80,
    elevation: 30,
    shadowColor: 'green',
  },
  logoStyles: {
    width: 140,
    height: 140,
    resizeMode: 'cover',
  },
  menuContainer: {
    position: 'absolute',
    top: 35,
    left: 20,
    zIndex: 2,
  },
  logoCenterStyles: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  titleStyles: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ebefef',
  },
  fieldsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  otpButtonContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactLinksContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactText: {
    color: '#ebefef',
    marginTop: 15,
  },
});
