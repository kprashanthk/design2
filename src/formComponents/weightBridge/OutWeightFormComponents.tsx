// import { StyleSheet, View } from 'react-native';
// import { Text } from 'react-native';
// import { useState } from 'react';

// import { useTranslation } from 'react-i18next';
// import { TokenData } from '../../data';
// import React from 'react';
// import GenericDropDown from '../../shared/component/GenericDropDown';
// import GenericInputField from '../../shared/component/GenericInputField';
// import GenericButton from '../../shared/component/GenericButton';
// import ModalAlert3 from './ModalAlert3';
// import { outWeightData } from '../../data';

// export default function OutWeightFormComponents() {
//   const [openModal, setOpenModal] = useState(false);
//   const [truckWeight, setTruckWeight] = useState('');
//   const [weight, setWeight] = useState('');
//   const [emptyBagsWeight, setEmptyBagsWeight] = useState('');
//   const { t } = useTranslation();

//   function handleOpenModal() {
//     setOpenModal(true);
//   }

//   const handleTruckWeight = (weight: string) => {
//     setTruckWeight(weight);
//     setOpenModal(false);
//   };

//   const handleSubmit = () => {
//     // Here you can gather and handle the form submission
//     const formData = {
//       tokenNumber: '', // You can retrieve this from the dropdown value
//       commodity: '', // You can retrieve this from the commodity input
//       cropYear: '', // You can retrieve this from the cropYear input
//       bagType: '', // You can retrieve this from the bagType input
//       noOfBags: '', // You can retrieve this from the noOfBags input
//       shed: '', // You can retrieve this from the shed input
//       stack: '', // You can retrieve this from the stack input
//       tareWeight: '', // You can retrieve this from tareWeight input
//       truckWeight: truckWeight, // Captured truck weight
//       grossWeight: truckWeight, // Assuming grossWeight equals truckWeight
//       emptyBagsWeight: emptyBagsWeight,
//       netWeight: weight,
//     };

//   };

//   return (
//     <View style={styles.container}>
//       <GenericDropDown
//         Options={TokenData}
//         label={'Token Number'}
//         containerStyles={{ zIndex: 10 }}
//       />
//       <GenericInputField label={'commodity'} placeholder={'commodity'} />
//       <GenericInputField label={'cropYear'} placeholder={'cropYear'} />
//       <GenericInputField label={'bagType'} placeholder={'bagType'} />
//       <GenericInputField label={'noOfBags'} placeholder={'noOfBags'} />
//       <GenericInputField label={'shed'} placeholder={'shed'} />
//       <GenericInputField label={'stack'} placeholder={'stack'} />
//       <GenericInputField label={'Wagon'} placeholder={'Wagon'} />

//       <GenericInputField
//         label={'tareWeight(in Qtls)'}
//         placeholder={'tareWeight(in Qtls)'}
//       />
//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <Text style={styles.inputFieldGrossWeight}>
//           {t('grossWeight(in Qtls)')}
//         </Text>
//         <GenericButton
//           title={'captureWeight'}
//           onPress={handleOpenModal}
//           buttonStyles={{ width: '80%' }}
//         />
//       </View>
//       <GenericInputField
//         label={'grossWeight(in Qtls)'}
//         placeholder={'grossWeight (in Qtls)'}
//         value={truckWeight}
//         editable={false}
//       />
//       <GenericInputField
//         label={'emptyBagsWeight(in Qtls)'}
//         placeholder={'emptyBagsWeight(in Qtls)'}
//         value={emptyBagsWeight}
//         onChangeText={setEmptyBagsWeight}
//       />
//       <GenericInputField
//         label={'netWeight(in Qtls)'}
//         placeholder={'netWeight(in Qtls)'}
//         value={weight}
//         onChangeText={setWeight}
//       />

