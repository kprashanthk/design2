// import React, {useState} from 'react';
// import {View, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
// import {TextInput, Menu} from 'react-native-paper';
// import {
//   GenericDropDownStyles,
//   GenericInputFieldStyles,
// } from '../../styles/styles';
// import {useTranslation} from 'react-i18next';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// interface Option {
//   title: string;
//   value: string;
// }

// type Props = {
//   Options: Option[];
//   containerStyles?: StyleProp<ViewStyle>;
//   itemsStyles?: StyleProp<ViewStyle>;
//   label: string;
//   buttonContainerStyles?: StyleProp<ViewStyle>;
//   icon?: string;
//   editable?: boolean;
//   setSearch?: React.Dispatch<React.SetStateAction<Option[]>>;
//   setValue?: React.Dispatch<React.SetStateAction<string>>;
// };

// export default function GenericDropDown({
//   Options,
//   containerStyles,
//   itemsStyles,
//   label,
//   buttonContainerStyles,
//   icon = 'menu-down',
//   editable,
//   setSearch,
//   setValue,
// }: Props) {
//   const [selected, setSelected] = useState<string>('');
//   const [visible, setVisible] = useState<boolean>(false);
//   const [searchedValue, setSearchedValue] = useState<Option[]>(Options);
//   const {t} = useTranslation();

//   const openMenuHandler = () => setVisible(true);
//   const closeMenuHandler = () => setVisible(false);

//   const selectValueHandler = (value: string) => {
//     setSelected(value);
//     setValue?.(value);
//     closeMenuHandler();

//     if (editable) {
//       if (value === 'All') {
//         setSearch?.(Options);
//       } else {
//         const filtered = Options.filter(option => option.title === value);
//         setSearch?.(filtered);
//       }
//     }
//   };

//   const changeTextHandler = (value: string) => {
//     setSelected(value);
//     const filtered = Options.filter(option =>
//       option.title.toLowerCase().includes(value.toLowerCase()),
//     );
//     setSearchedValue(filtered);
//   };

//   return (
//     <View style={[GenericDropDownStyles.container, containerStyles]}>
//       <Menu
//         visible={visible}
//         onDismiss={closeMenuHandler}
//         anchor={
//           <TextInput
//             label={t(label)}
//             value={selected}
//             style={[
//               GenericInputFieldStyles.buttonContainer,
//               buttonContainerStyles,
//               {paddingHorizontal: 10},
//             ]}
//             editable={!editable}
//             showSoftInputOnFocus={false}
//             onFocus={openMenuHandler}
//             right={
//               <TextInput.Icon
//                 icon={() => (
//                   <View>
//                     <TouchableOpacity
//                       onPress={openMenuHandler}
//                       hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
//                       style={{justifyContent: 'center', alignItems: 'center'}}>
//                       <MaterialCommunityIcons
//                         name={icon}
//                         color="#003831"
//                         size={24}
//                       />
//                     </TouchableOpacity>
//                   </View>
//                 )}
//               />
//             }
//             placeholderTextColor="#003831"
//             textColor="black"
//             theme={{
//               roundness: 10,
//               colors: {
//                 primary: '#003831',
//                 accent: '#003831',
//               },
//             }}
//             outlineColor="#003831"
//             onChangeText={changeTextHandler}
//           />
//         }
//         contentStyle={{backgroundColor: '#003831'}}
//         style={[
//           GenericDropDownStyles.items,
//           {position: 'absolute', marginTop: 50},
//         ]}>
//         {editable && (
//           <Menu.Item
//             key="all"
//             title="All"
//             onPress={() => selectValueHandler('All')}
//             titleStyle={{color: 'white'}}
//           />
//         )}
//         {searchedValue.map((item, index) => (
//           <Menu.Item
//             key={index}
//             title={item.title}
//             onPress={() => selectValueHandler(item.title)}
//             titleStyle={{color: 'white'}}
//           />
//         ))}
//       </Menu>
//     </View>
//   );
// }
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {TextInput, Menu, Portal} from 'react-native-paper';
import {
  GenericDropDownStyles,
  GenericInputFieldStyles,
} from '../../styles/styles';
import {useTranslation} from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../assets/colors/colors';

// interface Option {
//   title: string;
//   value: string;
// }

// type Props = {
//   Options: any[];
//   containerStyles?: StyleProp<ViewStyle>;
//   itemsStyles?: StyleProp<ViewStyle>;
//   label: string;
//   buttonContainerStyles?: StyleProp<ViewStyle>;
//   icon?: string;
//   editable?: boolean;
//   setSearch?: React.Dispatch<React.SetStateAction<any[]>>;
//   setValue?: React.Dispatch<React.SetStateAction<string>>;
// };

