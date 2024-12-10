// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   useWindowDimensions,
// } from 'react-native';
// import {useTranslation} from 'react-i18next';
// import CustomMenuItem from './CustomMenuItem';
// import {MENU_ITEMS} from './Menu';
// import {Colors} from '../../assets/colors/colors';
// import {Fonts} from '../../assets/colors/fonts';

// interface CustomSideNavigationProps {
//   navigation: any;
// }

// const CustomSideNavigation: React.FC<CustomSideNavigationProps> = ({
//   navigation,
// }) => {
//   const {height, width} = useWindowDimensions();
//   const {t} = useTranslation();
//   const [expandedItem, setExpandedItem] = useState<string | null>(null);

//   const handleToggleExpand = (itemName: string) => {
//     setExpandedItem(expandedItem === itemName ? null : itemName);
//   };

//   return (
//     <View style={styles.drawerColor}>
//       {/* Static header and background */}
//       <View style={styles.headerContainer}>
//         <View style={styles.imageContainer}>
//           <Image
//             source={require('../../assets/2.png')}
//             style={styles.headerImage}
//           />
//         </View>
//         <Text style={styles.headerText}>{t('Anna Darpan')}</Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.menuContainer}>
//         {MENU_ITEMS.map((item, index) => (
//           <CustomMenuItem
//             key={index}
//             item={item}
//             navigation={navigation}
//             expandedItem={expandedItem}
//             setExpandedItem={handleToggleExpand}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default CustomSideNavigation;

// const styles = StyleSheet.create({
//   drawerColor: {
//     backgroundColor: '#FFFFFF',
//     flex: 1,
//   },
//   menuContainer: {
//     marginTop: 20,
//     marginBottom: 50,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: Colors.mainColor,
//   },
//   headerImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 25,
//   },
//   headerText: {
//     fontFamily: Fonts.notoSans,
//     fontSize: 22,
//     fontWeight: 'bold',
//     letterSpacing: 1.5,
//     color: '#e6eceb',
//     textShadowColor: 'black',
//     textShadowRadius: 1.5,
//     textShadowOffset: {width: 0.5, height: 0.5},
//     marginLeft: 20,
//     flexShrink: 1,
//   },
//   imageContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     elevation: 10,
//     shadowColor: 'black',
//     shadowOffset: {width: 1, height: 1},
//     shadowOpacity: 0.7,
//     shadowRadius: 1,
//   },
// });

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import CustomMenuItem from './CustomMenuItem';
import {MENU_ITEMS} from './Menu';
import {Colors} from '../../assets/colors/colors';
import {Fonts} from '../../assets/colors/fonts';

interface CustomSideNavigationProps {
  navigation: any;
}

const CustomSideNavigation: React.FC<CustomSideNavigationProps> = ({
  navigation,
}) => {
  const {height, width} = useWindowDimensions();
  const {t} = useTranslation();
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>(
    {},
  );

  const handleToggleExpand = (itemName: string) => {
    setExpandedItems(prevState => ({
      ...prevState,
      [itemName]: !prevState[itemName],
    }));
  };

  return (
    <View style={styles.drawerColor}>
      {/* Static header and background */}
      <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/2.png')}
            style={styles.headerImage}
          />
        </View>
        <Text style={styles.headerText}>{t('Anna Darpan')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.menuContainer}>
        {MENU_ITEMS.map((item, index) => (
          <CustomMenuItem
            key={index}
            item={item}
            navigation={navigation}
            expandedItems={expandedItems}
            setExpandedItems={handleToggleExpand}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CustomSideNavigation;

const styles = StyleSheet.create({
  drawerColor: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  menuContainer: {
    marginTop: 20,
    marginBottom: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.mainColor,
  },
  headerImage: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  headerText: {
    fontFamily: Fonts.notoSans,
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    color: '#e6eceb',
    textShadowColor: 'black',
    textShadowRadius: 1.5,
    textShadowOffset: {width: 0.5, height: 0.5},
    marginLeft: 20,
    flexShrink: 1,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.7,
    shadowRadius: 1,
  },
});
