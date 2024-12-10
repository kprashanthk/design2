import {createDrawerNavigator} from '@react-navigation/drawer';
import LabourGangUsageRail from '../screens/labourManagementScreens/LabourGangUsageRailScreen';
import GangUsageForMiscellaneous from '../screens/labourManagementScreens/GangUsageForMiscellaneousScreen';
import LabourGangAllocation from '../screens/labourManagementScreens/LabourGangAllocationScreen';
import React, {useState} from 'react';
import CustomSideNavigation from './sharedNavigation/CustomSideNavigation';
import Stacking from '../screens/shedOperaionsScreens/StackingScreen';
import ManualSync from '../screens/ManualSyncScreen';
import StackNavigation from './StackNavigation/StackNavigation';
import LoginStackNavigation from './StackNavigation/LoginStackNavigation';
import Settings from '../screens/SettingsScreen';
import LabourGangUsageScreen from '../screens/labourManagementScreens/LabourGangUsageScreen';
import LabourGangUsageRailScreen from '../screens/labourManagementScreens/LabourGangUsageRailScreen';
import GangUsageForMiscellaneousScreen from '../screens/labourManagementScreens/GangUsageForMiscellaneousScreen';
import LabourGangAllocationScreen from '../screens/labourManagementScreens/LabourGangAllocationScreen';
import StackingScreen from '../screens/shedOperaionsScreens/StackingScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ManualSyncScreen from '../screens/ManualSyncScreen';
import {ImageBackground, useWindowDimensions} from 'react-native';
import ROToken from '../screens/tokenManagement/ROToken';
import GatePassScreen from '../screens/gateManagement/GatePassScreen';
import OutWeightFormComponents from '../formComponents/weightBridge/OutWeightFormComponents';
import OutWeightScreen from '../screens/weighBridge/OutWeightScreen';
import GatePassExitScreen from '../screens/gateManagement/GatePassExitScreen';
import InWeightScreen from '../screens/weighBridge/InWeightScreen';
import GenerateTruckChit from '../formComponents/weightBridge/GenerateTruckChit';
import GenerateTruckChitScreen from '../screens/weighBridge/GenerateTruckChitScreen';
import LoadingScreen from '../screens/shedOperaionsScreens/LoadingScreen';
import UpdateMoistScreen from '../screens/quality/UpdateMoistScreen';
import StorageNavigation from '../formComponents/storage/StorageNavigation';

const Drawer = createDrawerNavigator();

export function DrawerNavigation() {
  // Function to clear tokens

  const {width} = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomSideNavigation {...props} />}
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        drawerStyle: {width: width * 0.8},

        headerStyle: {
          backgroundColor: '#00A676',
        },
        headerTintColor: '#FFFFFF',
        headerTitleAlign: 'center',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <Drawer.Screen
        name="Login"
        component={LoginStackNavigation}
        options={{drawerItemStyle: {display: 'none'}}}
      />
      <Drawer.Screen
        name="Labour Gang Usage"
        component={LabourGangUsageScreen}
      />
      <Drawer.Screen
        name="Labour Gang Usage Rail"
        component={LabourGangUsageRailScreen}
      />
      <Drawer.Screen
        name="Gang Usage For Miscellaneous"
        component={GangUsageForMiscellaneousScreen}
      />
      <Drawer.Screen
        name="Labour Gang Allocation"
        component={LabourGangAllocationScreen}
      />
      <Drawer.Screen
        name="Stacking"
        component={StackingScreen}
        options={{drawerLabelStyle: {color: 'red'}}}
      />
      {/* <Drawer.Screen
        name="Logout"
        component={LoginStackNavigation}
        options={{drawerLabelStyle: {color: 'red'}}}
      /> */}
      <Drawer.Screen
        name="Logout"
        component={LoginStackNavigation}
        options={{
          drawerLabelStyle: {color: 'red'},
        }}
      />

      <Drawer.Screen
        name="Home"
        component={StackNavigation}
        options={{drawerLabelStyle: {color: 'red'}}}
      />

      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Master Sync" component={ManualSyncScreen} />
      <Drawer.Screen name="RO Token" component={ROToken} />
      <Drawer.Screen name="Gate Pass" component={GatePassScreen} />
      <Drawer.Screen name="OutWeight" component={OutWeightScreen} />
      <Drawer.Screen name="Gate Pass Exit" component={GatePassExitScreen} />
      <Drawer.Screen name="InWeight" component={InWeightScreen} />
      <Drawer.Screen name="Loading" component={LoadingScreen} />
      <Drawer.Screen
        name="Update Moisture For Issue"
        component={UpdateMoistScreen}
      />

      <Drawer.Screen
        name="GenerateTruckChit"
        component={GenerateTruckChitScreen}
      />
       <Drawer.Screen name="Storage" component={StorageNavigation} />
    </Drawer.Navigator>
  );
}
