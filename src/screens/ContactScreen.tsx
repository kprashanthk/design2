import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Colors} from '../assets/colors/colors';
import {Fonts} from '../assets/colors/fonts';

const ContactUs = () => {
  const navigation = useNavigation();

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
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
              <Text style={{fontFamily: Fonts.regularFamily}}>
                abc@gmail.com
              </Text>
            </View>
          </View>
          <View style={styles.innerContainer}>
            <FontAwesome5 name="phone-alt" size={40} color={Colors.mainColor} />
            <View style={styles.content}>
              <Text style={styles.mainHeading}>{t('Contact Us')}</Text>
              <Text style={{fontFamily: Fonts.regularFamily}}>9999999999</Text>
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
  },
  scrollableContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
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
    fontFamily: Fonts.boldFamily,
    fontSize: 30,
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
    fontFamily: Fonts.semiBoldFamiy,
  },
});
export default ContactUs;
