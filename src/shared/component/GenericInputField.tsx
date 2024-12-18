import {SetStateAction, useEffect, useState} from 'react';
import {KeyboardTypeOptions, StyleProp, View, ViewStyle} from 'react-native';
import {HelperText, TextInput, useTheme} from 'react-native-paper';
import {GenericInputFieldStyles} from '../../styles/styles';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../assets/colors/colors';
import {Fonts} from '../../assets/colors/fonts';

type Props = {
  containerStyles?: StyleProp<ViewStyle>;
  buttonContainerStyles?: StyleProp<ViewStyle>;
  label: string;
  placeholder: string;
  value?: string;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: React.Dispatch<SetStateAction<string>>;
  validate?: (value: string) => string | null;
  editable?: boolean;
  multiline?: boolean;
  lines?: number;
};

export default function GenericInputField({
  containerStyles,
  buttonContainerStyles,
  label,
  placeholder,
  value = '',
  keyboardType = 'default',
  onChangeText,
  validate,
  multiline,
  lines,
  editable = true,
  ...rest
}: Props) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [text, setText] = useState('');
  const {t} = useTranslation();

  useEffect(() => {
    setErrorMessage(null);
  }, []);

  function blurHandler(): void {
    if (validate) {
      const error = validate(value);
      setErrorMessage(error);
    }
  }

  function changeTextHandler(input: string): void {
    if (onChangeText) {
      onChangeText(input);
    } else {
      setText(input);
    }

    if (errorMessage) {
      setErrorMessage(null);
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
        error={!!errorMessage}
        placeholder={t(placeholder)}
        keyboardType={keyboardType}
        editable={editable}
        style={[
          GenericInputFieldStyles.buttonContainer,
          buttonContainerStyles,
          {fontFamily: Fonts.regularFamily},
          errorMessage && {borderColor: '#b42720', borderWidth: 1},
          !editable && {backgroundColor: '#E2DFDF'},
        ]}
        placeholderTextColor="#000000"
        multiline={multiline}
        numberOfLines={lines}
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
            accent: '#003831',
            onSurfaceVariant: Colors.mainColor,
          },
        }}
        {...rest}
      />
      {errorMessage && <HelperText type="error">{errorMessage}</HelperText>}
    </View>
  );
}
