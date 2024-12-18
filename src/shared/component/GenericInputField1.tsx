import {useEffect, useState} from 'react';
import {KeyboardTypeOptions, StyleProp, View, ViewStyle} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import {GenericInputFieldStyles} from '../../styles/styles';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../assets/colors/colors';
import {Fonts} from '../../assets/colors/fonts';

type Props = {
  containerStyles?: StyleProp<ViewStyle>;
  label: string;
  placeholder: string;
  buttonContainerStyles?: StyleProp<ViewStyle>;
  multiline?: boolean;
  lines?: number;
  value?: string;
  keyboardType?: KeyboardTypeOptions;
};

export default function GenericInputField({
  containerStyles,
  label,
  placeholder,
  buttonContainerStyles,
  multiline,
  lines,
  value,
  keyboardType = 'default',
  ...rest
}: Props) {
  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {
    setError(false);
  }, []);

  function blurHandler(): void {
    if (text === '') {
      setError(true);
    }
  }

  function changeTextHandler(value: string): void {
    setText(value);
    if (text !== '') {
      setError(false);
    }
  }

  return (
    <View style={[GenericInputFieldStyles.container, containerStyles]}>
      <TextInput
        underlineColor="transparent"
        label={t(label)}
        onBlur={blurHandler}
        value={value ? value : text}
        onChangeText={changeTextHandler}
        error={error}
        placeholder={t(placeholder)}
        keyboardType={keyboardType}
        style={[
          GenericInputFieldStyles.buttonContainer,
          buttonContainerStyles,
          error && {borderColor: '#b42720', borderWidth: 1},
        ]}
        placeholderTextColor={Colors.mainColor}
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
            onPrimary: Colors.mainColor,
            accent: Colors.mainColor,
            onSurfaceVariant: Colors.mainColor,
          },
        }}
        multiline={multiline}
        numberOfLines={lines}
        {...rest}
      />
      {error && <HelperText type="error">You Must Fill The Field</HelperText>}
    </View>
  );
}
