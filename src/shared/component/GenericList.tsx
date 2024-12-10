// import React, {useEffect, useState} from 'react';
// import {
//   StyleProp,
//   StyleSheet,
//   Text,
//   TextInput,
//   TextStyle,
//   TouchableOpacity,
//   View,
//   ViewStyle,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import Collapsible from 'react-native-collapsible';
// import GenericCheckBox from './GenericCheckBox';
// import {useTranslation} from 'react-i18next';
// import {Colors} from '../../assets/colors/colors';

// interface DropDownValue {
//   title: string;
//   editable: boolean;
// }

// interface Wagon {
//   checked: boolean;
//   id: string;
//   title: string;
//   icons: string[];
//   dropDownValues: DropDownValue[];
// }

// type Props = {
//   outerContainerStyles?: StyleProp<ViewStyle>;
//   innerContainerStyles?: StyleProp<ViewStyle>;
//   items: Wagon[];
//   textStyles?: StyleProp<TextStyle>;
//   iconStyles?: StyleProp<ViewStyle>;
//   collapsibleStyle?: StyleProp<ViewStyle>;
//   accordinView?: StyleProp<ViewStyle>;
//   accordinText?: StyleProp<TextStyle>;
//   checkBoxRequired?: boolean;
// };

// export default function GenericList({
//   outerContainerStyles,
//   innerContainerStyles,
//   items,
//   textStyles,
//   iconStyles,
//   collapsibleStyle,
//   accordinView,
//   accordinText,
//   checkBoxRequired = false,
// }: Props) {
//   useEffect(() => {
//     const checkedItems = items
//       .filter(item => item.checked === true)
//       .reduce<{[key: string]: boolean}>((acc, item) => {
//         acc[item.id] = item.checked;
//         return acc;
//       }, {});
//     setCheckedItems(checkedItems);
//   }, [items]);

//   const [expandedItem, setExpandedItem] = useState<string | null>(null);

//   const [checkedItems, setCheckedItems] = useState<{[key: string]: boolean}>(
//     {},
//   );

//   const {t} = useTranslation();

//   const [inputValues, setInputValues] = useState<{
//     [key: string]: {[values: string]: string};
//   }>({});

//   function handleInputValues(id: string, text: string, fieldName: string) {
//     setInputValues(prevValues => ({...prevValues, [id]: {fieldName: text}}));
//   }

//   function handleCheckedItems(id: string, checked: boolean) {
//     setCheckedItems(prevItems => ({...prevItems, [id]: checked}));
//   }

//   function handleCollapsed(itemId: string): void {
//     setExpandedItem(prev => (prev === itemId ? null : itemId));
//   }

