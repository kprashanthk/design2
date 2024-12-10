import React, {useState, useEffect} from 'react';
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

import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Colors} from '../assets/colors/colors';
import { Fonts } from '../assets/colors/fonts';

interface shedItem {
  id: string;
  title: string;
  iconName: string;
  progress: number;
  stackCount: number;
}

const ContactUs = () => {
  const navigation = useNavigation();

  const {t} = useTranslation();

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
      <View style={styles.menuContainer}></View>
      <View style={[styles.scrollableContainer]}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            onPress={() => {
              navigation.navigate('Login Page');
            }}
            style={styles.iconContainer}>
            <Ionicons
              name="arrow-back-circle-sharp"
              color={Colors.mainColor}
              size={40}
            />
          </TouchableOpacity>
          <Text style={styles.titleStyles}>{t('Contact Us')}</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.innerContainer}>
            <Ionicons name="mail" size={40} color={Colors.mainColor} />
            <View style={styles.content}>
              <Text style={styles.mainHeading}>{t('Email Us')}</Text>
              <Text style={{}}>abc@gmail.com</Text>
            </View>
          </View>
          <View style={styles.innerContainer}>
            <FontAwesome5 name="phone-alt" size={40} color={Colors.mainColor} />
            <View style={styles.content}>
              <Text style={styles.mainHeading}>{t('Contact Us')}</Text>
              <Text style={{}}>9999999999</Text>
            </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    position: 'relative',
    paddingHorizontal: 20,
  },
  iconContainer: {
    position: 'absolute',
    left: 10,
  },
  titleStyles: {
    fontFamily: Fonts.notoSans,
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: Colors.mainColor,
    textAlign: 'center',
  },

  innerContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    padding: 10,
    marginTop: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
  },
  flatlistContainer: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },
  shedContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  cont: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 23,
  },
  wheatImage: {},
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
    marginLeft: 20,
    flexDirection: 'column',
  },
  mainHeading: {
    marginBottom: 5,
  },
});
export default ContactUs;
