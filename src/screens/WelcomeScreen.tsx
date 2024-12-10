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
          style={styles.imageStyles}
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

  // imageContainer: {
  //   width: '100%',
  //   height: 400,
  //   borderBottomLeftRadius: 25,
  //   borderBottomRightRadius: 25,
  //   overflow: 'hidden',
  // },
  // imageStyles: {
  //   width: '100%',
  //   height: '100%',
  //   resizeMode: 'cover',
  //   opacity: 0.8,
  // },
});