// export default function GenericDropDown({
//   Options,
//   containerStyles,
//   itemsStyles,
//   label,
//   buttonContainerStyles,
//   icon = 'menu-down',
//   editable,
//   setSearch,
//   setValue,
//   ...rest
// }: Props) {
//   const options: any[] = Options;

//   const [selected, setSelected] = useState<string>('');
//   const [visible, setVisible] = useState<boolean>(false);
//   const [searchedValue, setSearchedValue] = useState<Option[]>(options);
//   const {t} = useTranslation();

//   function openMenuHandler(): void {
//     setVisible(true);
//   }

//   function closeMenuHandler(): void {
//     setVisible(false);
//   }

//   function selectValueHandler(value: string): void {
//     if (editable) {
//       if (value === 'All') {
//         setValue?.(value);
//         setSelected(value);
//         setSearch?.(options);
//         closeMenuHandler();
//         return;
//       }
//       const filter = options.filter(option => option.title === value);
//       if (filter && setSearch) {
//         setValue?.(value);
//         setSelected(value);
//         setSearch(filter);
//         closeMenuHandler();
//         return;
//       }
//     }

//     const selectedOption = options.find(option => option.title === value);
//     if (selectedOption) {
//       setSelected(selectedOption.title);
//       setValue?.(selectedOption.title);
//     }
//     closeMenuHandler();
//   }

//   function changeTextHandler(value: string): void {
//     setSelected(value);
//     const filter = options.filter(option =>
//       option.title.toLowerCase().includes(value.toLowerCase()),
//     );
//     setSearchedValue(filter);
//   }

//   return (
//     <View style={[GenericDropDownStyles.container, containerStyles]}>
//       <Portal.Host>
//         <Menu
//           visible={visible}
//           contentStyle={{backgroundColor: Colors.backgroundColor}}
//           onDismiss={closeMenuHandler}
//           style={[GenericDropDownStyles.items, {zIndex: 50, top: '100%'}]}
//           anchor={
//             <TextInput
//               // mode="outlined"
//               label={t(label)}
//               value={selected}
//               style={[
//                 GenericInputFieldStyles.buttonContainer,
//                 buttonContainerStyles,
//                 {paddingHorizontal: 10},
//               ]}
//               underlineColor="transparent"
//               editable={!editable}
//               right={
//                 <TextInput.Icon
//                   icon={icon}
//                   onPress={openMenuHandler}
//                   color={Colors.text}
//                 />
//               }
//               // right={
//               //   <TextInput.Icon
//               //     icon={() => (
//               //       <View>
//               //         <TouchableOpacity
//               //           onPress={openMenuHandler}
//               //           hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
//               //           style={{
//               //             justifyContent: 'center',
//               //             alignItems: 'center',
//               //           }}>
//               //           <MaterialCommunityIcons
//               //             name={icon}
//               //             color="#003831"
//               //             size={24}
//               //           />
//               //         </TouchableOpacity>
//               //       </View>
//               //     )}
//               //   />
//               // }
//               placeholderTextColor="#000000"
//               textColor="black"
//               theme={{
//                 roundness: 10,
//                 colors: {
//                   primary: Colors.text,
//                   onPrimary: '#000000',
//                   accent: '#000000',
//                   onSurfaceVariant: Colors.text,
//                 },
//               }}
//               // outlineColor="#003831"
//               onBlur={closeMenuHandler}
//               onFocus={openMenuHandler}
//               onChangeText={changeTextHandler}
//               {...rest}
//             />
//           }>
//           <View style={[{zIndex: 20}]}>
//             {editable && (
//               <Menu.Item
//                 style={{backgroundColor: Colors.backgroundColor}}
//                 key={'All'}
//                 onPress={() => selectValueHandler('All')}
//                 title={'All'}
//                 titleStyle={{color: 'white'}}
//               />
//             )}
//             {searchedValue.map(item => {
//               return (
//                 <Menu.Item
//                   style={{backgroundColor: Colors.backgroundColor}}
//                   key={item.title}
//                   onPress={() => selectValueHandler(item.title)}
//                   title={item.title}
//                   titleStyle={{color: 'white'}}
//                 />
//               );
//             })}
//           </View>
//         </Menu>
//       </Portal.Host>
//     </View>
//   );
// }
interface Option {
  title: string;
  value: string;
}

type Props = {
  Options: Option[]; // Strict typing for options
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
              editable={editable} // Input editable state
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
                titleStyle={{color: 'white'}}
              />
            ))}
          </View>
        </Menu>
      </Portal.Host>
    </View>
  );
}