//   return (
//     <View style={[styles.outerContainer, outerContainerStyles]}>
//       {items.map(list => (
//         <View key={list.id} style={{paddingBottom: 10}}>
//           <View
//             style={[
//               styles.innerContainer,
//               expandedItem === list.id && {
//                 borderBottomLeftRadius: 0,
//                 borderBottomRightRadius: 0,
//                 borderColor: '#003831',
//                 borderBottomColor: 'white',
//                 borderWidth: 1,
//               },
//               innerContainerStyles,
//             ]}>
//             <Text style={[styles.text, textStyles]}>{list.title}</Text>
//             {/* {list.icons.map(icon => (
//               <TouchableOpacity
//                 onPress={() => handleCollapsed(list.id)}
//                 hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
//                 <Icon
//                   key={icon}
//                   name={icon}
//                   size={20}
//                   color={'#003831'}
//                   style={[styles.iconStyle, iconStyles]}
//                 />
//               </TouchableOpacity>
//             ))} */}
//             {list.icons.map((icon, index) => (
//               <TouchableOpacity
//                 key={icon || index} // Key should be unique for each TouchableOpacity
//                 onPress={() => handleCollapsed(list.id)}
//                 hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
//                 <Icon
//                   name={icon}
//                   size={20}
//                   color={Colors.text}
//                   style={[styles.iconStyle, iconStyles]}
//                 />
//               </TouchableOpacity>
//             ))}
//             {checkBoxRequired && (
//               <GenericCheckBox
//                 checked={list.checked}
//                 containerStyles={{marginLeft: 30}}
//                 onCheck={checked => handleCheckedItems(list.id, checked)}
//               />
//             )}
//           </View>
//           <Collapsible
//             collapsed={expandedItem !== list.id}
//             style={[styles.collapsibleStyle, collapsibleStyle]}>
//             {list.dropDownValues.map((values, index) => (
//               <View style={[styles.accordinView, accordinView]} key={index}>
//                 <Text style={[styles.accordinText, accordinText]}>
//                   {t(values.title)}
//                 </Text>
//                 <TextInput
//                   value={inputValues[list.id]?.[values.title] || ''}
//                   onChangeText={text =>
//                     handleInputValues(list.id, text, values.title)
//                   }
//                   editable={
//                     checkBoxRequired
//                       ? !!checkedItems[list.id] && values.editable
//                       : values.editable
//                   }
//                   style={[
//                     styles.inputStyle,
//                     {
//                       backgroundColor: checkBoxRequired
//                         ? checkedItems[list.id] && values.editable
//                           ? 'white'
//                           : '#E2DFDF'
//                         : values.editable
//                         ? 'white'
//                         : '#E2DFDF',
//                     },
//                   ]}
//                 />
//               </View>
//             ))}
//           </Collapsible>
//         </View>
//       ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   innerContainer: {
//     width: '100%',
//     height: 50,
//     borderRadius: 10,
//     borderColor: '#6e8797',
//     borderWidth: 1.5,
//     backgroundColor: 'white',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//   },
//   outerContainer: {
//     paddingVertical: 10,
//     width: '100%',
//     borderRadius: 10,
//   },
//   text: {
//     fontSize: 18,
//     flex: 1,
//     fontFamily: Fonts.notoSans,
//   },
//   iconStyle: {
//     marginLeft: 20,
//   },
//   collapsibleStyle: {
//     padding: 10,
//     width: '100%',
//     backgroundColor: 'white',
//     borderColor: 'black',
//     borderWidth: 1.5,
//     borderBottomLeftRadius: 10,
//     borderBottomRightRadius: 10,
//   },
//   accordinView: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   accordinText: {
//     fontSize: 15,
//     fontFamily: Fonts.notoSans,
//     flexShrink: 1,
//     flexWrap: 'wrap',
//   },
//   inputStyle: {
//     borderColor: 'black',
//     borderWidth: 1,
//     width: '53%',
//     padding: 5,
//     height: 40,
//   },
// });
import React, {useEffect, useState} from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Collapsible from 'react-native-collapsible';

import {useTranslation} from 'react-i18next';
import GenericCheckBox from './GenericCheckBox';
import {GenericListStyles} from '../../styles/styles';
import {Colors} from '../../assets/colors/colors';

interface DropDownValue {
  title: string;
  editable: boolean;
}

interface Data {
  checked: boolean;
  id: string;
  title: string;
  icons: string[];
  dropDownValues: DropDownValue[];
}

type Props = {
  outerContainerStyles?: StyleProp<ViewStyle>;
  innerContainerStyles?: StyleProp<ViewStyle>;
  items: Data[];
  textStyles?: StyleProp<TextStyle>;
  iconStyles?: StyleProp<ViewStyle>;
  collapsibleStyle?: StyleProp<ViewStyle>;
  accordinView?: StyleProp<ViewStyle>;
  accordinText?: StyleProp<TextStyle>;
  checkBoxRequired?: boolean;
  inputValues: {
    [key: string]: {
      [values: string]: string;
    };
  };
  setInputValues: React.Dispatch<
    React.SetStateAction<{
      [key: string]: {
        [values: string]: string;
      };
    }>
  >;
  [key: string]: any;
  onIconPress?: (icon: string) => void;
};

const iconNames = ['edit', 'trash-alt', 'user'];

