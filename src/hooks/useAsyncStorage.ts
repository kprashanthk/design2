import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RoData} from '../data';

const useAsyncStorage = () => {
  const [storedValue, setStoredValue] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const value = await AsyncStorage.getItem('roList');
        // if (value) {
        //   setStoredValue(JSON.parse(value));
        // } else {
        //   // await storeData('roList', RoData);
        //   setStoredValue(RoData);
        // }
        if (!value) {
          setStoredValue(RoData);
        }
      } catch (e) {
        setError('Error loading data from AsyncStorage');
        console.error('Error loading data from AsyncStorage:', e);
      }
    };

    loadData();
  }, [storedValue]);

  // useEffect(() => {
  //   const loadData = async () => {
  //     if (!storedValue) {
  //       await storeData('roList', RoData); // Store the data with a key
  //     }
  //   };
  //   loadData();
  // }, [storedValue]);

  const storeData = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value); // Update the storedValue state
    } catch (e) {
      setError('Error saving data to AsyncStorage');
      console.error('Error saving data to AsyncStorage:', e);
    }
  };

  const getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        setStoredValue(JSON.parse(value));
      }
    } catch (e) {
      setError('Error loading data from AsyncStorage');
      console.error('Error loading data from AsyncStorage:', e);
    }
  };

  const clearData = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      setStoredValue(null); // Clear the stored value
    } catch (e) {
      setError('Error clearing data from AsyncStorage');
      console.error('Error clearing data from AsyncStorage:', e);
    }
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      setStoredValue(null); // Clear all stored values
    } catch (e) {
      setError('Error clearing all data from AsyncStorage');
      console.error('Error clearing all data from AsyncStorage:', e);
    }
  };

  const logAllKeys = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error fetching keys from AsyncStorage:', error);
    }
  };

  const storeAndValidateData = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      const storedValue = await AsyncStorage.getItem(key);
      setStoredValue(value);
    } catch (e) {
      console.error('Error during AsyncStorage operation:', e);
    }
  };

  return {
    storedValue,
    error,
    getData,
    storeData,
    clearData,
    clearAll,
    setStoredValue,
    logAllKeys,
    storeAndValidateData,
  };
};

export default useAsyncStorage;
