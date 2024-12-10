import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import GenericDropDown from '../../../shared/component/GenericDropDown';
import GenericButton from '../../../shared/component/GenericButton';
import {useTranslation} from 'react-i18next';
import {ActivityData, LabourData} from '../../../data';
import {Modal, Portal} from 'react-native-paper';
import {Colors} from '../../../assets/colors/colors';
import { Fonts } from '../../../assets/colors/fonts';

type Props = {
  visible: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddStack({visible, setValue}: Props) {
  function handleCloseModal() {
    setValue(false);
  }

  const {t} = useTranslation();

  return (
    <Portal>
      <Modal
        visible={visible}
        contentContainerStyle={styles.modalContent}
        onDismiss={handleCloseModal}
        style={styles.modalContainer}>
        <View>
          <View style={[styles.titleContainer, {backgroundColor: '#003831'}]}>
            <Text style={styles.titleStyles}>{t('Add Stack')}</Text>
          </View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <GenericDropDown
              Options={ActivityData}
              label={'Activity'}
              containerStyles={{zIndex: 3}}
            />
            <GenericDropDown
              Options={LabourData}
              label={'Labour Gang'}
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
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.backgroundColor,
    borderRadius: 10,
    maxHeight: '80%',
    width: '90%',
  },
  titleContainer: {
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleStyles: {
    fontFamily: Fonts.notoSans,
    fontSize: 20,
    fontWeight: 'bold',
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
