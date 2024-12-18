import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../assets/colors/colors';
import {Fonts} from '../../assets/colors/fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

type Props = {
  title: string;
  onPress: (value: boolean) => void;
  cameraVisible: boolean;
  cameraRequired?: boolean;
};

export default function GenericHeader({
  title,
  onPress,
  cameraVisible,
  cameraRequired = true,
  ...rest
}: Props) {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View>
      {cameraRequired && (
        <View style={styles.scannerContainer}>
          <TouchableOpacity
            onPress={() => onPress(true)}
            hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}>
            <Icon name="camera" size={28} color={Colors.mainColor} />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          onPress={openDrawer}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Icon name="menu" color={Colors.mainColor} size={30} />
        </TouchableOpacity>
      </View>

      <View style={[styles.titleContainer]}>
        <Text
          style={[
            styles.titleStyles,
            {marginTop: !cameraRequired ? '10%' : '18%'},
          ]}>
          {t(title)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scannerContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '2%',
    left: '50%',
    transform: [{translateX: -30}],
    zIndex: 10,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyles: {
    fontFamily: Fonts.boldFamily,
    fontSize: 24,
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
