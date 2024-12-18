import React, {useState} from 'react';
import {Modal, ScrollView, StyleSheet, Text, View} from 'react-native';

import {useTranslation} from 'react-i18next';
import GenericButton from '../../shared/component/GenericButton';
import GenericInputField from '../../shared/component/GenericInputField';
import {Fonts} from '../../assets/colors/fonts';

type Props = {
  visible: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (weight: string) => void;
};

export default function OutWeightAlert({visible, setValue, onSubmit}: Props) {
  function handleCloseModal() {
    setValue(false);
  }

  const {t} = useTranslation();
  const [truckWeight, setTruckWeight] = useState('');

  const handleSubmit = () => {
    onSubmit(truckWeight);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onDismiss={handleCloseModal}
      onRequestClose={handleCloseModal}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyles}>{t('Capture Truck Weight')}</Text>
          </View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <GenericInputField
              label={'truckWeight'}
              keyboardType="numeric"
              placeholder={'Enter Truck Weight'}
              value={truckWeight}
              onChangeText={setTruckWeight}
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
                onPress={handleSubmit}
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
    backgroundColor: '#D3D3D3',
    maxHeight: '80%',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,56,49,255)',
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
