import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShedOperationsScreen from '../../screens/shedOperaionsScreens/ShedOperationsScreen';
import StackManagementScreen from '../../screens/shedOperaionsScreens/StackManagementScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Sheds" component={ShedOperationsScreen} />
      <Stack.Screen name="Stacks" component={StackManagementScreen} />
    </Stack.Navigator>
  );
}
