/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, PermissionsAndroid,
  Platform,
  useColorScheme,
  View,
  Button
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

// import { Picker } from '@react-native-picker/picker';

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalculatorApp from './components/calculator';
// import MyCarousel from './components/a';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import CarouselCards from './components/weather';
import MyCarouselCards from './components/test'

const Stack = createNativeStackNavigator();
const App = () => {
 
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={CalculatorApp} />
        <Stack.Screen name="weather" component={MyCarouselCards}/>
      </Stack.Navigator>
    </NavigationContainer>
    </>
  )
};



export default App;
