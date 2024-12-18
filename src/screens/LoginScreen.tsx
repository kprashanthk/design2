import React, {useLayoutEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import GenericInputField from '../shared/component/GenericInputField';
import GenericPasswordField from '../shared/component/GenericPasswordField';
import GenericButton from '../shared/component/GenericButton';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {Colors} from '../assets/colors/colors';
import {Fonts} from '../assets/colors/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Foundation from 'react-native-vector-icons/Foundation';
import useAsyncStorage from '../hooks/useAsyncStorage';

export default function LoginScreen() {
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState('en');
  const {clearData, getData, logAllKeys} = useAsyncStorage();

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
  useLayoutEffect(() => {
    (async () => {
      logAllKeys();
      getData('roList');
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
        i18n.changeLanguage(savedLanguage);
      }
    })();
  }, []);
  const toggleLanguage = async () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLanguage);
    // await AsyncStorage.getItem('selectedLanguage');
    await AsyncStorage.setItem('selectedLanguage', newLanguage);
    setCurrentLanguage(newLanguage);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled">
        <View style={[styles.languageToggle]}>
          <TouchableOpacity
            hitSlop={{top: 20, bottom: 20, left: 30, right: 30}}
            onPress={toggleLanguage}>
            <Ionicons
              name={
                currentLanguage === 'en' ? 'globe-outline' : 'language-sharp'
              }
              color={Colors.mainColor}
              size={30}
            />
            <Text style={styles.languageText}>
              {currentLanguage === 'en' ? 'हिंदी' : 'English'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.logoCenterStyles}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/2.png')}
                style={styles.logoStyles}
              />
            </View>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyles}>{t('Anna Darpan')}</Text>
          </View>
          <View style={styles.fieldsContainer}>
            <GenericInputField
              label={'Username'}
              placeholder={'Username'}
              containerStyles={{width: '85%'}}
              buttonContainerStyles={{height: 50}}
            />
            <GenericPasswordField
              label={'Password'}
              placeholder={'Password'}
              containerStyles={{width: '85%'}}
              buttonContainerStyles={{height: 50}}
            />
            <View style={styles.otpContainer}>
              <GenericInputField
                label={'Captcha'}
                placeholder={'Captcha'}
                containerStyles={{flex: 6, marginRight: 10}}
                buttonContainerStyles={{height: 50}}
              />
              <TextInput
                value="Abdk67"
                readOnly
                style={{
                  fontSize: 20,
                  fontFamily: Fonts.semiBoldFamiy,
                  backgroundColor: '#FFFFFF',
                  marginRight: 10,
                  borderRadius: 10,
                }}
              />
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => console.log('')}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                <Foundation name="refresh" size={24} color={Colors.mainColor} />
              </TouchableOpacity>
            </View>

            <GenericButton
              title={t('Submit')}
              onPress={async () => {
                const result = await clearLocalStorageAndNavigate(navigation);
              }}
              containerStyles={{width: '40%'}}
            />
            <View
              style={{
                marginBottom: 5,
                marginTop: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Forget Password')}
                hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}>
                <Text style={styles.contactText}>{t('Forget Password')}?</Text>
              </TouchableOpacity>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Contact Us')}
                hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}>
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
    backgroundColor: Colors.newColor,
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  languageToggle: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 2,
    alignItems: 'center',
  },
  languageText: {
    fontSize: 12,
    color: Colors.mainColor,
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: '30%',
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
    color: Colors.mainColor,
    fontFamily: Fonts.boldFamily,
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
  contactText: {
    color: Colors.mainColor,
    margin: 5,
    fontFamily: Fonts.mediumFamily,
    fontSize: 14,
  },
});
