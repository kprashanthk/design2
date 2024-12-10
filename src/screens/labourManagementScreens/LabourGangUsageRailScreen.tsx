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
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import GenericScanner from '../../shared/component/GenericScanner';
import {useTranslation} from 'react-i18next';
import LabourGangUsageRail from '../../formComponents/labourManagement/LabourGangUsageRail';
import {Colors} from '../../assets/colors/colors';
import {Fonts} from '../../assets/colors/fonts';

export default function LabourGangUsageRailScreen() {
  const navigation = useNavigation();

  const {t} = useTranslation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const [visible, setVisible] = useState<boolean>(false);
  const [scannedData, setScannedData] = useState<{}>({});

  if (visible) {
    return (
      <View style={{flex: 1}}>
        <GenericScanner
          openCamera={visible}
          setOpenCamera={setVisible}
          setScannedData={setScannedData}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* <Image
          source={require('../../assets/5.jpg')}
          style={styles.imageStyles}
        /> */}
        <LinearGradient
          colors={['transparent', Colors.backgroundColor]}
          style={styles.gradientOverlay}
        />
      </View>
      <View style={styles.scannerContainer}>
        <TouchableOpacity
          onPress={() => setVisible(true)}
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
          <Text style={styles.titleStyles}>{t('Labour Gang Usage Rail')}</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={{flex: 1, padding: 10, marginTop: 5}}>
            <LabourGangUsageRail />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
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
    opacity: 0.5,
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
    textAlign: 'center',
  },
  menuContainer: {
    position: 'absolute',
    top: 10,
    left: 35,
    zIndex: 20,
  },
});