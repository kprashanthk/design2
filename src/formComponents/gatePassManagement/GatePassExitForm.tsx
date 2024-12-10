import {Alert, StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {TokenData} from '../../data';
import GenericDropDown from '../../shared/component/GenericDropDown';
import GenericButton from '../../shared/component/GenericButton';
import GenericAlert from '../../shared/component/GenericAlert';
import GenericInputField from '../../shared/component/GenericInputField';
import GenericCheckBox from '../../shared/component/GenericCheckBox';
import GatePassModal from './GatePassModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import {RODataType} from '../models';
import {useFocusEffect} from '@react-navigation/native';
import {Fonts} from '../../assets/colors/fonts';

export default function GatePassExitFormComponents() {
  //const [openModal, setOpenModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [checkData, setCheckData] = useState(false);
  const [visibleViewDetails, setvisibleViewDetails] = useState(false);
  const {setStoredValue, storedValue, storeAndValidateData} = useAsyncStorage();
  const [options, setOptions] = useState([]);
  const [selectedRo, setSelectedRo] = useState<RODataType | null>(null);

  const {t} = useTranslation();
  const [tokenData, setTokenData] = useState<
    | {
        id: string;
        tokenNumber: string;
        noOfBags: string | undefined;
        cropYear: string | undefined;
        bagType: string | undefined;
        shed: string | undefined;
        stack: string | undefined;
      }
    | undefined
  >(undefined);

  const ReasonData = [
    {title: 'Stock Unavailability', value: 'Stock Unavailability'},
    {title: 'Truck Unfit', value: 'Truck Unfit'},
    {title: 'Test Weighment', value: 'Test Weighment'},
    {title: 'Others', value: 'Others'},
  ];
  const handleCheckBox = () => {
    setCheckData(!checkData);
  };

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
            ro.flags?.moisture &&
            ro.flags?.truckChit &&
            !ro.flags?.gatePassExit,
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

  useEffect(() => {
    if (selectedRo != null) {
      setTokenData({
        id: '1',
        tokenNumber: selectedRo?.token,
        noOfBags: selectedRo?.bags,
        cropYear: selectedRo?.cropYear,
        bagType: selectedRo?.bagType,
        shed: selectedRo?.shed,
        stack: selectedRo?.stack,
      });
    }
  }, [selectedRo]);

  // const getTokenData = () => {
  //   if (selectedRo != null) {
  //     setTokenData({
  //       id: '1',
  //       tokenNumber: selectedRo?.token,
  //       noOfBags: selectedRo?.bags,
  //       cropYear: selectedRo?.cropYear,
  //       bagType: selectedRo?.bagType,
  //       shed: selectedRo?.shed,
  //       stack: selectedRo?.stack,
  //     });
  //   }
  // };

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
                ...{gatePassExit: true},
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
      {selectedRo && (
        <GenericButton
          title={'View Details'}
          onPress={() => setvisibleViewDetails(true)}
          buttonStyles={{width: '40%', marginLeft: 170}}
        />
      )}
      <GatePassModal
        visible={visibleViewDetails}
        setValue={() => setvisibleViewDetails(false)}
        viewData={tokenData}
      />
      <GenericCheckBox
        checked={checkData}
        onCheck={handleCheckBox}
        title="truckReturningAndLeavingEmpty"
        containerStyles={{marginTop: 15, marginLeft: 5}}
      />
      {checkData && (
        <View>
          <GenericDropDown
            Options={ReasonData}
            label={'reason'}
            containerStyles={{zIndex: 5}}
          />
          <GenericInputField
            label={'comments'}
            placeholder={'comments 255 characters (max) '}
            multiline={true}
          />
        </View>
      )}

      <GenericButton
        title="Submit"
        buttonStyles={{width: '50%'}}
        onPress={() => setVisible(true)}
      />
      {/* <GenericList1 items={filteredData} 
        inputValues={list} 
        setInputValues={setList}        /> */}

      <GenericAlert
        visible={visible}
        title="Gatepass Exit succesfully"
        setVisible={() => setVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  titleStyles: {
    fontFamily: Fonts.notoSans,
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#003831',
  },
});
