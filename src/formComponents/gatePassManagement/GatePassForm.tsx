// import {StyleSheet, Text, View} from 'react-native';
// import {useState, useCallback, useEffect} from 'react';
// import {useFocusEffect} from '@react-navigation/native';
// import GenericDropDown from '../../shared/component/GenericDropDown';
// import GenericInputField from '../../shared/component/GenericInputField';
// import {RoData} from '../../data'; // Assuming RoData is imported from this path
// import GenericButton from '../../shared/component/GenericButton';
// import GenericAlert from '../../shared/component/GenericAlert';
// import GenericList from '../../shared/component/GenericList';
// import {Colors} from '../../assets/colors/colors';
// import {useTranslation} from 'react-i18next';
// import useAsyncStorage from '../../hooks/useAsyncStorage';

// export default function GatePassForm() {
//   const [visible, setVisible] = useState(false);
//   const {t} = useTranslation();
//   const {getData} = useAsyncStorage();
//   const [selectedData, setSelectedData] = useState({
//     transactionType: '',
//     roNumber: '',
//     pendingQuantity: '',
//   });

//   // const [listData, setListData] = useState({});

//   // const [list, setList] = useState([]);

//   useEffect(() => {
//     getData('roList');
//   }, []);

//   const handleTokenSelect = (token: string) => {
//     const selectedRo = RoData.find(ro => ro.token === token);

//     if (selectedRo) {
//       setSelectedData({
//         transactionType: `Isssue`,
//         roNumber: selectedRo.roNumber,
//         pendingQuantity: selectedRo.pendingQuantity,
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <GenericDropDown
//         label="Token Number"
//         Options={[]}
//         onSelect={value => handleTokenSelect(value)}
//       />
//       <GenericInputField
//         label="Transaction Type"
//         value={selectedData.transactionType}
//         placeholder="Transaction Type"
//         editable={false}
//       />
//       <GenericInputField
//         label="RO Number"
//         value={selectedData.roNumber}
//         placeholder="RO Number"
//         editable={false}
//       />
//       <GenericInputField
//         label="Pending Quantity (in Qtl)"
//         value={selectedData.pendingQuantity}
//         placeholder="Pending Quantity (in Qtl)"
//         editable={false}
//       />
//       {/* {list.length > 0 && (
//         <View
//           style={{
//             backgroundColor: '#FFFFFF',
//             paddingHorizontal: 10,
//             borderRadius: 5,
//           }}>
//           <View style={styles.headingContainer}>
//             <View style={styles.titleContainer}>
//               <Text style={styles.titleStyles}>{t('Priority List')}</Text>
//             </View>
//           </View>
//           <View>
//             <GenericList
//               items={list}
//               inputValues={listData}
//               setInputValues={setListData}
//             />
//           </View>
//         </View>
//       )} */}

//       <View style={{flexDirection: 'row', marginTop: 20}}>
//         <GenericButton
//           title="Cancel"
//           buttonStyles={{width: '100%'}}
//           onPress={() => {}}
//           textColor="#000000"
//         />
//         <GenericButton
//           title="create"
//           containerStyles={{marginLeft: 30}}
//           buttonStyles={{width: '100%'}}
//           onPress={() => setVisible(true)}
//         />
//       </View>
//       <GenericAlert
//         visible={visible}
//         title="Gatepass Created succesfully"
//         setVisible={() => setVisible(false)}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   headingContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   titleContainer: {
//     flex: 0.6,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//   },
//   titleStyles: {
//     fontFamily: Fonts.notoSans,
//     fontSize: 20,
//     fontStyle: 'normal',
//     fontWeight: 'bold',
//     flexWrap: 'wrap',
//     textAlign: 'center',
//     color: Colors.text,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import GenericDropDown from '../../shared/component/GenericDropDown';
import GenericInputField from '../../shared/component/GenericInputField';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GenericButton from '../../shared/component/GenericButton';
import GenericAlert from '../../shared/component/GenericAlert';
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
  const [updatedOptions, setUpdatedOptions] = useState([]);

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
      {/* <GenericAlert
        visible={visible}
        title="Gatepass Created succesfully"
        setVisible={() => setVisible(false)}
      /> */}
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
    // </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
