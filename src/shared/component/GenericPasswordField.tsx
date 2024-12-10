import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {
  GenericInputFieldStyles,
  GenericPasswordFieldStyles,
} from '../../styles/styles';
import {HelperText, TextInput} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../assets/colors/colors';

type Props = {
  containerStyles?: StyleProp<ViewStyle>;
  label: string;
  placeholder: string;
  buttonContainerStyles?: StyleProp<ViewStyle>;
};

export default function GenericPasswordField({
  containerStyles,
  label,
  placeholder,
  buttonContainerStyles,
  ...rest
}: Props) {
  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
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
    <View style={[GenericPasswordFieldStyles.container, containerStyles]}>
      <TextInput
        underlineColor="transparent"
        label={t(label)}
        onBlur={blurHandler}
        value={text}
        onChangeText={changeTextHandler}
        error={error}
        placeholder={t(placeholder)}
        style={[
          GenericInputFieldStyles.buttonContainer,
          buttonContainerStyles,
          error && {borderColor: '#b42720', borderWidth: 1},
        ]}
        placeholderTextColor={Colors.mainColor}
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
        secureTextEntry={!passwordVisible}
        right={
          <TextInput.Icon
            icon={() => (
              <View>
                <TouchableOpacity
                  onPressIn={() => setPasswordVisible(true)}
                  onPressOut={() => setPasswordVisible(false)}
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name={passwordVisible ? 'eye-off' : 'eye'}
                    color={Colors.mainColor}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        }
        {...rest}
      />
      {error && <HelperText type="error">You Must Fill The Field</HelperText>}
    </View>
  );
}
