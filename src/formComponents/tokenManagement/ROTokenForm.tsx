import React, {useState, useEffect, useCallback, useRef} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import GenericInputField from '../../shared/component/GenericInputField';
import GenericDropDown from '../../shared/component/GenericDropDown';
import GenericButton from '../../shared/component/GenericButton';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GenericCheckBox from '../../shared/component/GenericCheckBox';
import GenericAlert from '../../shared/component/GenericAlert';
import {useTranslation} from 'react-i18next';
import GenericSnackBar from '../../shared/component/GenericSnackBar';

export type RODataType = {
  roNumber: string;
  pendingQuantity: string;
  commodity: string;
  variety: string;
  truckNumber?: string;
  token: string;
  flags?: {[key: string]: boolean};
};

export type Option = {
  title: string;
  value: string;
};

export default function ROTokenForm() {
  const {
    storeData,
    getData,
    storedValue,
    setStoredValue,
    storeAndValidateData,
  } = useAsyncStorage(); // Destructure the required functions
  const [truckNumber, setTruckNumber] = useState('');
  const [remarks, setRemarks] = useState('');
  const [selectedRo, setSelectedRo] = useState<RODataType | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [createGatePass, setCreateGatePass] = useState(false);
  const prevStoredValueRef = useRef<RODataType[]>(storedValue);
  const [visible, setVisible] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const {t} = useTranslation();

  // useFocusEffect(
  //   useCallback(() => {
  //     const fetchStoredValue = async () => {
  //       try {
  //         const value = await AsyncStorage.getItem('roList');
  //         if (value != null) {
  //           const parsedValue = JSON.parse(value);
  //           if (
  //             JSON.stringify(parsedValue) !==
  //             JSON.stringify(prevStoredValueRef.current)
  //           ) {
  //             setStoredValue(parsedValue);
  //             prevStoredValueRef.current = parsedValue;
  //           }
  //         }
  //       } catch (error) {
  //         console.error(
  //           'Error fetching stored value from AsyncStorage:',
  //           error,
  //         );
  //       }
  //     };

  //     fetchStoredValue();

  //     if (storedValue && storedValue.length > 0) {
  //       const updatedOptions = storedValue
  //         .filter((ro: RODataType) => !ro.flags?.createTokenProcessed)
  //         .map((ro: RODataType) => ({
  //           title: ro.roNumber,
  //           value: ro.roNumber,
  //         }));

  //       setOptions(prevOptions => {
  //         if (JSON.stringify(prevOptions) !== JSON.stringify(updatedOptions)) {
  //           return updatedOptions;
  //         }
  //         return prevOptions;
  //       });
  //     }
  //   }, [storedValue]),
  // );
  useFocusEffect(
    useCallback(() => {
      const fetchStoredValue = async () => {
        try {
          const value = await AsyncStorage.getItem('roList');
          if (value != null) {
            const parsedValue = JSON.parse(value);
            if (
              JSON.stringify(parsedValue) !==
              JSON.stringify(prevStoredValueRef.current)
            ) {
              setStoredValue(parsedValue);
              prevStoredValueRef.current = parsedValue;
            }
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
        .filter((ro: RODataType) => !ro.flags?.createTokenProcessed)
        .map((ro: RODataType) => ({
          title: ro.roNumber,
          value: ro.roNumber,
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
      (ro: RODataType) => ro.roNumber === selectedValue,
    );
    setSelectedRo(selectedRoData || null);
  };

  const handleCheckBox = async (value: boolean) => {
    setCreateGatePass(value);
  };

  const handleSubmit = async () => {
    if (!selectedRo) {
      Alert.alert('Error', 'Please select an RO Number.');
      return;
    }

    if (!truckNumber.trim()) {
      Alert.alert('Error', 'Truck Number is mandatory.');
      return;
    }

    try {
      const updatedRoList = storedValue.map((ro: RODataType) => {
        const isSelectedRo = ro.roNumber === selectedRo.roNumber;
        return isSelectedRo
          ? {
              ...ro,
              truckNumber,
              flags: {
                ...ro.flags,
                createTokenProcessed: true,
                ...(createGatePass && {gatePass: true}),
              },
            }
          : ro;
      });
      await storeData('roList', updatedRoList);
      setTruckNumber('');
      setRemarks('');
      setSelectedRo(null);
      setVisible(true);
      // setSnackBar(true);

      // Alert.alert('Success', 'Form submitted successfully.');
    } catch (error) {
      console.error('Error during form submission:', error);
      Alert.alert('Error', 'An error occurred while submitting the form.');
    }
  };

  return (
    <View style={styles.container}>
      <GenericInputField
        label="Transaction Type"
        placeholder="Transaction Type"
        value="Issue"
        editable={false}
      />
      <GenericInputField
        label="Source Depot"
        placeholder="Source Depot"
        value="Banur_Test"
        editable={false}
      />
      <GenericDropDown
        key={options}
        label="RO Number"
        Options={options}
        onSelect={handleRoSelect}
      />
      <GenericInputField
        key={selectedRo?.truckNumber}
        label="Truck Number"
        placeholder="Enter Truck Number"
        value={truckNumber}
        onChangeText={setTruckNumber}
        keyboardType="default"
      />
      <GenericInputField
        key={selectedRo?.pendingQuantity}
        label="Pending Quantity (in Qtl)"
        placeholder="Pending Quantity (in Qtl)"
        value={selectedRo?.pendingQuantity || ''}
        editable={false}
      />
      <GenericInputField
        key={selectedRo?.commodity}
        label="Commodity"
        placeholder="Commodity"
        value={selectedRo?.commodity || ''}
        editable={false}
      />
      <GenericInputField
        key={selectedRo?.variety}
        label="Variety"
        placeholder="Variety"
        value={selectedRo?.variety || ''}
        editable={false}
      />
      <GenericInputField
        label="Remarks"
        placeholder="Remarks"
        value={remarks}
        onChangeText={setRemarks}
        multiline
        lines={4}
      />
      <GenericCheckBox
        checked={createGatePass}
        title="Generate GatePass"
        onCheck={handleCheckBox}
      />
      <GenericButton
        title="Submit"
        onPress={handleSubmit}
        buttonStyles={{width: '50%'}}
      />

      <GenericAlert
        visible={visible}
        title={t('Token Created succesfully')}
        setVisible={() => setVisible(false)}
        setSnackBar={setSnackBar}
      />
    <GenericSnackBar
        visible={snackBar}
        setVisible={setSnackBar}
        title={createGatePass ? 'Capture InWeight' : 'Gate Pass'}
        navigationText={createGatePass ? 'InWeight' : 'Gate Pass'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
