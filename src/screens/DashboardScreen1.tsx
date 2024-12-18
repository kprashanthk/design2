import React from 'react';
import {
  ScrollView,
  Text,
  Dimensions,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {Colors} from '../assets/colors/colors';
import {Fonts} from '../assets/colors/fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import RoundIcon from '../shared/component/RoundIcon';

const Dashboard1 = () => {
  const shedNavigation = [
    {
      name: 'Stacking',
      route: 'Stacking',
      expandable: 'false',
    },
  ];
  const storageNavigation = [
    {
      name: 'Sheds',
      route: 'Home',
      expandable: 'false',
    },
  ];
  const salesNavigation = [
    {
      name: 'Token Management > Issue',
      route: 'RO Token',
    },
    {
      name: 'Gate Management > Gate Pass',
      route: 'Gate Pass',
    },
    {
      name: 'Gate Management > Gate Pass Exit',
      route: 'Gate Pass Exit',
    },
    {
      name: 'Weigh Bridge > Out Weight',
      route: 'OutWeight',
    },
    {
      name: 'Weigh Bridge > In Weight',
      route: 'InWeight',
    },
    {
      name: 'Weigh Bridge > Truck Chit',
      route: 'GenerateTruckChit',
    },
    {
      name: 'Loading',
      route: 'Loading',
    },
  ];
  const qualityNavigation = [
    {
      name: 'Quality > Update Moisture For Issue',
      route: 'Update Moisture For Issue',
    },
  ];
  const labourNavigation = [
    {
      name: 'Labour > Labour Gang Usage',
      route: 'Labour Gang Usage',
    },
    {
      name: 'Labour > Labour Gang Usage Rail',
      route: 'Labour Gang Usage Rail',
    },
    {
      name: 'Labour > Gang Usage For Miscellaneous',
      route: 'Gang Usage For Miscellaneous',
    },
    {
      name: 'Labour > Labour Gang Allocation',
      route: 'Labour Gang Allocation',
    },
  ];
  const masterNavigation = [
    {
      name: 'Master Sync',
      route: 'Master Sync',
    },
  ];
  const settingsNavigation = [
    {
      name: 'Settings',
      route: 'Settings',
    },
  ];

  const navigation = useNavigation();
  const {t} = useTranslation();
  const width = Dimensions.get('window').width;
  const columns = 3; // Define how many columns you want in the grid

  const iconSize = (width - 260) / columns;

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          onPress={openDrawer}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          style={styles.menuIconContainer}>
          <Icon name="menu" color={Colors.mainColor} size={30} />
        </TouchableOpacity>
        <Text style={styles.titleStyles}>{t('Home')}</Text>
      </View>

      <View style={styles.dashboardContainer}>
        <View style={styles.row}>
          <RoundIcon
            label="Shed Operations"
            library="MaterialCommunityIcons"
            name="warehouse"
            navigationList={shedNavigation}
            route="Master Sync"
          />
          <RoundIcon
            label="Storage"
            library="FontAwesome6"
            name="boxes-stacked"
            navigationList={storageNavigation}
            route="Home"
          />
          <RoundIcon
            label="Sales Import / Export"
            library="MaterialCommunityIcons"
            name="truck-delivery-outline"
            navigationList={salesNavigation}
            route="RO Token"
          />
        </View>
        <View style={styles.row}>
          <RoundIcon
            label="Quality and PV"
            library="MaterialCommunityIcons"
            name="check-circle"
            navigationList={qualityNavigation}
            route="Update Moisture For Issue"
          />
          <RoundIcon
            label="Labour Management"
            library="FontAwesome6"
            name="people-carry-box"
            navigationList={labourNavigation}
            route="Labour Gang Usage"
          />
          <RoundIcon
            label="Master Sync"
            library="MaterialCommunityIcons"
            name="sync"
            navigationList={masterNavigation}
            route="Master Sync"
          />
        </View>
        <View style={styles.row}>
          <RoundIcon
            label="Settings"
            library="MaterialCommunityIcons"
            name="cog-outline"
            navigationList={settingsNavigation}
            route="Settings"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.newColor,
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
    fontFamily: Fonts.boldFamily,
    fontSize: 30,
    color: Colors.mainColor,
    textAlign: 'center',
  },
  card: {
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 6,
    marginVertical: 10,
  },

  dashboardContainer: {
    marginTop: 80,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard1;
