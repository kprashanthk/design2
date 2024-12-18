import {StyleSheet, View} from 'react-native';
import GenericDropDown from '../../shared/component/GenericDropDown';
import GenericCalenderField from '../../shared/component/GenericCalenderField';
import {Text} from 'react-native';
import GenericButton from '../../shared/component/GenericButton';
import GenericList from '../../shared/component/GenericList';
import {SetStateAction, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {GangListData, TokenData} from '../../data';
import LabourGangUsageDetailAlert from './LabourGangUsageDetailAlert';
import GenericAlert from '../../shared/component/GenericAlert';
import {Fonts} from '../../assets/colors/fonts';

export default function LabourGangUsage() {
  const [visible, setVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const {t} = useTranslation();

  function handleOpenModal() {
    setOpenModal(true);
  }

  return (
    <View style={styles.container}>
      <GenericDropDown Options={TokenData} label={'Token Number'} />
      <GenericCalenderField label={'Date'} placeholder={'Date'} />
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
      <GenericAlert
        visible={visible}
        title="Labour Gang Usage Created succesfully"
        setVisible={() => setVisible(false)}
      />
      <LabourGangUsageDetailAlert visible={openModal} setValue={setOpenModal} />
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
    fontFamily: Fonts.boldFamily,
    fontSize: 22,
    color: 'black',
  },
});
