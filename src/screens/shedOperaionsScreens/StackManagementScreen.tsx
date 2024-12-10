import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from '../../assets/stack.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';
import ToolTipStack from '../../formComponents/shedOperations/ToolTipStack';
import ModalWithColors from '../../formComponents/shedOperations/ModalWithColors';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTranslation} from 'react-i18next';
import {StackData} from '../../data';
import {Colors} from '../../assets/colors/colors';
import {Fonts} from '../../assets/colors/fonts';

const StackManagementScreen = () => {
  const {width} = useWindowDimensions();

  const navigation = useNavigation();

  const [openToolTip, setOpenToolTip] = useState<boolean>(false);
  const [toolTipData, setToolTipData] = useState<{}>({});

  const {t} = useTranslation();

  const openDrawer = () => {
    navigation.navigate('Sheds');
  };

  const route = useRoute();
  const id = route.params?.id;
  const stackCount = route.params?.stackCount;

  const data = Array.from({length: stackCount}, (_, index) => ({
    id: StackData[index]?.id,
    values: StackData[index],
  }));

  const [openModalColor, setOpenModalColor] = useState<boolean>(false);

  const getColumn = () => {
    if (width < 360) return 2;
    else if (width >= 360 && width < 768) return 3;
    else if (width >= 768 && width < 1024) return 4;
    return 5;
  };

  function handleToolTip(item: any) {
    setOpenToolTip(true);
    setToolTipData(item);
    console.log(item);
  }

  const renderStackIcon = ({item, index}: {item: any; index: number}) => {
    const columnWidth = width / getColumn() - 20;
    const imageWidth = columnWidth * 0.8;

    return (
      <View
        style={[
          styles.shedContainer,
          {width: columnWidth, marginHorizontal: 10},
        ]}>
        <View style={[styles.cont, {padding: width < 768 ? 10 : 20}]}>
          <TouchableOpacity onPress={() => handleToolTip(item)}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 15,
                borderRadius: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon width={60} height={60} fill={item.values.color} />
            </View>

            <Text style={{textAlign: 'center'}}>Stack {index + 1}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* <Image
          source={require('../../assets/5.jpg')}
          style={styles.imageStyles}
        />
        <LinearGradient
          colors={['transparent', '#003831']}
          style={styles.gradientOverlay}
        /> */}
      </View>

      <View style={styles.menuContainer}></View>

      <View style={[styles.scrollableContainer]}>
        <View style={[styles.titleContainer]}>
          <TouchableOpacity
            onPress={openDrawer}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Ionicons
              name="arrow-back-circle-sharp"
              color="#006936"
              size={40}
            />
          </TouchableOpacity>
          <Text style={styles.titleStyles}>
            {t('Stacks in Shed')} {id}
          </Text>
          <TouchableOpacity
            onPress={() => setOpenModalColor(true)}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Entypo name="info-with-circle" size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.innerContainer}>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={renderStackIcon}
              contentContainerStyle={styles.flatlistContainer}
              numColumns={getColumn()}
              key={getColumn()}
            />
          </View>
        </ScrollView>
      </View>
      <ToolTipStack
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
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: '80%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyles: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.5,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  menuContainer: {
    position: 'absolute',
    top: 35,
    left: 20,
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
    borderRadius: 10,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  titleStyles: {
    fontFamily: Fonts.notoSans,
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: Colors.mainColor,
    textAlign: 'center',
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  flatlistContainer: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },
  shedContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  cont: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  wheatImage: {},
  iconContainer: {
    marginRight: 95,
    marginLeft: -100,
  },
  headerStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  title: {
    fontSize: 20,
    fontFamily: Fonts.notoSans,
  },
});

export default StackManagementScreen;
