import React, {useCallback, useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import GenericDropDown from '../../shared/component/GenericDropDown';
import GenericInputField from '../../shared/component/GenericInputField';
import GenericSearch from '../../shared/component/GenericSearch';
import GenericButton from '../../shared/component/GenericButton';
import GenericList from '../../shared/component/GenericList';
import {Colors} from '../../assets/colors/colors';
import GenericAlert from '../../shared/component/GenericAlert';
import {useROData} from '../../hooks/RODataContext';
import {useTranslation} from 'react-i18next';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import {Option, RODataType} from '../models';
import GenericDropDown1 from '../../shared/component/GenericDropDown1';
import {PriorityList} from '../../data';
import GenericSnackBar from '../../shared/component/GenericSnackBar';
import { Fonts } from '../../assets/colors/fonts';

export default function Loading() {
  const {t} = useTranslation();

  const {ROData, setROData} = useROData();

  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const {storedValue, storeAndValidateData, setStoredValue} = useAsyncStorage();
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedRo, setSelectedRo] = useState<RODataType | null>(null);
  const [loadingPlan, setLoadingPlan] = useState('');
  const [assignedBags, setAssignedBags] = useState('');
  const [filterDropDownvalues, setFilterDropDownvalues] = useState([]);
  const [constListData, setConstListData] = useState([]);

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

    console.log(filterList);

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
        .filter((ro: RODataType) => ro.flags?.inWeight && !ro.flags?.loading)
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
    console.log('Selected RO', selectedRo);
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
                ...{loading: true},
                ...{assignedBags: assignedBags},
              },
            }
          : ro;
      });
      await storeAndValidateData('roList', updatedRoList);
      setLoadingPlan('');
      setAssignedBags('');
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
        onSelect={handleRoSelect}
      />

      <GenericInputField
        key={selectedRo?.roNumber}
        label={'RO Number'}
        placeholder={'RO Number'}
        value={selectedRo?.roNumber || ''}
        editable={false}
      />
      <GenericInputField
        label={'Truck Number'}
        placeholder={'Truck Number'}
        value={selectedRo?.truckNumber || ''}
        editable={false}
      />
      <GenericInputField
        label={'Commodity'}
        placeholder={'Commodity'}
        value={selectedRo?.commodity}
        editable={false}
      />

      <GenericInputField
        label={'Pending Quantity (MT.)'}
        placeholder={'Pending Quantity (MT.)'}
        value={selectedRo?.pendingQuantity || ''}
        editable={false}
      />
      <GenericInputField
        label={'Max Bags For This Truck'}
        placeholder={'Max Bags'}
        value={selectedRo?.maxBagsForTruck?.toString() || ''}
        editable={false}
      />
      <GenericInputField
        label={'No of Bags'}
        placeholder={'No of Bags'}
        value={assignedBags}
        onChangeText={setAssignedBags}
        keyboardType="numeric"
      />
      <GenericInputField
        label={'Loading Plan'}
        placeholder={'Loading Plan'}
        value={loadingPlan}
        onChangeText={setLoadingPlan}
      />
      {selectedRo && (
        <View
          style={{
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 10,
            borderRadius: 5,
          }}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyles}>{t('Priority List')}</Text>
          </View>
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
          <View style={styles.priorityListContainer}>
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
        </View>
      )}
      <GenericButton
        title="Submit"
        buttonStyles={{width: '50%'}}
        containerStyles={{marginTop: 10}}
        onPress={handleSubmit}
      />
      <GenericAlert
        visible={visible}
        title="Loading Created succesfully"
        setVisible={() => setVisible(false)}
        setSnackBar={setSnackBar}
      />
      <GenericSnackBar
        visible={snackBar}
        setVisible={setSnackBar}
        title="Capture Out Weight"
        navigationText="OutWeight"
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
    fontFamily: Fonts.notoSans,
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    flexWrap: 'wrap',
    textAlign: 'center',
    color: Colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityListContainer: {},
  filterContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
  },
});
