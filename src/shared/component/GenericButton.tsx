import {View, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import {GenericButtonStyles} from '../../styles/styles';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../assets/colors/colors';

type Props = {
  containerStyles?: StyleProp<ViewStyle>;
  labelStyles?: StyleProp<TextStyle>;
  buttonStyles?: StyleProp<ViewStyle>;
  buttonColor?: string;
  textColor?: string;
  icon?: string;
  iconColor?: string;
  title: string;
  onPress: () => void;
};

export default function GenericButton({
  containerStyles,
  labelStyles,
  buttonStyles,
  buttonColor = Colors.orange,
  textColor = '#ebefef',
  icon,
  iconColor,
  title,
  onPress,
  ...rest
}: Props) {
  const {t} = useTranslation();

  return (
    <View style={[GenericButtonStyles.conatiner, containerStyles]}>
      <Button
        mode="contained"
        buttonColor={buttonColor}
        textColor={textColor}
        style={[GenericButtonStyles.button, buttonStyles]}
        labelStyle={[
          GenericButtonStyles.labelStyle,
          {textAlign: 'center', flexWrap: 'wrap'},
          labelStyles,
        ]}
        {...rest}
        onPress={onPress}
        contentStyle={{
          flexDirection: icon ? 'row' : 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 5,
        }}
        icon={
          icon
            ? () => (
                <IconButton
                  icon={icon}
                  size={26}
                  style={{marginRight: 8}}
                  iconColor={iconColor}
                />
              )
            : undefined
        }>
        {t(title)}
      </Button>
    </View>
  );
}
