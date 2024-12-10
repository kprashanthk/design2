import React from 'react';
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GenerateTruckChit from '../../formComponents/weightBridge/GenerateTruckChit';
import {Colors} from '../../assets/colors/colors';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Fonts} from '../../assets/colors/fonts';

export default function GenerateTruckChitScreen() {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* <Image
          source={require('../../assets/5.jpg')}
          style={styles.imageStyles}
        /> */}
        {/* <LinearGradient
          colors={['transparent', '#003831']}
          style={styles.gradientOverlay}
        /> */}
      </View>
      <View style={styles.scannerContainer}>
        <TouchableOpacity
          //   onPress={() => setVisible(true)}
          hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}>
          <Icon name="camera" size={28} color={Colors.mainColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            onPress={openDrawer}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Icon name="menu" color={Colors.mainColor} size={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.titleStyles}>{t('Generate Truck Chit')}</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={{flex: 1, padding: 10, marginTop: 5}}>
            <GenerateTruckChit />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: '90%',
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
    bottom: '1%',
    paddingVertical: 20,
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
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cameraControls: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{translateX: -50}],
    zIndex: 10,
  },
  closeCameraText: {
    fontSize: 18,
    color: '#fff',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
    fontFamily: Fonts.notoSans,
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
  menuContainer: {
    position: 'absolute',
    top: 10,
    left: 35,
    zIndex: 20,
  },
});
