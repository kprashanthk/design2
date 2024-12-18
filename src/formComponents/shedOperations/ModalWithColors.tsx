import React from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {colorsTypeData} from '../../data';
import {Fonts} from '../../assets/colors/fonts';
type Props = {
  visible: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalWithColors = ({visible, setValue}: Props) => {
  const handleOutsideClick = () => {
    setValue(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleOutsideClick}>
      <TouchableWithoutFeedback onPress={handleOutsideClick}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalView}>
              <FlatList
                data={colorsTypeData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View style={styles.itemContainer}>
                    <View
                      style={[styles.circle, {backgroundColor: item.colors}]}
                    />
                    <Text style={styles.text}>{item.value}</Text>
                  </View>
                )}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 15,
  },
  text: {
    fontSize: 16,
    color: '#000',
    fontFamily: Fonts.regularFamily,
  },
});

export default ModalWithColors;
