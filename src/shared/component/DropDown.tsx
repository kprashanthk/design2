import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Menu, Portal, Modal, Button } from 'react-native-paper';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false); // Controls the Modal visibility
  const [menuVisible, setMenuVisible] = useState(false); // Controls the Menu visibility
  const [selectedValue, setSelectedValue] = useState('');
  const [items] = useState(['Option 1', 'Option 2', 'Option 3', 'Option 4']);

  const handleMenuSelect = (item) => {
    setSelectedValue(item);
    setMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => setModalVisible(true)}>
        Open Modal
      </Button>

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContent}
        >
          <View>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <TextInput
                  label="Dropdown"
                  value={selectedValue}
                  onFocus={() => setMenuVisible(true)}
                  showSoftInputOnFocus={false} // Prevents keyboard appearance
                  style={styles.input}
                />
              }
            >
              {items.map((item, index) => (
                <Menu.Item
                  key={index}
                  onPress={() => handleMenuSelect(item)}
                  title={item}
                />
              ))}
            </Menu>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: 'white',
    marginTop: 10,
  },
});
