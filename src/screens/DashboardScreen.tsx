import React from 'react';
import {
  ScrollView,
  Text,
  Dimensions,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {LineChart, BarChart} from 'react-native-gifted-charts';

import {Colors} from '../assets/colors/colors';
import {Fonts} from '../assets/colors/fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';
import {DrawerActions, useNavigation} from '@react-navigation/native';

const Dashboard = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const screenWidth = Dimensions.get('window').width;

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const lineChartData = [
    {value: 20, label: 'January'},
    {value: 45, label: 'February'},
    {value: 28, label: 'March'},
    {value: 80, label: 'April'},
    {value: 99, label: 'May'},
  ];

  const barChartData = [
    {value: 50, label: 'January'},
    {value: 20, label: 'February'},
    {value: 2, label: 'March'},
    {value: 86, label: 'April'},
    {value: 30, label: 'May'},
  ];

  const pieChartData = [
    {
      name: t('Wheat'),
      population: 21500000,
      color: Colors.mainColor,
      legendFontColor: '#000000',
      legendFontSize: 15,
    },
    {
      name: t('Others'),
      population: 9800000,
      color: Colors.themeColor,
      legendFontColor: '#000000',
      legendFontSize: 15,
    },
    {
      name: t('Raw Rice'),
      population: 30000000,
      color: Colors.orange,
      legendFontColor: '#000000',
      legendFontSize: 15,
    },
    {
      name: t('Paddy'),
      population: 32000000,
      color: 'yellow',
      legendFontColor: '#000000',
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            onPress={openDrawer}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            style={styles.menuIconContainer}>
            <Icon name="menu" color={Colors.mainColor} size={30} />
          </TouchableOpacity>
          <Text style={styles.titleStyles}>{t('Dashboard')}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.chartTextStyles}>{t('Sales')}</Text>
          <LineChart
            data={lineChartData}
            width={screenWidth - 70}
            height={220}
            chartConfig={{
              backgroundColor: Colors.backgroundColor,
              backgroundGradientFrom: Colors.backgroundColor,
              backgroundGradientTo: Colors.backgroundColor,
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: Colors.orange,
              },
            }}
            bezier
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.chartTextStyles}>{t('Labour Activiy')}</Text>

          <BarChart
            data={barChartData}
            width={screenWidth - 70}
            height={220}
            chartConfig={{
              backgroundColor: Colors.backgroundColor,
              backgroundGradientFrom: Colors.backgroundColor,
              backgroundGradientTo: Colors.backgroundColor,
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              axisLabelColor: Colors.mainColor, 
              yAxisLabel: 'Month',
              yAxisSuffix: '', 
              xAxisLabel: 'Month', 
              xAxisFontSize: 12,
              yAxisFontSize: 12,
            }}
            verticalLabelRotation={30} 
          />
        </View>

        <View style={[styles.card]}>
          <Text style={styles.chartTextStyles}>{t('Commodity')}</Text>
          <PieChart
            data={pieChartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: Colors.backgroundColor,
              backgroundGradientFrom: Colors.backgroundColor,
              backgroundGradientTo: Colors.backgroundColor,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.newColor,
  },
  titleContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 50,
  },
  menuIconContainer: {
    position: 'absolute',
    left: 30,
    zIndex: 1,
  },
  titleStyles: {
    fontFamily: Fonts.boldFamily,
    fontSize: 30,
    color: Colors.mainColor,
    textAlign: 'center',
  },
  card: {
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 6,
    marginVertical: 10,
  },
  chartTextStyles: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
    color: Colors.mainColor,
    fontFamily: Fonts.boldFamily,
  },
});

export default Dashboard;

