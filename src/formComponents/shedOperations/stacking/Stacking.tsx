import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import {SetStateAction, useEffect, useState} from 'react';
import GenericDropDown from '../../../shared/component/GenericDropDown';
import GenericInputField from '../../../shared/component/GenericInputField';
import GenericCheckBox from '../../../shared/component/GenericCheckBox';
import GenericButton from '../../../shared/component/GenericButton';
import GenericList from '../../../shared/component/GenericList';
import GenericSearch from '../../../shared/component/GenericSearch';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AddStack from './AddStack';
import CreateTemporaryStorage from './CreateTemporaryStorage';
import {useTranslation} from 'react-i18next';
import {
  ListData,
  OperationData,
  TemporaryStorageData,
  TokenData,
} from '../../../data';
import {Colors} from '../../../assets/colors/colors';
import GenericAlert from '../../../shared/component/GenericAlert';
import {Fonts} from '../../../assets/colors/fonts';

interface DropDownValue {
  title: string;
  editable: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

interface Wagon {
  id: string;
  title: string;
  icons: string[];
  dropDownValues: DropDownValue[];
  checked: boolean;
}

export default function Stacking() {
  const [openModal, setOpenModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dropDown1Value, setDropDown1Value] = useState<string>('');
  const [dropDown2Value, setDropDown2Value] = useState<string>('');
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

  const [values, setValues] = useState<{[key: string]: string}>({});

  useEffect(() => {
    const val = {
      noOfBags: '5',
      Commodity: 'Rice',
      bagType: 'Gunny',
      specification: 'Rice',
      category: 'Grade 1',
      variety: 'rice',
    };
    if (dropDown1Value !== '') {
      setValues(prev => ({...prev, ...val}));
    }
  }, [dropDown1Value, dropDown2Value]);

  function handleOpenModal() {
    setOpenModal(true);
  }

  const [searchValue, setSearchValue] = useState<any[]>(ListData);
  const [openSecondaryStorage, setOpenSecondaryStorage] =
    useState<boolean>(false);
  const {t} = useTranslation();

  function handleOpenSecondaryStorage(checked: boolean) {
    setOpenSecondaryStorage(checked);
  }

  const [openModal2, setOpenModal2] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <GenericDropDown
        Options={TokenData}
        label={'Token Number'}
        containerStyles={{zIndex: 4}}
        setValue={setDropDown1Value}
      />
      <GenericDropDown
        Options={OperationData}
        label={'Transaction Type'}
        containerStyles={{zIndex: 2}}
        setValue={setDropDown1Value}
      />
      <GenericInputField
        label={'No of Bags'}
        placeholder={'No of Bags'}
        value={values['noOfBags']}
        keyboardType="numeric"
      />
      <GenericInputField
        label={'Commodity'}
        placeholder={'Commodity'}
        value={values['Commodity']}
      />
      <GenericInputField
        label={'Bag Type'}
        placeholder={'Bag Type'}
        value={values['bagType']}
      />
      <GenericInputField
        label={'Specification'}
        placeholder={'Specification'}
        value={values['specification']}
      />
      <GenericInputField
        label={'Category'}
        placeholder={'Category'}
        value={values['category']}
      />
      <GenericInputField
        label={'Variety'}
        placeholder={'Variety'}
        value={values['variety']}
      />
      <View style={styles.titleContainer}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 50,
            marginLeft: 10,
            marginTop: 15,
          }}>
          <Text style={styles.titleStyles}>{t('Stack Plan')}</Text>
        </View>
        <GenericButton
          title={'Add'}
          containerStyles={{marginVertical: 30}}
          buttonStyles={{position: 'absolute', right: 0, width: '80%'}}
          onPress={handleOpenModal}
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 15,
          borderRadius: 10,
          marginTop: 10,
        }}>
        <View style={styles.searchContainer}>
          <GenericSearch
            placeholder={'Search'}
            searchedValue={searchValue}
            setSearchedValue={setSearchValue}
            items={ListData}
            containerStyles={{marginRight: 15, width: '40%', height: 50}}
            buttonContainerStyles={{
              width: '100%',
              height: 50,
            }}
          />
          <GenericDropDown
            Options={[
              {title: 'wagon 01', value: '1'},
              {title: 'wagon 02', value: '2'},
              {title: 'wagon 03', value: '3'},
            ]}
            label={'All shed'}
            setSearch={setSearchValue}
            editable={true}
            containerStyles={{
              width: '40%',
              height: 50,
            }}
            buttonContainerStyles={{
              width: '100%',
              height: 50,
            }}
          />
        </View>
        <GenericList
          items={searchValue}
          checkBoxRequired={true}
          inputValues={{}}
          setInputValues={function (
            value: SetStateAction<{[key: string]: {[values: string]: string}}>,
          ): void {
            throw new Error('Function not implemented.');
          }}
        />
      </View>

      <GenericCheckBox
        checked={openSecondaryStorage}
        onCheck={checked => handleOpenSecondaryStorage(checked)}
        title="Create Temporary Storage"
        containerStyles={{marginTop: 15}}
      />
      {openSecondaryStorage && (
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
            marginTop: 10,
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[styles.titleStyles, {marginBottom: 15}]}>
              {t('Temporary Storage')}
            </Text>
          </View>
          <GenericList
            items={TemporaryStorageData}
            inputValues={listData}
            setInputValues={setListData}
          />
          <View style={{marginLeft: 5}}>
            <Icon
              name="plus-circle"
              size={29}
              color={Colors.mainColor}
              onPress={() => setOpenModal2(true)}
            />
          </View>
        </View>
      )}
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <GenericButton
          title="Cancel"
          buttonStyles={{width: '100%'}}
          onPress={() => {}}
          buttonColor="white"
          textColor="#003831"
        />
        <GenericButton
          title="Submit"
          containerStyles={{marginLeft: 30}}
          buttonStyles={{width: '100%'}}
          onPress={() => {
            setVisible(true);
          }}
        />
      </View>

      <AddStack visible={openModal} setValue={setOpenModal} />
      <CreateTemporaryStorage visible={openModal2} setValue={setOpenModal2} />
      <GenericAlert
        visible={visible}
        title="Stacking Created succesfully"
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
  },
  titleStyles: {
    fontFamily: Fonts.boldFamily,
    fontSize: 22,
    color: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 25,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
