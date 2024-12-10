import {StyleSheet, View} from 'react-native';
import {useState} from 'react';
import GenericDropDown from '../../shared/component/GenericDropDown';
import GenericCalenderField from '../../shared/component/GenericCalenderField';
import GenericInputField from '../../shared/component/GenericInputField';
import GenericCheckBox from '../../shared/component/GenericCheckBox';
import GenericButton from '../../shared/component/GenericButton';
import ModalAlert from './LabourGangUsageDetailAlert';
import {useTranslation} from 'react-i18next';
import {ActivityData, LabourData} from '../../data';
import LabourGangUsageDetailAlert from './LabourGangUsageDetailAlert';
import GenericAlert from '../../shared/component/GenericAlert';
import { Fonts } from '../../assets/colors/fonts';

export default function GangUsageForMiscellaneous() {
  const [openModal, setOpenModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  const {t} = useTranslation();
  const handleCheck = () => {
    setChecked(!checked);
  };

  return (
    <View style={styles.container}>
      <GenericDropDown
        Options={ActivityData}
        label={'Activity'}
        containerStyles={{zIndex: 4}}
      />
      <GenericDropDown
        Options={LabourData}
        label={'Labour Gang'}
        containerStyles={{zIndex: 2}}
      />
      <GenericCalenderField label={'Date'} placeholder={'Date'} />
      <GenericInputField
        label={'No of Bags'}
        placeholder={'No of Bags'}
        keyboardType="numeric"
      />
      <GenericCalenderField label={'Start Date'} placeholder={'Start Date'} />
      <GenericCalenderField label={'End Date'} placeholder={'End Date'} />
      <GenericInputField
        label={'Remarks'}
        placeholder={'Remarks'}
        multiline={true}
        lines={4}
      />
      <GenericCheckBox
        checked={checked}
        onCheck={handleCheck}
        title="Labour Assignment"
      />
      <GenericButton
        title="Submit"
        containerStyles={{marginTop: 20}}
        buttonStyles={{width: '50%'}}
        onPress={() => {
          setVisible(true);
        }}
      />
      <LabourGangUsageDetailAlert visible={openModal} setValue={setOpenModal} />
      <GenericAlert
        visible={visible}
        title="Gang Usage Created succesfully"
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
    fontFamily:Fonts.notoSans,
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#617c8d',
  },
});
