import {useNavigation} from '@react-navigation/native';
import i18next from '../locales/language';
import {useLayoutEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../assets/colors/colors';
import {Fonts} from '../assets/colors/fonts';

export default function StartScreen() {
  const languages = [
    {title: 'English', value: 'en'},
    {title: 'हिंदी', value: 'hi'},
  ];
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const navigation = useNavigation();
  const {t} = useTranslation();

  useLayoutEffect(() => {
    (async () => {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      if (savedLanguage) {
        setSelectedLanguage(savedLanguage);
        i18next.changeLanguage(savedLanguage);
      }
    })();
  }, []);

  async function changelng(lng: string) {
    await AsyncStorage.setItem('selectedLanguage', lng);
    setSelectedLanguage(lng);
    i18next.changeLanguage(lng);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContentContainer}
      keyboardShouldPersistTaps="handled">
      <View style={styles.logoCenterStyles}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/2.png')}
            style={styles.imageStyles}
          />
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleStyles}>{t('Anna Darpan')}</Text>
      </View>

      <View style={styles.fieldsContainer}>
        <View style={{marginBottom: 10}}>
          <Text style={styles.languageTitleStyles}>{t('Choose Language')}</Text>
        </View>
        <View style={styles.languagesContainer}>
          {languages.map(language => {
            const isSelected = language.value === selectedLanguage;
            return (
              <TouchableOpacity
                key={language.value}
                style={[
                  styles.languageListContainer,
                  isSelected && styles.selectedLanguageContainer,
                ]}
                onPress={() => changelng(language.value)}>
                <Text
                  style={[
                    styles.languageTextStyles,
                    isSelected && styles.selectedLanguageTextStyle,
                  ]}>
                  {language.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}
          onPress={() => navigation.navigate('Login Page')}>
          <Entypo name="arrow-right" size={45} color={'white'} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  imageStyles: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoContainer: {
    width: 250,
    height: 250,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  logoStyles: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
  },
  logoCenterStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  titleStyles: {
    fontFamily: Fonts.boldFamily,
    fontSize: 30,
    color: Colors.mainColor,
    textAlign: 'center',
  },
  fieldsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  languagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  languageListContainer: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 10,
    margin: 10,
    width: '35%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  selectedLanguageContainer: {
    borderColor: Colors.mainColor,
    backgroundColor: 'white',
    borderWidth: 2,
  },
  selectedLanguageTextStyle: {
    color: Colors.mainColor,
  },
  languageTextStyles: {
    fontFamily: Fonts.boldFamily,
    fontSize: 20,
    color: '#003831',
  },
  languageTitleStyles: {
    fontFamily: Fonts.boldFamily,
    fontSize: 24,
  },
  buttonContainer: {
    backgroundColor: Colors.mainColor,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },

  checkedLanguageStyles: {},
});
