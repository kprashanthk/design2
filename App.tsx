import React, {useEffect, useState} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import WelcomeScreen from './src/screens/WelcomeScreen';
import {DrawerNavigation} from './src/navigation/DrawerNavigation';
import {NavigationContainer} from '@react-navigation/native';
import DropDown from './src/shared/component/DropDown';
import DropdownInput from './src/shared/component/DropDown';
import {
  AsyncStorageProvider,
  useAsyncStorageContext,
} from './src/hooks/AsyncStorageContext';
import {RODataProvider} from './src/hooks/RODataContext';
// import useAsyncStorage from './src/hooks/useAsyncStorage';

function App(): React.JSX.Element {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // logAllKeys();
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar hidden={true} />
      <PaperProvider>
        <View style={styles.container}>
          {showWelcome ? (
            <WelcomeScreen />
          ) : (
            <NavigationContainer>
              <DrawerNavigation />
            </NavigationContainer>
            // <WelcomeScreen />
          )}
          {/* <DropDown /> */}
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const AppWrapper = () => (
  <AsyncStorageProvider>
    <RODataProvider>
      <App />
    </RODataProvider>
  </AsyncStorageProvider>
);

export default AppWrapper;
