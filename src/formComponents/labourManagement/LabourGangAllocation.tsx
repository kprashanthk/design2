import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import {SetStateAction, useState} from 'react';
import GenericDropDown from '../../shared/component/GenericDropDown';
import GenericButton from '../../shared/component/GenericButton';
import GenericList from '../../shared/component/GenericList';
import {useTranslation} from 'react-i18next';
import {GangListData, ReferenceNumberData} from '../../data';
import LabourGangAllocationAlert from './LabourGangAllocationAlert';
import {Colors} from '../../assets/colors/colors';
import GenericAlert from '../../shared/component/GenericAlert';
import {Fonts} from '../../assets/colors/fonts';

export default function LabourGangAllocation() {
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
      />
      <View style={[styles.titleContainer]}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleStyles}>{t('Labour Usage Allocation')}</Text>
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
      <LabourGangAllocationAlert visible={openModal} setValue={setOpenModal} />
      <GenericAlert
        visible={visible}
        title="Labour Gang Allocation Created succesfully"
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 16,
  },
  titleWrapper: {
    flex: 1,
    marginRight: 10,
  },
  titleStyles: {
    fontFamily: Fonts.boldFamily,
    fontSize: 20,
    fontStyle: 'normal',
    color: Colors.mainColor,
    textAlign: 'center',
  },
});
