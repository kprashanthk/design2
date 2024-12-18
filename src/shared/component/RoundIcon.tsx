import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../assets/colors/colors';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Fonts} from '../../assets/colors/fonts';
import {useNavigation} from '@react-navigation/native';

interface IconProps {
  label: string;
  library: string;
  name: string;
  size?: number;
  color?: string;
  //   onPress?: () => void;
  longPress?: () => void;
  route?: string;
  navigationList: Array<{name: string; route: string}>;
}

const RoundIcon: React.FC<IconProps> = ({
  library,
  name,
  size = 35,
  color = Colors.white,
  label,
  route = '',
  longPress,
  navigationList,
}) => {
  const {t} = useTranslation();
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const handleNavigation = (route: string) => {
    setMenuVisible(false);
    navigation.navigate(route);
    // Implement navigation logic here (e.g., use React Navigation's `navigate` method)
  };
  const handlePress = () => {
    navigation.navigate(route);
  };

  const renderIcon = () => {
    switch (library) {
      case 'FontAwesome':
        return <FontAwesome name={name} size={size} color={color} />;
      case 'MaterialIcons':
        return <MaterialIcons name={name} size={size} color={color} />;
      case 'Ionicons':
        return <Ionicons name={name} size={size} color={color} />;
      case 'FontAwesome6':
        return <FontAwesome6 name={name} size={size} color={color} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={name} size={size} color={color} />;
      default:
        return null;
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.outerContainer}>
        <View >
          <TouchableOpacity
            onPress={handlePress}
            onLongPress={() => setMenuVisible(true)}>
            <View style={styles.innerContainer}>{renderIcon()}</View>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.textStyle}>{t(label)}</Text>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.navigateText}>{t('Navigate To')}</Text>

            <FlatList
              data={navigationList}
              keyExtractor={item => item.route}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleNavigation(item.route)}>
                  <Text style={styles.menuText}>{t(item.name)}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default RoundIcon;

const styles = StyleSheet.create({
  outerContainer: {
    width: 100,
    height: 100,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: Colors.newColor,
    // padding: 5,
  },
  innerContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#006536',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 5,
  },
  textStyle: {
    fontFamily: Fonts.semiBoldFamiy,
    textAlign: 'center',
    // marginTop: 10,
    fontSize: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 20,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
    fontFamily: Fonts.regularFamily,
    color: '#333',
  },
  navigateText: {
    fontFamily: Fonts.boldFamily,
  },
});
