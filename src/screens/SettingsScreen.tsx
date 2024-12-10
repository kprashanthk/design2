import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Progress from 'react-native-progress';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RadioButton} from 'react-native-paper';
import i18next from '../locales/language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../assets/colors/colors';
import { Fonts } from '../assets/colors/fonts';

interface shedItem {
  id: string;
  title: string;
  iconName: string;
  progress: number;
  stackCount: number;
}

const Settings = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    (async () => {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    })();
  }, []);

  async function changelng(lng: string) {
    await AsyncStorage.setItem('selectedLanguage', lng);
    setLanguage(lng);
    i18next.changeLanguage(lng);
    console.log('Selected Language:', lng);
    setShowLanguageOptions(false);
  }

  const [showLanguageOptions, setShowLanguageOptions] =
    useState<boolean>(false);

  const [language, setLanguage] = useState<string>('en');

  const {t} = useTranslation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/5.jpg')}
          style={styles.imageStyles}
        />
        <LinearGradient
          colors={['transparent', '#003831']}
          style={styles.gradientOverlay}
        />
      </View> */}

      <View style={styles.menuContainer}>
        <TouchableOpacity
          onPress={openDrawer}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <MaterialCommunityIcons
            name="menu"
            color={Colors.mainColor}
            size={30}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.scrollableContainer]}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyles}>{t('Settings')}</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
              <Entypo name="language" size={40} color={Colors.mainColor} />
              <View style={styles.content}>
                <Text style={styles.mainHeading}>{t('Change Language')}</Text>
              </View>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="arrow-down-drop-circle"
                  size={25}
                  color={Colors.mainColor}
                  onPress={() => setShowLanguageOptions(!showLanguageOptions)}
                />
              </View>
            </View>

            {showLanguageOptions && (
              <RadioButton.Group
                value={language}
                onValueChange={newValue => changelng(newValue)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 10,
                  }}>
                  <RadioButton color={Colors.mainColor} value="en" />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: Fonts.notoSans,
                      fontSize: 24,
                      fontWeight: 'bold',
                    }}>
                    English
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 10,
                  }}>
                  <RadioButton color={Colors.mainColor} value="hi" />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: Fonts.notoSans,
                      fontSize: 24,
                      fontWeight: 'bold',
                    }}>
                    हिंदी
                  </Text>
                </View>
              </RadioButton.Group>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#003831',
  },
  imageContainer: {
    width: '100%',
    height: '80%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyles: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.7,
  },
  fixedHeader: {
    position: 'absolute',
    marginTop: 35,
    marginLeft: 30,
    zIndex: 10,
    width: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  menuContainer: {
    position: 'absolute',
    top: 33,
    left: 20,
    zIndex: 20,
  },
  scrollableContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  titleStyles: {
    fontFamily: Fonts.notoSans,
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: Colors.mainColor,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  flatlistContainer: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },
  shedContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // marginRight: 10,
  },
  cont: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 23,
  },
  wheatImage: {},
  iconContainer: {
    marginLeft: 'auto',
  },
  headerStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  title: {
    fontSize: 20,
    fontFamily: Fonts.notoSans,
  },
  content: {
    flex: 1,
    marginLeft: 20,
  },
  mainHeading: {
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: Fonts.notoSans,
    fontStyle: 'normal',
    fontWeight: 'bold',
    // color: 'Colors.mainColor',
    marginRight: 10,
  },
  outerContainer: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
  },
});
export default Settings;
