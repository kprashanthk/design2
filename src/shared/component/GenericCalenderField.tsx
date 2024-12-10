import {useState} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {
  GenericCalenderFieldStyles,
  GenericInputFieldStyles,
} from '../../styles/styles';
import {TextInput} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {FormattedDate} from '../../utils/FormattedDate';
import {useTranslation} from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../assets/colors/colors';

type Props = {
  containerStyles?: StyleProp<ViewStyle>;
  label: string;
  placeholder: string;
  buttonContainerStyles?: StyleProp<ViewStyle>;
  icon?: string;
};

export default function GenericCalenderField({
  containerStyles,
  label,
  placeholder,
  buttonContainerStyles,
  icon = 'calendar',
  ...rest
}: Props) {
  const [selectedDate, setSelectedDate] = useState('');
  const [visible, setVisible] = useState(false);

  const {t} = useTranslation();

  function openCalenderHandler(): void {
    setVisible(true);
  }

  function closeCalenderHandler(): void {
    setVisible(false);
  }

  function changeDateHandler(value: Date): void {
    const formattedDate = FormattedDate(value);
    setSelectedDate(formattedDate);
    closeCalenderHandler();
  }

  return (
    <View style={[GenericCalenderFieldStyles.conatiner, containerStyles]}>
      <TextInput
        underlineColor="transparent"
        label={t(label)}
        value={selectedDate}
        placeholder={t(placeholder)}
        style={[GenericInputFieldStyles.buttonContainer, buttonContainerStyles]}
        placeholderTextColor="#003831"
        textColor="black"
        theme={{
          roundness: 10,
          colors: {
            primary: Colors.mainColor,
            onPrimary: '#003831',
            accent: '#003831',
            onSurfaceVariant: Colors.mainColor,
          },
        }}
        outlineColor="#003831"
        onFocus={openCalenderHandler}
        right={
          <TextInput.Icon
            icon={() => (
              <View>
                <TouchableOpacity
                  onPress={openCalenderHandler}
                  hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name={icon}
                    color={Colors.mainColor}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        }
        editable={false}
        {...rest}
      />
      <DateTimePickerModal
        isVisible={visible}
        mode="date"
        onConfirm={changeDateHandler}
        onCancel={closeCalenderHandler}
      />
    </View>
  );
}
