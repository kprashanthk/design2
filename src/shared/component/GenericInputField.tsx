import {SetStateAction, useEffect, useState} from 'react';
import {KeyboardTypeOptions, StyleProp, View, ViewStyle} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import {GenericInputFieldStyles} from '../../styles/styles';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../assets/colors/colors';

// type Props = {
//   containerStyles?: StyleProp<ViewStyle>;
//   label: string;
//   placeholder: string;
//   buttonContainerStyles?: StyleProp<ViewStyle>;
//   multiline?: boolean;
//   lines?: number;
//   value?: string;
//   keyboardType?: KeyboardTypeOptions;
//   onChangeText?: (text: string) => void;
//   validate?: (value: string) => boolean;
// };

// export default function GenericInputField({
//   containerStyles,
//   label,
//   placeholder,
//   buttonContainerStyles,
//   multiline,
//   lines,
//   value,
//   keyboardType = 'default',
//   ...rest
// }: Props) {
//   const [text, setText] = useState('');
//   const [error, setError] = useState(false);
//   const {t} = useTranslation();

//   useEffect(() => {
//     setError(false);
//   }, []);

//   function blurHandler(): void {
//     if (text === '') {
//       setError(true);
//     }
//   }

//   function changeTextHandler(value: string): void {
//     setText(value);
//     if (text !== '') {
//       setError(false);
//     }
//   }

//   return (
//     <View style={[GenericInputFieldStyles.container, containerStyles]}>
//       <TextInput
//         underlineColor="transparent"
//         label={t(label)}
//         onBlur={blurHandler}
//         value={value ? value : text}
//         onChangeText={changeTextHandler}
//         error={error}
//         placeholder={t(placeholder)}
//         keyboardType={keyboardType}
//         style={[
//           GenericInputFieldStyles.buttonContainer,
//           buttonContainerStyles,
//           error && {borderColor: '#b42720', borderWidth: 1},
//         ]}
//         placeholderTextColor="#000000"
//         textColor="black"
//         theme={{
//           roundness: 10,
//           colors: {
//             primary: Colors.text,
//             onPrimary: '#000000',
//             accent: '#003831',
//             onSurfaceVariant: Colors.text,
//           },
//         }}
//         multiline={multiline}
//         numberOfLines={lines}
//         {...rest}
//       />
//       {error && <HelperText type="error">You Must Fill The Field</HelperText>}
//     </View>
//   );
// }

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
      // Update the local state directly if onChangeText is not provided
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
        editable={editable} // Pass editable prop to TextInput
        style={[
          GenericInputFieldStyles.buttonContainer,
          buttonContainerStyles,
          errorMessage && {borderColor: '#b42720', borderWidth: 1},
          !editable && {backgroundColor: '#E2DFDF'},
        ]}
        placeholderTextColor="#000000"
        multiline={multiline}
        numberOfLines={lines}
        textColor="black"
        theme={{
          roundness: 10,
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