export default function GenericList({
  outerContainerStyles,
  innerContainerStyles,
  items,
  textStyles,
  iconStyles,
  collapsibleStyle,
  accordinView,
  accordinText,
  inputValues,
  onCheck,
  setInputValues,
  checkBoxRequired = false,
  onIconPress,
  ...rest
}: Props) {
  useEffect(() => {
    const checkedItems = items
      .filter(item => item.checked === true)
      .reduce<{[key: string]: boolean}>((acc, item) => {
        acc[item.id] = item.checked;
        return acc;
      }, {});
    setCheckedItems(checkedItems);
  }, [items]);

  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const [checkedItems, setCheckedItems] = useState<{[key: string]: boolean}>(
    {},
  );

  const {t} = useTranslation();
  const handleCheckedItems = (id: string, checked: boolean) => {
    if (onCheck) {
      onCheck(id, checked); // Pass the updated state to the parent
    }
  };
  function handleInputValues(id: string, text: string, fieldName: string) {
    setInputValues(prevValues => ({
      ...prevValues,
      [id]: {
        ...prevValues[id],
        [fieldName]: text,
      },
    }));
  }

  // function handleCheckedItems(id: string, checked: boolean) {
  //   setCheckedItems(prevItems => ({...prevItems, [id]: checked}));
  // }

  function handleCollapsed(itemId: string): void {
    setExpandedItem(prev => (prev === itemId ? null : itemId));
  }

  return (
    <View
      style={[GenericListStyles.outerContainer, outerContainerStyles]}
      accessibilityRole={'list'}>
      {items?.map(list => (
        <View key={list.id} style={{paddingBottom: 10}}>
          <View
            style={[
              GenericListStyles.innerContainer,
              expandedItem === list.id && {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderColor: Colors.mainColor,
                borderBottomColor: 'white',
                borderWidth: 1,
              },
              innerContainerStyles,
            ]}>
            <Text
              style={[GenericListStyles.text, textStyles]}
              accessibilityLabel={list.title}>
              {list.title}
            </Text>
            {list?.icons
              ?.filter(icon => iconNames.includes(icon))
              ?.map(icon => (
                <Icon
                  key={icon}
                  name={icon}
                  size={20}
                  color={Colors.mainColor}
                  style={[GenericListStyles.iconStyle, iconStyles]}
                  accessibilityLabel={`Icon`}
                  accessibilityHint={t(`Icon name is ${icon}`)}
                  onPress={() => onIconPress?.(icon)}
                />
              ))}
            {checkBoxRequired && (
              <GenericCheckBox
                checked={list.checked}
                containerStyles={{marginLeft: 100}}
                onCheck={(checked: boolean) =>
                  handleCheckedItems(list.id, checked)
                }
              />
            )}
            <Icon
              name={expandedItem !== list.id ? 'angle-down' : 'angle-up'}
              size={20}
              color={Colors.mainColor}
              style={[GenericListStyles.iconStyle, iconStyles]}
              onPress={() => handleCollapsed(list.id)}
              accessibilityLabel={`Icon`}
              accessibilityHint={t(`Icon name is arrow`)}
            />
          </View>
          <Collapsible
            collapsed={expandedItem !== list.id}
            style={[GenericListStyles.collapsibleStyle, collapsibleStyle]}
            {...rest}>
            {list.dropDownValues?.map((values, index) => (
              <View
                style={[GenericListStyles.accordinView, accordinView]}
                key={index}>
                <Text
                  style={[GenericListStyles.accordinText, accordinText]}
                  accessibilityLabel={t(values.title)}
                  accessibilityHint={t(`label ${values.title}`)}>
                  {t(values.title)}
                </Text>
                <TextInput
                  accessibilityLabel={t('Text input')}
                  accessibilityHint={t(
                    `Text Input Field named ${values.title}`,
                  )}
                  value={inputValues[list.id]?.[values.title] || ''}
                  onChangeText={text =>
                    handleInputValues(list.id, text, values.title)
                  }
                  editable={
                    checkBoxRequired
                      ? !!checkedItems[list.id] && values.editable
                      : values.editable
                  }
                  style={[
                    GenericListStyles.inputStyle,
                    {
                      backgroundColor: checkBoxRequired
                        ? checkedItems[list.id] && values.editable
                          ? 'white'
                          : '#E2DFDF'
                        : values.editable
                        ? 'white'
                        : '#E2DFDF',
                    },
                  ]}
                />
              </View>
            ))}
          </Collapsible>
        </View>
      ))}
    </View>
  );
}
