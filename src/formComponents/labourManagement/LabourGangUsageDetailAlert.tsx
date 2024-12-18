import React from 'react';
import {Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import GenericDropDown from '../../shared/component/GenericDropDown';
import GenericCalenderField from '../../shared/component/GenericCalenderField';
import GenericInputField from '../../shared/component/GenericInputField';
import GenericButton from '../../shared/component/GenericButton';
import {useTranslation} from 'react-i18next';
import {ActivityData, LabourData, ShedData} from '../../data';
import {Colors} from '../../assets/colors/colors';
import {Fonts} from '../../assets/colors/fonts';

type Props = {
  visible: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LabourGangUsageDetailAlert({visible, setValue}: Props) {
  function handleCloseModal() {
    setValue(false);
  }

  const {t} = useTranslation();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onDismiss={handleCloseModal}
      onRequestClose={handleCloseModal}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <View style={[styles.titleContainer, {backgroundColor: '#003831'}]}>
            <Text style={styles.titleStyles}>
              {t('Labour Gang Usage Details')}
            </Text>
          </View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <GenericDropDown Options={ActivityData} label={'Activity'} />
            <GenericCalenderField
              label={'Start Time'}
              placeholder={'Start Time'}
            />
            <GenericCalenderField label={'End Time'} placeholder={'End Time'} />
            <GenericInputField
              label={'No Of Bags'}
              placeholder={'No Of Bags'}
              keyboardType="numeric"
            />
            <GenericDropDown
              Options={LabourData}
              label={'Labour Gang'}
              containerStyles={{zIndex: 2}}
            />
            <GenericInputField label={'Lead'} placeholder={'Lead'} />
            <GenericDropDown
              Options={ShedData}
              label={'Stack Name'}
              containerStyles={{zIndex: 1}}
            />
            <View style={styles.buttonContainer}>
              <GenericButton
                title={'Cancel'}
                onPress={handleCloseModal}
                buttonStyles={{width: '100%', height: 50}}
                buttonColor="white"
                textColor="black"
              />
              <GenericButton
                title={'Submit'}
                onPress={handleCloseModal}
                containerStyles={{marginLeft: 30}}
                buttonStyles={{width: '100%', height: 50}}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: Colors.backgroundColor,
    maxHeight: '80%',
  },
  titleContainer: {
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleStyles: {
    fontFamily: Fonts.boldFamily,
    fontSize: 20,
    color: 'white',
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
