import React, {useCallback, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import GenericDropDown from '../../shared/component/GenericDropDown';
import GenericInputField from '../../shared/component/GenericInputField';
import GenericButton from '../../shared/component/GenericButton';
import GenericAlert from '../../shared/component/GenericAlert';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Option, RODataType} from '../models';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import GenericSnackBar from '../../shared/component/GenericSnackBar';

type GenerateTruckChitType = {
  tokenNumber: string;
  commodity: string;
  cropYear: string;
  bagType: string;
  noOfBags: string;
  shed: string;
  stack: string;
  pendingQuantity: string;
};

export default function GenerateTruckChit() {
  const {storedValue, storeAndValidateData, setStoredValue} = useAsyncStorage();
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedRo, setSelectedRo] = useState<RODataType | null>(null);
  const [snackBar, setSnackBar] = useState(false);

  const [visible, setVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchStoredValue = async () => {
        try {
          const value = await AsyncStorage.getItem('roList');
          if (value != null) {
            const parsedValue = JSON.parse(value);
            setStoredValue(parsedValue);
          }
        } catch (error) {
          console.error(
            'Error fetching stored value from AsyncStorage:',
            error,
          );
        }
      };

      fetchStoredValue();
    }, []),
  );
  useEffect(() => {
    if (storedValue && storedValue.length > 0) {
      const updatedOptions = storedValue
        .filter((ro: RODataType) => ro.flags?.moisture && ro.flags?.loading)
        .map((ro: RODataType) => ({
          title: ro.token,
          value: ro.token,
        }));

      setOptions(prevOptions => {
        if (JSON.stringify(prevOptions) !== JSON.stringify(updatedOptions)) {
          return updatedOptions;
        }
        return prevOptions;
      });
    }
  }, [storedValue]);

  const handleRoSelect = (selectedValue: string) => {
    const selectedRoData = storedValue?.find(
      (ro: RODataType) => ro.token === selectedValue,
    );
    setSelectedRo(selectedRoData);
  };

  const handleSubmit = async () => {
    if (!selectedRo) {
      Alert.alert('Error', 'Please select Token Number.');
      return;
    }

    try {
      const updatedRoList = storedValue.map((ro: RODataType) => {
        const isSelectedRo = ro.token === selectedRo.token;
        return isSelectedRo
          ? {
              ...ro,
              flags: {
                ...ro.flags,
                ...{truckChit: true},
              },
            }
          : ro;
      });
      await storeAndValidateData('roList', updatedRoList);
      setSelectedRo(null);
      setVisible(true);
    } catch (error) {
      console.error('Error during form submission:', error);
      Alert.alert('Error', 'An error occurred while submitting the form.');
    }
  };

  return (
    <View style={styles.container}>
      <GenericDropDown
        Options={options}
        key={selectedRo?.token}
        label={'Token Number'}
        onSelect={handleRoSelect}
      />
      <GenericInputField
        key={selectedRo?.commodity}
        label={'Commodity'}
        placeholder={'Commodity'}
        value={selectedRo?.commodity || ''}
        editable={false}
      />
      <GenericInputField
        label={'Crop Year'}
        placeholder={'Crop Year'}
        key={selectedRo?.cropYear}
        value={selectedRo?.cropYear || ''}
        editable={false}
      />
      <GenericInputField
        label={'Bag Type'}
        placeholder={'Bag Type'}
        key={selectedRo?.bagType}
        value={selectedRo?.bagType || ''}
        editable={false}
      />
      <GenericInputField
        label={'No of Bags'}
        placeholder={'No of Bags'}
        key={selectedRo?.bags}
        value={selectedRo?.bags || ''}
        editable={false}
      />
      <GenericInputField
        label={'Shed'}
        placeholder={'Shed'}
        key={selectedRo?.shed}
        value={selectedRo?.shed || ''}
        editable={false}
      />
      <GenericInputField
        label={'Stack'}
        placeholder={'Stack'}
        key={selectedRo?.stack}
        value={selectedRo?.stack || ''}
        editable={false}
      />
      <GenericInputField
        label={'Pending Quantity (in MT.)'}
        placeholder={'Pending Quantity'}
        key={selectedRo?.pendingQuantity}
        value={selectedRo?.pendingQuantity}
        editable={false}
      />
      <GenericButton
        title="Submit"
        buttonStyles={{width: '50%'}}
        containerStyles={{marginTop: 10}}
        onPress={handleSubmit}
      />
      <GenericAlert
        visible={visible}
        title="Truck chit Created succesfully"
        setVisible={() => setVisible(false)}
        setSnackBar={setSnackBar}
      />
      <GenericSnackBar
        visible={snackBar}
        setVisible={setSnackBar}
        title="Gate Pass Exit"
        navigationText="Gate Pass Exit"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
