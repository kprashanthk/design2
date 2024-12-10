import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {GenericModalStyles} from '../../styles/styles';
import {Modal, Portal} from 'react-native-paper';

type Props = {
  children: React.ReactNode;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  setValue?: React.Dispatch<React.SetStateAction<any>>;
  setSnackBar?: React.Dispatch<React.SetStateAction<any>>;
};

export default function GenericModal({
  children,
  visible,
  setVisible,
  title,
  setValue,
  setSnackBar,
}: Props) {
  function handleCloseModal() {
    setVisible(false);
    setSnackBar?.(true);
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        contentContainerStyle={GenericModalStyles.modalContent}
        onDismiss={handleCloseModal}
        style={GenericModalStyles.modalContainer}>
        <View>
          <View style={GenericModalStyles.titleContainer}>
            <Text style={GenericModalStyles.titleStyles}>{title}</Text>
          </View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={GenericModalStyles.contentContainer}
            showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
}
