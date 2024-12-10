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
import Ionicons from 'react-native-vector-icons/Ionicons';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import GenericButton from '../shared/component/GenericButton';
import {Colors} from '../assets/colors/colors';
import { Fonts } from '../assets/colors/fonts';
interface shedItem {
  id: string;
  title: string;
  iconName: string;
  progress: number;
  stackCount: number;
}

const ManualSync = () => {
  const navigation = useNavigation();

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
      <View>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            onPress={openDrawer}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            style={styles.menuIconContainer}>
            <Icon name="menu" color={Colors.mainColor} size={30} />
          </TouchableOpacity>
          <Text style={styles.titleStyles}>{t('Master Sync')}</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={{flex: 1, padding: 10, marginTop: 5}}>
            <View style={styles.innerContainer}>
              <View style={styles.content}>
                <Text style={styles.MainHeading}>{t('Procurement API')}</Text>
                <Text style={styles.SubHeading}>2024-03-20 18:03:00</Text>
              </View>
              <View>
                <FontAwesome5 name="sync" color="green" size={30} />
              </View>
            </View>

            <View style={styles.innerContainer}>
              <View style={styles.content}>
                <Text style={styles.MainHeading}>{t('Storage API')}</Text>
                <Text style={styles.SubHeading}>2024-03-20 18:03:00</Text>
              </View>
              <View>
                <FontAwesome5 name="sync" color="red" size={30} />
              </View>
            </View>

            <View style={styles.innerContainer}>
              <View style={styles.content}>
                <Text style={styles.MainHeading}>{t('Movement API')}</Text>
                <Text style={styles.SubHeading}>2024-03-20 18:03:00</Text>
              </View>
              <View>
                <FontAwesome5 name="sync" color="green" size={30} />
              </View>
            </View>
            <View style={styles.innerContainer}>
              <View style={styles.content}>
                <Text style={styles.MainHeading}>{t('Quality API')}</Text>
                <Text style={styles.SubHeading}>2024-03020 18:03:00</Text>
              </View>
              <View>
                <FontAwesome5 name="sync" color="red" size={30} />
              </View>
            </View>
            <View style={styles.innerContainer}>
              <View style={styles.content}>
                <Text style={styles.MainHeading}>{t('Sales API')}</Text>
                <Text style={styles.SubHeading}>2024-03020 18:03:00</Text>
              </View>
              <View>
                <FontAwesome5 name="sync" color="green" size={30} />
              </View>
            </View>

            <View style={styles.innerContainer}>
              <View style={styles.content}>
                <Text style={styles.MainHeading}>{t('Contract API')}</Text>
                <Text style={styles.SubHeading}>2024-03020 18:03:00</Text>
              </View>
              <View>
                <FontAwesome5 name="sync" color="green" size={30} />
              </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <GenericButton
                title="Go To Home"
                containerStyles={{width: '50%', marginTop: 20}}
                onPress={() => {
                  navigation.navigate('Storage');
                }}
                buttonStyles={{marginTop: 10}}
              />
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
  innerContainer: {
    flexDirection: 'row',
    padding: 20,
    marginTop: 10,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    marginRight: 10,
  },
  MainHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Fonts.notoSans
  },
  SubHeading: {
    fontSize: 15,
    fontFamily: Fonts.notoSans
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
    opacity: 0.6,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  card: {
    position: 'absolute',
    top: '3%',
    left: '3%',
    right: '3%',
    bottom: '3%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 6,
    zIndex: 5,
  },
  scannerContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '1%',
    left: '50%',
    transform: [{translateX: -30}],
    zIndex: 10,
  },
  titleContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 50,
  },
  menuIconContainer: {
    position: 'absolute',
    left: 30,
    zIndex: 1,
  },
  titleStyles: {
    fontFamily: Fonts.notoSans,
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: Colors.mainColor,
    textAlign: 'center',
  },
});
export default ManualSync;
