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
import {Fonts} from '../../assets/colors/fonts';

type Props = {
  visible: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  item: any;
};

export default function ToolTipStack({visible, setValue, item}: Props) {
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
            <Text style={styles.titleStyles}>
              {item?.values?.title.toUpperCase()}
            </Text>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={styles.closeIcon}>
              <Icon name="circle-with-cross" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.ValueContainer}>
              <Text style={styles.valueTextStyles}>
                <Text style={{fontWeight: 'bold'}}>{t('Stack Number')}: </Text>
                {item?.id}
              </Text>
              <Text style={styles.valueTextStyles}>
                <Text style={{fontWeight: 'bold'}}>{t('Stack Name')}: </Text>
                {item?.values?.stackName}
              </Text>
              <Text style={styles.valueTextStyles}>
                <Text style={{fontWeight: 'bold'}}>
                  {t('Stack Utilization')}:{' '}
                </Text>
                {item?.values?.utilization}
              </Text>
              <Text style={styles.valueTextStyles}>
                {/* <Text style={{fontWeight: 'bold'}}> */}
                {t('Stack Capacity')}: {/* </Text> */}
                {item?.values?.capacity}
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
    fontFamily: Fonts.boldFamily,
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
  },
  closeIcon: {
    padding: 5,
  },
  contentContainer: {},
  ValueContainer: {
    padding: 10,

    paddingHorizontal: 25,
  },
  valueTextStyles: {
    fontFamily: Fonts.boldFamily,
    fontSize: 22,
    paddingVertical: 10,
  },
});
