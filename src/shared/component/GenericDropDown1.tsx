import React, {useEffect, useState} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {TextInput, Menu, HelperText} from 'react-native-paper';
import {
  GenericDropDownStyles,
  GenericInputFieldStyles,
} from '../../styles/styles';
import {Colors} from '../../assets/colors/colors';

interface Option {
  title: string;
  value: string;
}

type Props = {
  options: any[];
  containerStyles?: StyleProp<ViewStyle>;
  itemsStyles?: StyleProp<ViewStyle>;
  label: string;
  buttonContainerStyles?: StyleProp<ViewStyle>;
  icon?: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  required?: boolean;
  value?: string;
};

export default function GenericDropDown1({
  options,
  containerStyles,
  itemsStyles,
  label,
  buttonContainerStyles,
  icon = 'menu-down',
  selected,
  setSelected,
  required = false,
  value,
  ...rest
}: Props) {
  const [visible, setVisible] = useState<boolean>(false);
  const [searchedValue, setSearchedValue] = useState<any[]>(options);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, []);

  useEffect(() => {
    setSearchedValue(options);
  }, [options]);

  function openMenuHandler(): void {
    setVisible(true);
  }

  function closeMenuHandler(): void {
    if (selected === '' && required === true) {
      setError(true);
    }
    setVisible(false);
  }

  function selectValueHandler(value: string): void {
    const selectedOption = options.find(option => option.title === value);
    if (selectedOption) {
      setSelected(selectedOption.value);
      setError(false);
    }
    closeMenuHandler();
  }

  function changeTextHandler(value: string): void {
    setSelected(value);
    if (value !== '') {
      setError(false);
      const filter = options.filter(option =>
        option.title.toLowerCase().includes(value.toLowerCase()),
      );
      setSearchedValue(filter);
    }
  }

  return (
    <View style={[GenericDropDownStyles.container, containerStyles]}>
      <Menu
        visible={visible}
        contentStyle={{backgroundColor: Colors.mainColor}}
        onDismiss={closeMenuHandler}
        anchor={
          <View>
            <TextInput
              mode="outlined"
              label={label}
              value={selected}
              style={[
                GenericInputFieldStyles.buttonContainer,
                buttonContainerStyles,
                {paddingHorizontal: 10},
              ]}
              error={error}
              showSoftInputOnFocus={false}
              right={
                <TextInput.Icon
                  icon={visible ? 'menu-up' : icon}
                  onPress={openMenuHandler}
                  color={Colors.mainColor}
                />
              }
              placeholderTextColor={Colors.mainColor}
              textColor="black"
              theme={{
                roundness: 10,
                colors: {
                  primary: Colors.mainColor,
                  onPrimary: Colors.mainColor,
                  accent: Colors.mainColor,
                  onSurfaceVariant: Colors.mainColor,
                },
              }}
              onBlur={closeMenuHandler}
              onFocus={openMenuHandler}
              onChangeText={changeTextHandler}
            />
            {error && (
              <HelperText type="error">You Must Fill The Field</HelperText>
            )}
          </View>
        }
        style={[
          GenericDropDownStyles.items,
          {position: 'absolute', marginTop: 50},
        ]}>
        {searchedValue.map((item, index) => (
          <Menu.Item
            key={index}
            title={item.title}
            onPress={() => selectValueHandler(item.title)}
            titleStyle={{color: 'white'}}
          />
        ))}
      </Menu>
    </View>
  );
}
