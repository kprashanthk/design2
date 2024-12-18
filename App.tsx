import React, {useEffect, useState} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import WelcomeScreen from './src/screens/WelcomeScreen';
import {DrawerNavigation} from './src/navigation/DrawerNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {AsyncStorageProvider} from './src/hooks/AsyncStorageContext';

function App(): React.JSX.Element {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 500);
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
          )}
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
    <App />
  </AsyncStorageProvider>
);

export default AppWrapper;
