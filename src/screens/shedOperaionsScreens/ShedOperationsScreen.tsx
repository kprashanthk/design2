import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';
import GenericToolTip from '../../shared/component/GenericToolTip';
import ModalWithColors from '../../formComponents/shedOperations/ModalWithColors';
import {useTranslation} from 'react-i18next';
import {ShedData1} from '../../data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../assets/colors/colors';
import {Fonts} from '../../assets/colors/fonts';

interface shedItem {
  id: string;
  title: string;
  iconName: string;
  progress: number;
  stackCount: number;
  color: string;
}

const ShedOperationsScreen = () => {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.navigate('Storage');
  };
  const {width} = useWindowDimensions();

  const [openToolTip, setOpenToolTip] = useState<boolean>(false);
  const [toolTipData, setToolTipData] = useState<{}>({});

  const getColumn = () => {
    if (width < 360) {
      return 2;
    } else if (width >= 360 && width < 768) {
      return 3;
    } else if (width >= 768 && width < 1024) {
      return 5;
    } else return 6;
  };

  function handleToolTip(item: any) {
    setOpenToolTip(true);
    setToolTipData(item);
  }

  const {t} = useTranslation();

  const [openModalColor, setOpenModalColor] = useState<boolean>(false);

  const handleStackItem = (item: shedItem) =>
    navigation.navigate('Stacks', {id: item.id, stackCount: item.stackCount});

  const handleShed = ({item}: {item: shedItem}) => {
    const columnWidth = width / getColumn() - 20;
    return (
      <View
        style={[
          styles.shedContainer,
          {width: columnWidth},
          {marginHorizontal: width < 768 ? 1 : 5},
        ]}>
        <Pressable
          onPress={() => handleStackItem(item)}
          onLongPress={() => handleToolTip(item)}>
          <View style={[styles.cont, {padding: width < 768 ? 10 : 20}]}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 15,
                borderRadius: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome5 name={item.iconName} color={item.color} size={35} />
            </View>

            <Text style={{fontFamily: Fonts.regularFamily}}>{item.title}</Text>
            <Progress.Bar
              progress={item.progress}
              width={100}
              color="#003831"
            />
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <View style={styles.container}>

      <View style={[styles.scrollableContainer]}>
        <View
          style={[
            styles.titleContainer,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            },
          ]}>
          <View style={{marginLeft: 30, zIndex: 20}}>
            <TouchableOpacity
              onPress={openDrawer}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Ionicons
                name="arrow-back-circle-sharp"
                color={Colors.mainColor}
                size={40}
              />
            </TouchableOpacity>
          </View>

          <Text style={[styles.titleStyles, {flex: 1, textAlign: 'center'}]}>
            {t('Sheds')}
          </Text>
          <TouchableOpacity
            onPress={() => setOpenModalColor(true)}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <Entypo name="info-with-circle" size={20} style={{right: 20}} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.innerContainer}>
            <FlatList
              data={ShedData1}
              keyExtractor={item => item.id}
              renderItem={handleShed}
              contentContainerStyle={styles.flatlistContainer}
              numColumns={getColumn()}
              key={getColumn()}
            />
          </View>
        </ScrollView>
      </View>
      <GenericToolTip
        visible={openToolTip}
        setValue={setOpenToolTip}
        item={toolTipData}
      />
      <ModalWithColors visible={openModalColor} setValue={setOpenModalColor} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    top: 36,
    left: 25,
    zIndex: 20,
  },
  scrollableContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  titleStyles: {
    fontFamily: Fonts.boldFamily,
    fontSize: 30,
    color: Colors.mainColor,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    fontFamily: Fonts.regularFamily,
  },
  flatlistContainer: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },
  shedContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginRight: 10,
  },
  cont: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 23,
  },
});

export default ShedOperationsScreen;
