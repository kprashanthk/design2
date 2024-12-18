import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {View} from 'react-native';

export default function Logout() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.navigate('Login');
  });

  return <View></View>;
}
