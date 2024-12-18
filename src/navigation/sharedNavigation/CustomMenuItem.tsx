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
    fontSize: 16,
    fontFamily: Fonts.mediumFamily,
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
