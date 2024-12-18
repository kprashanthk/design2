import React, {useCallback, useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';

import InWeightAlert from './InWeightAlert';

import GenericButton from '../../shared/component/GenericButton';
import GenericSearch from '../../shared/component/GenericSearch';
import GenericList from '../../shared/component/GenericList';
import {Colors} from '../../assets/colors/colors';
import GenericInputField from '../../shared/component/GenericInputField';
import GenericDropDown from '../../shared/component/GenericDropDown';
import GenericAlert from '../../shared/component/GenericAlert';
import {useTranslation} from 'react-i18next';
import {useFocusEffect} from '@react-navigation/native';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import {Option, RODataType} from '../models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GenericDropDown1 from '../../shared/component/GenericDropDown1';
import {PriorityList} from '../../data';
import GenericSnackBar from '../../shared/component/GenericSnackBar';
import {Fonts} from '../../assets/colors/fonts';

export default function CaptureInWeight() {
  const {storedValue, setStoredValue, storeAndValidateData} = useAsyncStorage();
  const [selectedRo, setSelectedRo] = useState<RODataType | null>(null);
  const [snackBar, setSnackBar] = useState(false);

  const [options, setOptions] = useState<Option[]>([]);

  const {t} = useTranslation();

  const [openInWeightAlert, setOpenInWeightAlert] = useState<boolean>(false);

  const [inWeight, setInWeight] = useState<string>('');

  const [constListData, setConstListData] = useState([]);
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);

  const [filterDropDownvalues, setFilterDropDownvalues] = useState([]);

  const [cropYearDropDownValues, setCropYearDropDownValues] = useState([]);

  const [filterValues, setFilterValues] = useState({
    cropYear: '',
    shed: '',
  });
  const [listData, setListData] = useState({
    '1': {
      Priority: '15',
      Shed: '1',
      CropYear: '2015-2016',
      BagType: 'SBT',
      Category: 'A',
      Specification: 'FAQ',
      Available_Quantity: '79,995',
      Available_Bags: '160',
    },
    '2': {
      Priority: '5',
      Shed: '2',
      CropYear: '2014-15',
      BagType: 'SBT',
      Category: 'C',
      Specification: 'FAQ',
      Available_Quantity: '654.87952',
      Available_Bags: '1315',
    },
    '3': {
      Priority: '10',
      Shed: '3',
      CropYear: '2014-15',
      BagType: 'HDPE',
      Category: 'B',
      Specification: 'FAQ',
      Available_Quantity: '1092.5256',
      Available_Bags: '2185',
    },
  });

  useEffect(() => {
    const filteredIds = Object.keys(listData).filter(
      id => listData[id].CropYear === filterValues.cropYear,
    );

    const filterList = list.filter(
      item => filteredIds.includes(item.id) || filterValues.cropYear === 'All',
    );

    setList(filterList);

    if (filterValues.cropYear === 'All' && filterValues.shed === 'All') {
      setList(constListData);
    }
  }, [filterValues.cropYear]);

  useEffect(() => {
    if (constListData && Array.isArray(constListData)) {
      const filterData = list.map(item => ({
        title: item?.title || 'Unknown',
        value: item?.title || 'Unknown',
      }));

      if (filterData.length > 0) {
        filterData.unshift({title: 'All', value: 'All'});
        setFilterDropDownvalues(filterData);
      }
    }
    const values = [
      {title: 'All', value: 'All'},
      {title: '2014-15', value: '2014-15'},
      {title: '2015-2016', value: '2015-2016'},
    ];
    setCropYearDropDownValues(values);
  }, [selectedRo, list]);

  useEffect(() => {
    const filterData = list.filter(
      item => item.title === filterValues.shed || filterValues.shed === 'All',
    );
    setList(filterData);

    if (filterValues.shed === 'All' && filterValues.cropYear === 'All') {
      setList(constListData);
    }
  }, [filterValues.shed]);

  function handleFilter(value: any, fieldName: string) {
    setFilterValues(preValues => ({...preValues, [fieldName]: value}));
  }

  useEffect(() => {
    const filterData = PriorityList;
    if (filterData) {
      const newValues = filterData.flatMap((item: any) => item);

      setList(newValues);
      setConstListData(newValues);
    }
  }, [selectedRo]);

  function handleOpenInWeightALert() {
    setOpenInWeightAlert(true);
  }

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
        .filter((ro: RODataType) => ro.flags?.gatePass && !ro.flags?.inWeight)
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
    setSelectedRo(selectedRoData || null);
  };

  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    setList(prevList =>
      prevList.map(item =>
        item.id === id ? {...item, checked: isChecked} : item,
      ),
    );
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
                ...{inWeight: true},
              },
            }
          : ro;
      });
      await storeAndValidateData('roList', updatedRoList);
      setInWeight('');
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
        key={selectedRo?.token}
        Options={options}
        label={'Token Number'}
        onSelect={handleRoSelect}
      />
      <GenericInputField
        key={selectedRo?.transactionType}
        label={'Transaction Type'}
        placeholder={'Transaction Type'}
        value={selectedRo?.transactionType}
        editable={false}
      />
      <GenericInputField
        key={selectedRo?.roNumber}
        label={'RO Number'}
        placeholder={'RO Number'}
        value={selectedRo?.roNumber}
        editable={false}
      />
      <GenericInputField
        key={selectedRo?.pendingQuantity}
        label={'Pending Quantity (MT.)'}
        placeholder={'Pending Quantity'}
        value={selectedRo?.pendingQuantity}
        editable={false}
      />
      <GenericInputField
        key={selectedRo?.commodity}
        label={'Commodity'}
        placeholder={'Commodity'}
        value={selectedRo?.commodity}
        editable={false}
      />
      <GenericInputField
        key={selectedRo?.variety}
        label={'Variety'}
        placeholder={'Variety'}
        value={selectedRo?.variety}
        editable={false}
      />
      <View>
        {selectedRo && list.length > 0 && (
          <View
            style={{
              backgroundColor: '#FFFFFF',
              paddingHorizontal: 10,
              borderRadius: 5,
            }}>
            {/* <View style={styles.headingContainer}> */}
            <View style={styles.titleContainer}>
              <Text style={styles.titleStyles}>{t('Priority List')}</Text>
            </View>
            {/* </View> */}
            <View style={styles.filterContainer}>
              <GenericDropDown1
                options={cropYearDropDownValues}
                label={'Crop Year'}
                selected={filterValues.cropYear}
                setSelected={value => handleFilter(value, 'cropYear')}
                containerStyles={{marginRight: 15}}
              />
              <GenericDropDown1
                options={filterDropDownvalues}
                label={'Shed'}
                selected={filterValues.shed}
                setSelected={value => handleFilter(value, 'shed')}
              />
            </View>
            <GenericList
              items={list}
              inputValues={listData}
              setInputValues={setListData}
              checkBoxRequired={true}
              onCheck={(id: string, isChecked: boolean) =>
                handleCheckboxChange(id, isChecked)
              }
            />
          </View>
        )}
        <View style={styles.otpContainer}>
          <GenericInputField
            label={'In Weight'}
            placeholder={'In Weight'}
            containerStyles={{flex: 6, marginRight: 10}}
            buttonContainerStyles={{height: 50}}
            value={inWeight}
            onChangeText={setInWeight}
            editable={false}
          />
          <GenericButton
            title={'Capture'}
            onPress={handleOpenInWeightALert}
            containerStyles={styles.otpButtonContainer}
            buttonStyles={{height: 50}}
          />
        </View>
      </View>
      <GenericButton
        title="Submit"
        buttonStyles={{width: '50%'}}
        containerStyles={{marginTop: 10}}
        onPress={handleSubmit}
      />

      <InWeightAlert
        visible={openInWeightAlert}
        setVisible={setOpenInWeightAlert}
        inWeight={inWeight}
        setInWeight={setInWeight}
      />
      <GenericAlert
        visible={visible}
        title="Success"
        setVisible={() => setVisible(false)}
        setSnackBar={setSnackBar}
      />
      <GenericSnackBar
        visible={snackBar}
        setVisible={setSnackBar}
        title="Loading"
        navigationText="Loading"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  titleButtonContainer: {
    flex: 0.4,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  titleStyles: {
    fontFamily: Fonts.boldFamily,
    fontSize: 18,
    flexWrap: 'wrap',
    textAlign: 'center',
    color: Colors.mainColor,
  },
  priorityListContainer: {},
  filterContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  otpContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  otpButtonContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
