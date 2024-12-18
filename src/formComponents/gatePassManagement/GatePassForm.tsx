import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import GenericDropDown from '../../shared/component/GenericDropDown';
import GenericInputField from '../../shared/component/GenericInputField';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GenericButton from '../../shared/component/GenericButton';
import {Option, RODataType} from '../models';
import GenericModal from '../../shared/component/GenericModal';
import GenericQRGenerator from '../../shared/component/GenericQRGenerator';
import GenericSnackBar from '../../shared/component/GenericSnackBar';

export default function GatePassForm() {
  const {storedValue, storeAndValidateData, setStoredValue} = useAsyncStorage();
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedRo, setSelectedRo] = useState<RODataType | null>(null);
  const [visible, setVisible] = useState(false);
  const [snackBar, setSnackBar] = useState(false);

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
        .filter(
          (ro: RODataType) =>
            ro.flags?.createTokenProcessed && !ro.flags?.gatePass,
        )
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
                createTokenProcessed: true,
                ...{gatePass: true},
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
        key={options}
        label="Token Number"
        Options={options}
        onSelect={handleRoSelect}
      />
      <GenericInputField
        key={selectedRo?.transactionType}
        label="Transaction Type"
        value={selectedRo?.transactionType || ''}
        placeholder="Transaction Type"
        editable={false}
      />
      <GenericInputField
        key={selectedRo?.roNumber}
        label="RO Number"
        value={selectedRo?.roNumber || ''}
        placeholder="RO Number"
        editable={false}
      />
      <GenericInputField
        key={selectedRo?.pendingQuantity}
        label="Pending Quantity (in Qtl)"
        value={selectedRo?.pendingQuantity || ''}
        placeholder="Pending Quantity (in Qtl)"
        editable={false}
      />
      <GenericButton
        title="Submit"
        onPress={handleSubmit}
        buttonStyles={{width: '50%'}}
      />
      <GenericModal
        visible={visible}
        setVisible={setVisible}
        setSnackBar={setSnackBar}
        title="Gate Pass Submitted Successfuly">
        <GenericQRGenerator values={{}} />
      </GenericModal>

      <GenericSnackBar
        visible={snackBar}
        setVisible={setSnackBar}
        title="Capture InWeight"
        navigationText="InWeight"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
