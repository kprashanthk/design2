import {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/Entypo';

type Props = {
  openCamera: boolean;
  setOpenCamera: React.Dispatch<React.SetStateAction<boolean>>;
  setScannedData: React.Dispatch<React.SetStateAction<any>>;
};

export default function GenericScanner({
  openCamera,
  setOpenCamera,
  setScannedData,
}: Props) {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes: Code[]) => {
      if (openCamera && codes.length > 0) {
        setScannedData(codes[0]);
        setOpenCamera(false);
      }
    },
  });
  if (device == null) {
    return (
      <View style={styles.container}>
        <Text>Camera Device Not Found</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>No camera access. Please enable camera permission.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {openCamera && (
        <View style={{flex: 1}}>
          <Camera
            style={StyleSheet.absoluteFill}
            codeScanner={codeScanner}
            device={device}
            isActive={openCamera}
          />
          <View style={styles.overlay}>
            <View style={styles.overlayTop} />
            <View style={styles.overlayMiddle}>
              <View style={styles.overlaySide} />
              <View style={styles.scannerFrame} />
              <View style={styles.overlaySide} />
            </View>
            <View style={styles.overlayBottom} />
            <Icon
              name="circle-with-cross"
              size={28}
              color="#8cbe67"
              style={styles.closeIcon}
              onPress={() => setOpenCamera(false)}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  overlayTop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  overlayMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 250,
  },
  overlaySide: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scannerFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#8cbe67',
    backgroundColor: 'transparent',
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  closeIcon: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 10,
  },
});
