import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {Colors} from '../../assets/colors/colors';
import { Fonts } from '../../assets/colors/fonts';

type Props = {
  visible: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  item: any;
};

export default function GenericToolTip({visible, setValue, item}: Props) {
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
          <View
            style={[
              styles.titleContainer,
              {backgroundColor: Colors.mainColor},
            ]}>
            <Text style={styles.titleStyles}>{item.title?.toUpperCase()}</Text>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={styles.closeIcon}>
              <Icon name="circle-with-cross" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.ValueContainer}>
              <Text style={styles.valueTextStyles}>
                <Text style={{fontWeight: 'bold'}}>{t('Shed Number')}: </Text>
                {item.id}
              </Text>
              <Text style={styles.valueTextStyles}>
                <Text style={{fontWeight: 'bold'}}>{t('Shed Name')}: </Text>
                {item.title}
              </Text>
              <Text style={styles.valueTextStyles}>
                <Text style={{fontWeight: 'bold'}}>{t('Shed Filled')}: </Text>
                {item.progress * 100} %
              </Text>
              <Text style={styles.valueTextStyles}>
                <Text style={{fontWeight: 'bold'}}>{t('Stack Count')}: </Text>
                {item.stackCount}
              </Text>
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
    paddingBottom: 20,
  },
  titleContainer: {
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleStyles: {
    fontFamily: Fonts.notoSans,
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  closeIcon: {
    padding: 5,
  },

  ValueContainer: {
    padding: 10,
    paddingHorizontal: 25,
  },
  valueTextStyles: {
    fontFamily: Fonts.notoSans,
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '600',
    paddingVertical: 10,
  },
});
