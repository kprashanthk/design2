import {StyleSheet} from 'react-native';
import {Colors} from '../assets/colors/colors';
import {Fonts} from '../assets/colors/fonts';

export const GenericInputFieldStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 30,
    fontFamily: Fonts.regularFamily,
},
  buttonContainer: {
    width: '100%',
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 2.5},
    shadowOpacity: 0.7,
    shadowRadius: 5,
    borderRadius: 10,
    fontFamily: Fonts.regularFamily,
  },
});
export const GenericModalStyles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    maxHeight: '80%',
    width: '90%',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,56,49,255)',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyles: {
    fontFamily: Fonts.boldFamily,
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export const GenericDropDownStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 30,
    zIndex: 1,
  },

  items: {
    // width: '100%',
    justifyContent: 'center',
    // marginTop:10
  },
  menuItemsContainer: {
    width: '100%',
  },
});

export const GenericPasswordFieldStyles = StyleSheet.create({
  container: {
    flex: 1,

    paddingVertical: 8,
    borderRadius: 30,
  },
});

export const GenericButtonStyles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000000',
  },
  button: {
    justifyContent: 'center',
    borderColor: 'black',
    width: '100%',
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 2.5},
    shadowOpacity: 0.7,
    shadowRadius: 5,
    borderRadius: 10,
  },
  labelStyle: {
    fontSize: 17,
    textAlign: 'center',
    flexWrap: 'wrap',
    width: '100%',
    fontFamily: Fonts.regularFamily,
  },
});

export const GenericCalenderFieldStyles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
});

export const GenericCheckBoxStyles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: Fonts.boldFamily,
    marginLeft: 10,
    color: Colors.mainColor,
  },
});

export const GenericToggleButtonStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  switchContainer: {
    transform: [{scale: 1.5}],
  },
});

export const GenericHeaderStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  headerText: {
    fontSize: 18,
    fontFamily: Fonts.boldFamily,
  },
  dividerContainer: {
    borderWidth: 1.5,
    borderColor: 'black',
  },
});

export const GenericAlertStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 250,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
  },
  successText: {
    marginVertical: 15,
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    fontFamily: Fonts.boldFamily,
  },
  okButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  okButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Fonts.boldFamily,
  },
});

export const GenericInputFieldStyles1 = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 30,
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 2.5},
    shadowOpacity: 0.7,
    shadowRadius: 5,
    borderRadius: 30,
  },
});

export const GenericListStyles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderColor: '#6e8797',
    borderWidth: 1.5,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  outerContainer: {
    paddingVertical: 10,
    width: '100%',
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    flex: 1,
    fontFamily: Fonts.regularFamily,
  },
  iconStyle: {
    marginLeft: 20,
  },
  collapsibleStyle: {
    padding: 10,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1.5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  accordinView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  accordinText: {
    fontSize: 15,
    fontFamily: Fonts.regularFamily,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  inputStyle: {
    borderColor: 'black',
    borderWidth: 1,
    width: '53%',
    padding: 5,
    height: 40,
  },
});

export const GenericQRGeneratorStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
