import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import CaptureInWeight from '../../formComponents/weightBridge/CaptureInWeight';
import GenericHeader from '../../shared/component/GenericHeader';
import GenericScanner from '../../shared/component/GenericScanner';

export default function InWeightScreen() {
  const [visible, setVisible] = useState<boolean>(false);
  const [scannedData, setScannedData] = useState<{}>({});

  if (visible) {
    return (
      <View style={{flex: 1}}>
        <GenericScanner
          openCamera={visible}
          setOpenCamera={setVisible}
          setScannedData={setScannedData}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <GenericHeader
          title="Capture In Weight"
          onPress={value => {
            setVisible(value);
          }}
          cameraVisible={visible}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={{flex: 1, padding: 10, marginTop: 5}}>
            <CaptureInWeight />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    position: 'absolute',
    top: '3%',
    left: '3%',
    right: '3%',
    bottom: '1%',
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 6,
    zIndex: 5,
  },
});
