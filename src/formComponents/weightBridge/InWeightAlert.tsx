import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import GenericInputField from '../../shared/component/GenericInputField';
import GenericButton from '../../shared/component/GenericButton';
import GenericModal from '../../shared/component/GenericModal';
import {useTranslation} from 'react-i18next';

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  inWeight: string;
  setInWeight: React.Dispatch<React.SetStateAction<string>>;
};

export default function InWeightAlert({
  visible,
  setVisible,
  inWeight,
  setInWeight,
}: Props) {
  function handleCloseInWeightAlert() {
    
    setVisible(false);
  }
  const {t}=useTranslation();
  return (
    <GenericModal 
    visible={visible}
     setVisible={setVisible} 
     title={t('In Weight')}
     >
      <GenericInputField
        label={t('Truck Weight')}
        placeholder={'Truck Weight'}
        value={inWeight?.toString() || ''}
        onChangeText={value => setInWeight(value)}
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <GenericButton
          title={'Cancel'}
          onPress={handleCloseInWeightAlert}
          buttonStyles={{width: '100%', height: 50}}
          buttonColor="white"
          textColor="black"
        />
        <GenericButton
          title={'Submit'}
          onPress={handleCloseInWeightAlert}
          containerStyles={{marginLeft: 30}}
          buttonStyles={{width: '100%', height: 50}}
        />
      </View>
    </GenericModal>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
