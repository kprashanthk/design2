import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StartScreen from '../../screens/StartScreen';
import LoginScreen from '../../screens/LoginScreen';
import ForgetPasswordScreen from '../../screens/ForgetPasswordScreen';
import ContactScreen from '../../screens/ContactScreen';

const Stack = createNativeStackNavigator();

export default function LoginStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Start Page"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login Page" component={LoginScreen} />
      <Stack.Screen name="Start Page" component={StartScreen} />
      <Stack.Screen name="Forget Password" component={ForgetPasswordScreen} />
      <Stack.Screen name="Contact Us" component={ContactScreen} />
    </Stack.Navigator>
  );
}
