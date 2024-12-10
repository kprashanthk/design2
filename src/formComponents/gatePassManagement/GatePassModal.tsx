import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Entypo';
import GenericInputField from '../../shared/component/GenericInputField';
import { Fonts } from '../../assets/colors/fonts';
type Props = {
  visible: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  viewData: any;
};

export default function GatePassModal({visible, setValue, viewData}: Props) {
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
          <View style={styles.titleContainer}>
            <View style={{flexDirection: 'row', marginLeft: 90}}>
              <Text style={styles.titleStyles}>{t('View Details')}</Text>
              <TouchableOpacity
                onPress={handleCloseModal}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                <Icon
                  name="cross"
                  color="white"
                  size={30}
                  style={{marginLeft: 90}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled">
            <GenericInputField
              label={'tokenNumber'}
              placeholder={'tokenNUmber'}
              value={viewData?.tokenNumber || ''}
              editable={false}
            />
            <GenericInputField
              label={'noOfBags'}
              placeholder={'noOfBags'}
              value={viewData?.noOfBags || ''}
              editable={false}
            />
            <GenericInputField
              label={'cropYear'}
              placeholder={'cropYear'}
              value={viewData?.cropYear || ''}
              editable={false}
            />
            <GenericInputField
              label={'bagType'}
              placeholder={'bagType'}
              value={viewData?.bagType || ''}
              editable={false}
            />
            <GenericInputField
              label={'shed'}
              placeholder={'shed'}
              value={viewData?.shed || ''}
              editable={false}
            />
            <GenericInputField
              label={'stack'}
              placeholder={'stack'}
              value={viewData?.stack || ''}
              editable={false}
            />
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
    zIndex: 0,
  },
  modalView: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#D3D3D3',
    maxHeight: '80%',
    zIndex: 0,
  },
  titleContainer: {
    backgroundColor: '#003831',
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
