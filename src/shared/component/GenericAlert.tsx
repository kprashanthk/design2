import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import {GenericAlertStyles} from '../../styles/styles';
import { Colors } from '../../assets/colors/colors';

type Props = {
  visible: boolean;
  overlayStyles?: StyleProp<ViewStyle>;
  modalVIewStyles?: StyleProp<ViewStyle>;
  title: string;
  successTextStyles?: StyleProp<TextStyle>;
  okButtonStyles?: StyleProp<ViewStyle>;
  okButtonTextStyles?: StyleProp<ViewStyle>;
  buttonText?: string;
  color?: string;
  icon?: string;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setSnackBar?: Dispatch<SetStateAction<boolean>>;
  [key: string]: any;
};

const GenericAlert = ({
  visible,
  overlayStyles,
  modalVIewStyles,
  title,
  successTextStyles,
  okButtonStyles,
  okButtonTextStyles,
  buttonText = 'Ok',
  color,
  icon = 'check-circle',
  setVisible,
  setSnackBar,
  ...rest
}: Props) => {
  const handleClose = (): void => {
    setVisible(false);
    setSnackBar?.(true);
  };

  const {t} = useTranslation();

  // const {theme} = useTheme();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
      accessibilityLabel={t('Alert')}
      accessibilityHint={t('Success Alert')}
      accessibilityRole={'alert'}
      {...rest}>
      <View style={[GenericAlertStyles.overlay, overlayStyles]}>
        <View style={[GenericAlertStyles.modalView, modalVIewStyles]}>
          <MaterialIcons
            name={icon}
            size={60}
            color={Colors.mainColor}
            // color={color ? color : theme.successAlertIconColor}
            accessibilityLabel={t('Icon')}
            accessibilityHint={t('Icon to indicate the Success Alert')}
          />
          <Text
            style={[GenericAlertStyles.successText, successTextStyles]}
            accessibilityLabel={t(title)}>
            {t(title)}
          </Text>
          <TouchableOpacity
            style={[GenericAlertStyles.okButton, okButtonStyles]}
            onPress={handleClose}
            accessibilityLabel={t('Button')}
            accessibilityHint={t('Button to Close the Alert')}
            accessibilityRole={'button'}>
            <Text
              style={[GenericAlertStyles.okButtonText, okButtonTextStyles]}
              accessibilityLabel={t(buttonText)}>
              {t(buttonText)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default GenericAlert;
