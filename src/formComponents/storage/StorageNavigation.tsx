import {DrawerActions, useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../assets/colors/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';
import React from 'react';
import {Fonts} from '../../assets/colors/fonts';

export default function StorageNavigation() {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const navItems = [
    {
      label: 'Sheds',
      screen: 'Home',
      icon: 'warehouse',
      library: 'MaterialCommunityIcons',
    },
  ];

  const navigateTo = (screenName: string) => {
    navigation.navigate(screenName);
  };
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  const renderNavItem = ({
    label,
    screen,
    icon,
  }: {
    label: string;
    screen: string;
    icon: string;
  }) => (
    <View style={{flex: 1}}>
      <TouchableOpacity
        key={screen}
        onPress={() => navigateTo(screen)}
        style={styles.navigationItem}>
        <Icon name={icon} size={40} color={Colors.mainColor} />
        <Text style={styles.navigationText}>{t(label)}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.scrollableContainer}>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            onPress={openDrawer}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Icon name="menu" color={Colors.mainColor} size={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>{t('Storage')}</Text>
        </View>
      </View>
      <View style={styles.navigationContainer}>
        {navItems.map(renderNavItem)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.newColor,
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 40,
    width: '90%',
    paddingHorizontal: 10,
  },
  drawerIcon: {
    alignSelf: 'flex-start',
  },
  titleText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 30,
    color: Colors.mainColor,
    marginLeft: 30,
    fontFamily: Fonts.boldFamily,
  },
  navigationContainer: {
    position: 'absolute',
    top: '15%',
    marginLeft: 15,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 15,
    color: Colors.mainColor,
  },
  navigationItem: {
    width: '45%',
    margin: '2.5%',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  navigationText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    color: Colors.mainColor,
    fontFamily: Fonts.regularFamily,
  },
  menuContainer: {
    position: 'absolute',
    top: 40,
    left: 35,
    zIndex: 20,
  },
  scrollableContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});
