// import React, {useState} from 'react';
// import {useTranslation} from 'react-i18next';
// import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {Colors} from '../../assets/colors/colors';
// import {Fonts} from '../../assets/colors/fonts';

// interface CustomMenuItemProps {
//   item: any;
//   navigation: any;
//   expandedItem: string | null;
//   setExpandedItem: (itemName: string) => void;
// }

// const CustomMenuItem: React.FC<CustomMenuItemProps> = ({
//   item,
//   navigation,
//   expandedItem,
//   setExpandedItem,
// }) => {
//   const isExpanded = expandedItem === item.name;
//   // const [isExpanded, setExpanded] = useState(false);

//   const {t} = useTranslation();

//   const toggleExpand = () => {
//     if (item.expandable) {
//       setExpandedItem(isExpanded ? '' : item.name); // Toggle the expand/collapse
//     } else if (item.route) {
//       navigation.navigate(item.route);
//     }
//   };

//   const renderIcon = () => {
//     if (item.expandable) {
//       return isExpanded ? (
//         <Icon name="chevron-down" size={25} color={'#000000'} />
//       ) : (
//         <Icon name="chevron-up" size={25} color={'#000000'} />
//       );
//     }
//     return null;
//   };

//   return (
//     <View style={{flex: 1}}>
//       <TouchableOpacity onPress={toggleExpand} hitSlop={{top: 10, bottom: 10}}>
//         <View style={{flexDirection: 'row'}}>
//           <View style={styles.menuContainer}>
//             <View style={styles.box}>
//               {item.name === 'Logout' ? (
//                 <Text
//                   style={[styles.textStyle, {color: 'red', paddingBottom: 50}]}>
//                   {t(item.name)}
//                 </Text>
//               ) : (
//                 <Text style={styles.textStyle}>{t(item.name)}</Text>
//               )}
//             </View>
//             <View style={styles.box}>{renderIcon()}</View>
//           </View>
//         </View>
//         <View style={styles.divider}></View>
//       </TouchableOpacity>

//       {isExpanded && item.children && (
//         <View style={{marginLeft: 20}}>
//           {item.children.map((child: any, index: any) => (
//             <CustomMenuItem
//               key={index}
//               item={child}
//               navigation={navigation}
//               expandedItem={expandedItem}
//               setExpandedItem={setExpandedItem}
//             />
//           ))}
//         </View>
//       )}
//     </View>
//   );
// };

// export default CustomMenuItem;

// const styles = StyleSheet.create({
//   text: {
//     fontFamily: Fonts.notoSans,
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   imageContainer: {
//     width: 80,
//     height: 80,
//     overflow: 'hidden',
//     borderRadius: 40,
//   },
//   image1: {
//     width: 35,
//     height: 35,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.2)',
//     marginVertical: 10,
//     marginLeft: 20,
//   },
//   textStyle: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     color: '#000000',
//     fontFamily: Fonts.notoSans,
//   },
//   menuContainer: {
//     margin: 10,
//     marginLeft: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   box: {
//     marginRight: 15,
//     alignItems: 'center',
//   },
// });

// import React from 'react';
// import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {useTranslation} from 'react-i18next';
// import {Fonts} from '../../assets/colors/fonts';

// interface CustomMenuItemProps {
//   item: any;
//   navigation: any;
//   expandedItems: {[key: string]: boolean};
//   setExpandedItems: (itemName: string) => void;
// }

// const CustomMenuItem: React.FC<CustomMenuItemProps> = ({
//   item,
//   navigation,
//   expandedItems,
//   setExpandedItems,
// }) => {
//   const {t} = useTranslation();
//   const isExpanded = !!expandedItems[item.name];

//   const toggleExpand = () => {
//     if (item.expandable) {
//       setExpandedItems(item.name);
//     } else if (item.route) {
//       navigation.navigate(item.route);
//     }
//   };

//   return (
//     <View>
//       <TouchableOpacity
//         onPress={toggleExpand}
//         style={styles.menuItemContainer}
//         hitSlop={{top: 10, bottom: 10}}>
//         <Text
//           style={[styles.menuText, item.name === 'Logout' && {color: 'red'}]}>
//           {t(item.name)}
//         </Text>
//         {item.expandable && (
//           <Icon
//             name={isExpanded ? 'chevron-down' : 'chevron-forward'}
//             size={25}
//             color="#000"
//           />
//         )}
//       </TouchableOpacity>
//       {isExpanded &&
//         item.children &&
//         item.children.map((child: any, index: number) => (
//           <View key={index} style={styles.childContainer}>
//             <CustomMenuItem
//               item={child}
//               navigation={navigation}
//               expandedItems={expandedItems}
//               setExpandedItems={setExpandedItems}
//             />
//           </View>
//         ))}
//     </View>
//   );
// };

// export default CustomMenuItem;

// const styles = StyleSheet.create({
//   menuItemContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//   },
//   menuText: {
//     fontSize: 16,
//     fontWeight: '500',
//     fontFamily: Fonts.notoSans,
//     color: '#000',
//   },
//   childContainer: {
//     marginLeft: 20,
//     marginVertical: 5,
//   },
// });

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {Fonts} from '../../assets/colors/fonts';

interface CustomMenuItemProps {
  item: any;
  navigation: any;
  expandedItems: {[key: string]: boolean};
  setExpandedItems: (itemName: string) => void;
  isLastItem?: boolean;
}

const CustomMenuItem: React.FC<CustomMenuItemProps> = ({
  item,
  navigation,
  expandedItems,
  setExpandedItems,
  isLastItem = false,
}) => {
  const {t} = useTranslation();
  const isExpanded = !!expandedItems[item.name];

  const toggleExpand = () => {
    if (item.expandable) {
      setExpandedItems(item.name);
    } else if (item.route) {
      navigation.navigate(item.route);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={toggleExpand}
        style={styles.menuItemContainer}
        hitSlop={{top: 10, bottom: 10}}>
        <Text
          style={[
            styles.menuText,
            item.name === 'Logout' && {color: 'red', paddingBottom: 50},
          ]}>
          {t(item.name)}
        </Text>
        {item.expandable && (
          <Icon
            name={isExpanded ? 'chevron-down' : 'chevron-forward'}
            size={25}
            color="#000"
          />
        )}
      </TouchableOpacity>
      {/* <View style={styles.divider} /> */}

      {isExpanded &&
        item.children &&
        item.children.map((child: any, index: number) => (
          <View key={index} style={styles.childContainer}>
            <CustomMenuItem
              item={child}
              navigation={navigation}
              expandedItems={expandedItems}
              setExpandedItems={setExpandedItems}
              isLastItem={index === item.children.length - 1}
            />
          </View>
        ))}
      {/* {!isLastItem && } */}
    </View>
  );
};

export default CustomMenuItem;

const styles = StyleSheet.create({
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: Fonts.notoSans,
    color: '#000',
  },
  childContainer: {
    marginLeft: 20,
    marginVertical: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 20,
    marginVertical: 5,
  },
});
