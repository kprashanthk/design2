import React, {useCallback, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import GenericDropDown from '../../shared/component/GenericDropDown';
import GenericInputField from '../../shared/component/GenericInputField';
import GenericButton from '../../shared/component/GenericButton';
import GenericList from '../../shared/component/GenericList';
import {Colors} from '../../assets/colors/colors';
import {Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import GenericAlert from '../../shared/component/GenericAlert';
import {RODataType} from '../models';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import { Fonts } from '../../assets/colors/fonts';

export default function UpdateMoistureForm() {
  const {storeAndValidateData, setStoredValue, storedValue} = useAsyncStorage();
  const [selectedRo, setSelectedRo] = useState<RODataType | null>(null);
  const {t} = useTranslation();
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValues, setInputValues] = useState<{
    [key: string]: {[values: string]: string};
  }>({
    '1': {Stack: '1', Shed: '109', Moisture: ''},
    '2': {Stack: '2', Shed: '107', Moisture: ''},
    '3': {Stack: '3', Shed: '101', Moisture: ''},
  });

  const [formData, setFormData] = useState({
    roNumber: '',
    commodity: '',
    cropYear: '',
    bagType: '',
    noOfBags: '',
  });

  const tokenData1 = [
    {title: '101', value: '101'},
    {title: '102', value: '102'},
    {title: '103', value: '103'},
  ];

  // const values = [
  //   {
  //     roNumber: '1101',
  //     commodity: 'Wheat',
  //     cropYear: '2017-18',
  //     bagType: 'SBT',
  //     bags: 30,
  //     title: '101',
  //   },
  //   {
  //     roNumber: '1102',
  //     commodity: 'Paddy',
  //     cropYear: '2019-20',
  //     bagType: 'SBT',
  //     bags: 50,
  //     title: '102',
  //   },
  //   {
  //     roNumber: '1103',
  //     commodity: 'Wheat',
  //     cropYear: '2018-19',
  //     bagType: 'SBT',
  //     bags: 60,
  //     title: '103',
  //   },
  // ];

  const TokenDataForQuality = [
    {
      id: '1',
      token: '1111',
      checked: true,
      icons: ['chevron-down'],
      dropDownValues: [
        {title: 'Moisture', editable: true},
        {title: 'Stack', editable: false},
        {title: 'Shed', editable: false},
      ],
      moisture: '7',
      stack: '1',
    },
    {
      id: '2',
      token: '1112',
      checked: true,
      icons: ['chevron-down'],
      dropDownValues: [
        {title: 'Moisture', editable: true},
        {title: 'Stack', editable: false},
        {title: 'Shed', editable: false},
      ],
      moisture: '8',
      stack: '2',
    },
    {
      id: '3',
      token: '1113',
      checked: true,
      icons: ['chevron-down'],
      dropDownValues: [
        {title: 'Stack', editable: false},
        {title: 'Shed', editable: false},
        {title: 'Moisture', editable: true},
      ],
      moisture: '10',
      stack: '3',
    },
    {
      id: '3',
      token: '1114',
      checked: true,
      icons: ['chevron-down'],
      dropDownValues: [
        {title: 'Stack', editable: false},
        {title: 'Shed', editable: false},
        {title: 'Moisture', editable: true},
      ],
      moisture: '10',
      stack: '3',
    },
    {
      id: '3',
      token: '1115',
      checked: true,
      icons: ['chevron-down'],
      dropDownValues: [
        {title: 'Stack', editable: false},
        {title: 'Shed', editable: false},
        {title: 'Moisture', editable: true},
      ],
      moisture: '10',
      stack: '3',
    },
    {
      id: '3',
      token: '1116',
      checked: true,
      icons: ['chevron-down'],
      dropDownValues: [
        {title: 'Stack', editable: false},
        {title: 'Shed', editable: false},
        {title: 'Moisture', editable: true},
      ],
      moisture: '10',
      stack: '3',
    },
  ];

  const filteredData = TokenDataForQuality.filter(
    item => item.token === selectedRo?.token,
  );

  const transformedData = filteredData.map(item => ({
    id: item.id,
    title: `Stack : ${item.stack}`,
    icons: ['chevron-down'],
    dropDownValues: [
      {title: 'Moisture', editable: true},
      {title: 'Stack', editable: false},
      {title: 'Shed', editable: false},
    ],
    checked: item.checked,
    moisture: item.moisture,
    stack: item.stack,
  }));
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
            ro.flags?.createTokenProcessed &&
            ro.flags?.gatePass &&
            !ro.flags?.moisture,
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
                ...{moisture: true},
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
        Options={options}
        label={'Token Number'}
        containerStyles={{zIndex: 10}}
        onSelect={handleRoSelect}
      />

      <GenericInputField
        key={selectedRo?.roNumber}
        label={'roNumber'}
        placeholder={'roNumber'}
        editable={false}
        value={selectedRo?.roNumber || ''}
      />
      <GenericInputField
        label={'commodity'}
        placeholder={'commodity'}
        editable={false}
        value={selectedRo?.commodity || ''}
        key={selectedRo?.commodity}
      />
      <GenericInputField
        label={'cropYear'}
        placeholder={'cropYear'}
        editable={false}
        value={selectedRo?.cropYear || ''}
        key={selectedRo?.cropYear}
      />
      <GenericInputField
        label={'bagType'}
        placeholder={'bagType'}
        editable={false}
        value={selectedRo?.bagType || ''}
        key={selectedRo?.bagType}
      />
      <GenericInputField
        label={'noOfBags'}
        placeholder={'noOfBags'}
        editable={false}
        value={selectedRo?.bags || ''}
        key={selectedRo?.bags}
      />
      {transformedData && transformedData.length > 0 && (
        <View
          style={{
            backgroundColor: Colors.white,
            flex: 1,
            paddingHorizontal: 10,
            borderRadius: 10,
          }}>
          <Text style={styles.titleStyles}>{t('Moisture Details')}</Text>
          <GenericList
            items={transformedData}
            inputValues={inputValues}
            setInputValues={setInputValues}
            outerContainerStyles={{backgroundColor: Colors.white}}
          />

          {/* <GenericList
              items={list}
              inputValues={listData}
              setInputValues={setListData}
              checkBoxRequired={true}
              onCheck={(id: string, isChecked: boolean) =>
                handleCheckboxChange(id, isChecked)
              }
            /> */}
        </View>
      )}

      <GenericButton
        title="Submit"
        buttonStyles={{width: '50%', marginTop: '10%'}}
        onPress={handleSubmit}
      />

      <GenericAlert
        visible={visible}
        title="Update Moisture succesfully"
        setVisible={() => setVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleStyles: {
    fontFamily: Fonts.notoSans,
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: Colors.mainColor,
    textAlign: 'center',
  },
});
