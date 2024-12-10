import {useState} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {TextInput} from 'react-native-paper';
import {GenericInputFieldStyles} from '../../styles/styles';
import React from 'react';
import {Colors} from '../../assets/colors/colors';
import {useTranslation} from 'react-i18next';

type Props = {
  containerStyles?: StyleProp<ViewStyle>;
  label?: string;
  placeholder: string;
  buttonContainerStyles?: StyleProp<ViewStyle>;
  icon?: string;
  text?: string;
  setText?: React.Dispatch<React.SetStateAction<string>>;
  items: any;
  setSearchedValue: React.Dispatch<React.SetStateAction<any[]>>;
  searchedValue?: any;
};

export default function GenericSearch({
  containerStyles,
  label,
  placeholder,
  buttonContainerStyles,
  icon = 'magnify',
  text,
  setText,
  items,
  setSearchedValue,
  searchedValue,
  ...rest
}: Props) {
  const {t} = useTranslation();
  function changeTextHandler(value: string): void {
    setText?.(value);
    const filterItems = items.filter((item: {title: string}) =>
      item.title.toLowerCase().includes(value.toLowerCase()),
    );
    setSearchedValue(filterItems);
  }

  return (
    <View style={[GenericInputFieldStyles.container, containerStyles]}>
      <TextInput
        mode="outlined"
        label={label}
        value={text}
        onChangeText={changeTextHandler}
        placeholder={t(placeholder)}
        style={[GenericInputFieldStyles.buttonContainer, buttonContainerStyles]}
        theme={{
          roundness: 10,
          colors: {
            primary: Colors.mainColor,
            onPrimary: Colors.mainColor,
            accent: Colors.mainColor,
            onSurfaceVariant: Colors.mainColor,
          },
        }}
        right={icon && <TextInput.Icon icon={icon} color={'#003831'} />}
        {...rest}
      />
    </View>
  );
}