//       <GenericButton
//         title="Submit"
//         buttonStyles={{ width: '50%' }}
//         onPress={handleSubmit}
//       />
//       <ModalAlert3
//         visible={openModal}
//         setValue={setOpenModal}
//         onSubmit={handleTruckWeight}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   inputFieldGrossWeight: {
//     fontSize: 15,
//   },
// });
import {Alert, StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import {useState, useEffect, useCallback} from 'react';

import {useTranslation} from 'react-i18next';
import React from 'react';
import GenericDropDown from '../../shared/component/GenericDropDown';
import GenericInputField from '../../shared/component/GenericInputField';
import GenericButton from '../../shared/component/GenericButton';
import ModalAlert3 from './ModalAlert3';
import GenericCheckBox from '../../shared/component/GenericCheckBox';
import GenericAlert from '../../shared/component/GenericAlert';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import {Option, RODataType} from '../models';
import GenericSnackBar from '../../shared/component/GenericSnackBar';
import {Fonts} from '../../assets/colors/fonts';

export default function OutWeightFormComponents() {
  const [openModal, setOpenModal] = useState(false);
  const [weight, setWeight] = useState('');
  const [emptyBagsWeight, setEmptyBagsWeight] = useState('');
  const [grossWeight, setGrossWeight] = useState('');
  const [generateTruckChit, setGenerateTruchChit] = useState(Boolean);
  const [visible, setVisible] = useState(false);
  const {setStoredValue, storedValue, storeAndValidateData} = useAsyncStorage();
  const [selectedRo, setSelectedRo] = useState<RODataType | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [hasMoistureFlag, setHasMoistureFlag] = useState(false);
  const [snackBar, setSnackBar] = useState(false);

  const {t} = useTranslation();

  const handleCheckBox = (value: boolean) => {
    setGenerateTruchChit(value);
  };
  function handleOpenModal() {
    setOpenModal(true);
  }
  const handleTruckWeight = (weight: string) => {
    setGrossWeight(weight);
    setOpenModal(false);
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
        .filter((ro: RODataType) => ro.flags?.loading && !ro.flags?.outWeight)
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
    setHasMoistureFlag(selectedRoData.flags?.moistureFlag || false);
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
                ...{outWeight: true},
                ...{truckChit: generateTruckChit},
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
        key={selectedRo?.commodity}
        label={'commodity'}
        placeholder={'commodity'}
        value={selectedRo?.commodity || ''}
        editable={false}
      />

      <GenericInputField
        key={selectedRo?.cropYear}
        label={'cropYear'}
        placeholder={'cropYear'}
        value={selectedRo?.cropYear || ''}
        editable={false}
      />
      <GenericInputField
        key={selectedRo?.bagType}
        label={'bagType'}
        placeholder={'bagType'}
        editable={false}
        value={selectedRo?.bagType || ''}
      />
      <GenericInputField
        key={selectedRo?.bags}
        label={'noOfBags'}
        placeholder={'noOfBags'}
        value={selectedRo?.bags || ''}
        editable={false}
      />
      <GenericInputField
        key={selectedRo?.shed}
        label={'shed'}
        placeholder={'shed'}
        editable={false}
        value={selectedRo?.shed || ''}
      />
      <GenericInputField
        label={'stack'}
        placeholder={'stack'}
        editable={false}
        key={selectedRo?.stack}
        value={selectedRo?.stack || ''}
      />

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.inputFieldGrossWeight}>
          {t('grossWeight(in Qtls)')}
        </Text>
        <GenericButton
          title={'captureWeight'}
          onPress={handleOpenModal}
          buttonStyles={{width: '80%'}}
        />
      </View>

      <GenericInputField
        label={'grossWeight(in Qtls)'}
        placeholder={'grossWeight (in Qtls)'}
        value={grossWeight}
        editable={false}
      />
      <GenericInputField
        label={'tareWeight(in Qtls)'}
        placeholder={'tareWeight(in Qtls)'}
        // value={tareWeight}
        editable={false}
      />
      <GenericInputField
        label={'emptyBagsWeight(in Qtls)'}
        placeholder={'emptyBagsWeight(in Qtls)'}
        value={emptyBagsWeight}
        onChangeText={setEmptyBagsWeight}
      />
      <GenericInputField
        label={'netWeight(in Qtls)'}
        placeholder={'netWeight(in Qtls)'}
        value={weight}
        onChangeText={setWeight}
      />
      {hasMoistureFlag && (
        <GenericCheckBox
          title="Generate Truck Chit"
          onCheck={handleCheckBox}
          checked={generateTruckChit}
        />
      )}

      <GenericButton
        title="Submit"
        buttonStyles={{width: '50%'}}
        onPress={handleSubmit}
      />
      <ModalAlert3
        visible={openModal}
        setValue={setOpenModal}
        onSubmit={handleTruckWeight}
      />

      <GenericAlert
        visible={visible}
        title="Success"
        setVisible={() => setVisible(false)}
        setSnackBar={setSnackBar}
      />
      {hasMoistureFlag && !generateTruckChit && (
        <GenericSnackBar
          visible={snackBar}
          setVisible={setSnackBar}
          title="Generate Truck Chit"
          navigationText="GenerateTruckChit"
        />
      )}
      {!hasMoistureFlag && (
        <GenericSnackBar
          visible={snackBar}
          setVisible={setSnackBar}
          title="Update Moisture"
          navigationText="Update Moisture For Issue"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputFieldGrossWeight: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Fonts.notoSans,
  },
});
