import React, {useEffect, useState} from 'react';
import {
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {TextInput, Menu, Portal} from 'react-native-paper';
import {
  GenericDropDownStyles,
  GenericInputFieldStyles,
} from '../../styles/styles';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../assets/colors/colors';
import {Fonts} from '../../assets/colors/fonts';

interface Option {
  title: string;
  value: string;
}

type Props = {
  Options: Option[]; 
  containerStyles?: StyleProp<ViewStyle>;
  itemsStyles?: StyleProp<ViewStyle>;
  label: string;
  buttonContainerStyles?: StyleProp<ViewStyle>;
  icon?: string;
  editable?: boolean;
  setSearch?: React.Dispatch<React.SetStateAction<Option[]>>;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  showAllOption?: boolean;
  onSelect?: (selectedValue: string) => void;
  value?: string;
};

export default function GenericDropDown({
  Options,
  containerStyles,
  itemsStyles,
  label,
  buttonContainerStyles,
  icon = 'menu-down',
  editable = true,
  setSearch,
  setValue,
  showAllOption = false,
  onSelect,
  value,
  ...rest
}: Props) {
  const [selected, setSelected] = useState<string>(value ? value : ''); // Current selected value
  const [visible, setVisible] = useState<boolean>(false); // Dropdown visibility
  const [searchedValue, setSearchedValue] = useState<Option[]>(Options); // Filtered options
  const {t} = useTranslation();

  // Open menu handler
  function openMenuHandler(): void {
    setVisible(true);
  }

  // Close menu handler
  function closeMenuHandler(): void {
    setVisible(false);
  }
  useEffect(() => {
    setSearchedValue(Options);
  }, [Options]);

  // Select value handler
  function selectValueHandler(value: string): void {
    if (!editable) return;

    if (value === 'All') {
      setSelected(value);
      setSearch?.(Options);
    } else {
      const selectedOption = Options.find(option => option.title === value);
      if (selectedOption) {
        setSelected(selectedOption.title);
        setSearch?.([selectedOption]);
      }
    }

    setValue?.(value);
    onSelect?.(value);
    closeMenuHandler();
  }

  // Handle input change (search/filter functionality)
  function changeTextHandler(value: string): void {
    setSelected(value);
    const filtered = Options.filter(option =>
      option.title.toLowerCase().includes(value.toLowerCase()),
    );
    setSearchedValue(filtered);
  }

  return (
    <View style={[GenericDropDownStyles.container, containerStyles]}>
      <Portal.Host>
        <Menu
          visible={visible}
          contentStyle={{backgroundColor: Colors.mainColor}}
          onDismiss={closeMenuHandler}
          style={[GenericDropDownStyles.items, {zIndex: 50, top: '100%'}]}
          anchor={
            <TextInput
              label={t(label)}
              value={selected}
              style={[
                GenericInputFieldStyles.buttonContainer,
                buttonContainerStyles,
                {paddingHorizontal: 10},
              ]}
              underlineColor="transparent"
              editable={editable} 
              right={
                <TextInput.Icon
                  icon={icon}
                  onPress={openMenuHandler}
                  color={Colors.mainColor}
                />
              }
              placeholderTextColor="#000000"
              textColor="black"
              theme={{
                roundness: 10,
                fonts: {
                  bodyLarge: {
                    fontFamily: Fonts.regularFamily,
                  },
                },
                colors: {
                  primary: Colors.mainColor,
                  onPrimary: '#000000',
                  accent: '#000000',
                  onSurfaceVariant: Colors.mainColor,
                },
              }}
              onBlur={closeMenuHandler}
              onFocus={openMenuHandler}
              onChangeText={changeTextHandler} // Update search results
              {...rest}
            />
          }>
          <View style={[{zIndex: 20}]}>
            {showAllOption && editable && (
              <Menu.Item
                style={{backgroundColor: Colors.mainColor}}
                key={'All'}
                onPress={() => selectValueHandler('All')}
                title={'All'}
                titleStyle={{color: 'white'}}
              />
            )}

            {/* Render filtered options */}
            {searchedValue.map(item => (
              <Menu.Item
                style={[{backgroundColor: Colors.mainColor}, itemsStyles]}
                key={item.title}
                onPress={() => selectValueHandler(item.title)}
                title={item.title}
                titleStyle={{color: 'white', fontFamily: Fonts.regularFamily}}
              />
            ))}
          </View>
        </Menu>
      </Portal.Host>
    </View>
  );
}
