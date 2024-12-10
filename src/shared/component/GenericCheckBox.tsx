// import {useState} from 'react';
// import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
// import {Checkbox} from 'react-native-paper';
// import {GenericCheckBoxStyles} from '../../styles/styles';
// import {useTranslation} from 'react-i18next';
// import {Colors} from '../../assets/colors/colors';

// type Props = {
//   containerStyles?: StyleProp<ViewStyle>;
//   color?: string;
//   uncheckedColor?: string;
//   title?: string;
//   textStyles?: StyleProp<TextStyle>;
//   checked: boolean;
//   onCheck?: (check: boolean) => void;
// };

// export default function GenericCheckBox({
//   containerStyles,
//   color = Colors.text,
//   uncheckedColor = Colors.text,
//   title,
//   textStyles,
//   checked,
//   onCheck,
//   ...rest
// }: Props) {
//   const [check, setCheck] = useState<boolean>(checked);
//   const {t} = useTranslation();

//   function checkhandler(): void {
//     const newCheckedStatus = !check;
//     setCheck(!check);
//     onCheck?.(newCheckedStatus);
//   }

//   return (
//     <View style={[GenericCheckBoxStyles.container, containerStyles]}>
//       <Checkbox
//         status={check ? 'checked' : 'unchecked'}
//         onPress={checkhandler}
//         color={color}
//         uncheckedColor={uncheckedColor}
//       />
//       {!!title && (
//         <Text {...rest} style={[GenericCheckBoxStyles.text, textStyles]}>
//           {t(title)}
//         </Text>
//       )}
//     </View>
//   );
// }

import {useState} from 'react';
import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {GenericCheckBoxStyles} from '../../styles/styles';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../assets/colors/colors';

type Props = {
  containerStyles?: StyleProp<ViewStyle>;
  color?: string;
  uncheckedColor?: string;
  title?: string;
  textStyles?: StyleProp<TextStyle>;
  checked: boolean;
  onCheck?: (check: boolean) => void;
  [key: string]: any;
};

export default function GenericCheckBox({
  containerStyles,
  color,
  uncheckedColor,
  title,
  textStyles,
  checked,
  onCheck,
  ...rest
}: Props) {
  const {t} = useTranslation();

  function checkhandler(): void {
    const newCheckedStatus = !checked;
    onCheck?.(newCheckedStatus);
  }

  return (
    <View
      style={[GenericCheckBoxStyles.container, containerStyles]}
      accessibilityRole={'checkbox'}
      accessibilityLabel={t('Check Box')}>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={checkhandler}
        color={color ? color : 'green'}
        uncheckedColor={uncheckedColor ? uncheckedColor : Colors.mainColor}
        {...rest}
      />
      {!!title && (
        <Text
          accessibilityLabel={t(title)}
          style={[GenericCheckBoxStyles.text, textStyles, {padding: 5}]}>
          {t(title)}
        </Text>
      )}
    </View>
  );
}
