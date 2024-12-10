import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import {SetStateAction, useState} from 'react';
import GenericDropDown from '../../shared/component/GenericDropDown';
import GenericInputField from '../../shared/component/GenericInputField';
import GenericButton from '../../shared/component/GenericButton';
import GenericList from '../../shared/component/GenericList';
import ModalAlert from './LabourGangUsageDetailAlert';
import {useTranslation} from 'react-i18next';
import {GangListData, OperationData, ReferenceNumberData} from '../../data';
import LabourGangUsageDetailAlert from './LabourGangUsageDetailAlert';
import {Colors} from '../../assets/colors/colors';
import GenericAlert from '../../shared/component/GenericAlert';
import { Fonts } from '../../assets/colors/fonts';

interface DropDownValue {
  title: string;
  editable: boolean;
}

interface Wagon {
  id: string;
  title: string;
  icons: string[];
  dropDownValues: DropDownValue[];
}

export default function LabourGangUsageRail() {
  const [openModal, setOpenModal] = useState(false);
  const [visible, setVisible] = useState(false);

  const {t} = useTranslation();

  function handleOpenModal() {
    setOpenModal(true);
  }

  return (
    <View style={styles.container}>
      <GenericDropDown
        Options={ReferenceNumberData}
        label={'Reference Number'}
        containerStyles={{zIndex: 4}}
      />
      <GenericDropDown
        Options={OperationData}
        label={'Operation At'}
        containerStyles={{zIndex: 2}}
      />
      <GenericInputField label={'Date'} placeholder={'Date'} />
      <GenericInputField label={'Wagon'} placeholder={'Wagon'} />
      <View style={styles.titleContainer}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 50,
            marginLeft: 10,
          }}>
          <Text style={styles.titleStyles}>{t('Labour Usage')}</Text>
        </View>
        <GenericButton
          title={'Add'}
          buttonStyles={{position: 'absolute', right: 0}}
          onPress={handleOpenModal}
        />
      </View>
      <GenericList
        items={GangListData}
        inputValues={{}}
        setInputValues={function (
          value: SetStateAction<{[key: string]: {[values: string]: string}}>,
        ): void {
          throw new Error('Function not implemented.');
        }}
      />
      <GenericButton
        title="Submit"
        buttonStyles={{width: '50%'}}
        onPress={() => {
          setVisible(true);
        }}
      />
      <LabourGangUsageDetailAlert visible={openModal} setValue={setOpenModal} />
      <GenericAlert
        visible={visible}
        title="Labour Gang Usage Created succesfully"
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
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: Colors.mainColor,
  },
});
