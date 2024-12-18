import {useNavigation} from '@react-navigation/native';
import React, {Dispatch, SetStateAction} from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'react-native';
import {Snackbar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../assets/colors/colors';
import {Fonts} from '../../assets/colors/fonts';

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  title: string;
  navigationText: string;
};

export default function GenericSnackBar({
  visible,
  setVisible,
  title,
  navigationText,
}: Props) {
  const navigation = useNavigation();
  const {t} = useTranslation();

  function handleCloseSnackBar() {
    setVisible(false);
  }

  return (
    <Snackbar
      visible={visible}
      onDismiss={handleCloseSnackBar}
      icon={() => (
        <MaterialCommunityIcons name="close" color="black" size={20} />
      )}
      action={{
        label: t('navigate'),
        textColor: Colors.white,
        onPress: () => {
          navigation.navigate(navigationText);
        },
        theme: {
          fonts: {
            bodyLarge: {
              fontFamily: Fonts.regularFamily,
            },
          },
        },
      }}
      onIconPress={handleCloseSnackBar}
      style={{
        backgroundColor: Colors.mainColor,
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
      }}>
      <Text style={{fontFamily: Fonts.regularFamily, fontSize: 14}}>
        {t(title)}
      </Text>
    </Snackbar>
  );
}
