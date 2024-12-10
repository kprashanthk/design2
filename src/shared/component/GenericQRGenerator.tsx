import {View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import React from 'react';
import {useTranslation} from 'react-i18next';
import {GenericQRGeneratorStyles} from '../../styles/styles';

type Props = {
  values: {};
  [key: string]: any;
};

export default function GenericQRGenerator({values, ...rest}: Props) {
  const {t} = useTranslation();

  return (
    <View
      style={GenericQRGeneratorStyles.container}
      accessibilityLabel={t('QR Code')}>
      <QRCode value={JSON.stringify(values)} size={200} {...rest} />
    </View>
  );
}
