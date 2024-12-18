import {Image, StyleSheet, View, Text} from 'react-native';
export default function WelcomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/2.png')}
          accessibilityLabel="Logo"
          accessible={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 350,
    height: 350,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'ffffff',
  },
});
