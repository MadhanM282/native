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
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Geolocation from '@react-native-community/geolocation';
import { SelectListBox } from './components/select';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [Climate, SetClimate] = useState({})
  const [ClimateStatus, SetClimateStatus] = useState(false)

  const [value, SetValue] = useState("")

  const [Sum, SetSum] = useState(0)

  const [History, SetHistory] = useState("")

  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState('...');
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState('...');
  const [
    locationStatus,
    setLocationStatus
  ] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        // subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            // subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();

  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');

    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');

        const currentLongitude = JSON.stringify(position.coords.longitude);

        const currentLatitude = JSON.stringify(position.coords.latitude);

        setCurrentLongitude(currentLongitude);

        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
        console.log(error)
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
      setTimeout(() => {
        GetWeather()
      }, 1000)
    );
  };

  const GetWeather = async () => {
    try {
      // console.log(currentLatitude)
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=${"0d73de379dffe7d028b1d22e3459a4fc"}`)
      const data = await res.json()
      console.log(data)
      SetClimate(data)
      SetClimateStatus(true)
    } catch (error) {
      console.log("error", error.message)
    }
  }


  const HandelClick = (e) => {
    SetValue(value + e._dispatchInstances.memoizedProps.children)
  }
  const HandelAdd = () => {
    SetSum(Sum + Number(value))
    SetHistory(History + "+" + value)
    SetValue("")
  }
  const HandelSub = () => {
    SetSum(Sum - Number(value))
    SetHistory(History + "-" + value)
    SetValue("")
  }
  const HandelMul = () => {
    SetSum(Sum * Number(value))
    SetHistory(History + "*" + value)
    SetValue("")
  }
  const HandelDiv = () => {
    SetSum(Sum / Number(value))
    SetHistory(History + "/" + value)
    SetValue("")
  }
  const HandelMod = () => {
    SetSum(Sum % Number(value))
    SetHistory(History + "%" + value)
    SetValue("")
  }
  const styles = StyleSheet.create({

    containor: {
      backgroundColor: "black"
    },
    text: {
      fontSize: 40,
      textAlign: "center",
      color: "white"
    },
    result: {
      fontSize: 40,
      textAlign: "right",
      color: "white",
      marginRight: 40
    },
    flex: {
      flexDirection: "row",
    },
    buttons: {
      flexDirection: "row",
    },
    textStyle: {
      color: "white",
      margin: 10,
      padding: 43,
      paddingTop: 35,
      paddingBottom: 35,
      fontSize: 30,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: "white",
      borderRadius: 20,
      textAlign: "center",
    },
    SpecialButtons: {
      color: "white",
      margin: 10,
      padding: 43,
      paddingTop: 35,
      paddingBottom: 35,
      fontSize: 30,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: "orange",
      borderRadius: 50,
      textAlign: "center",
      backgroundColor: "orange",
      shadowColor: '#d3dbeb',
      elevation: 10,
    },
    ValueEntered: {
      marginTop: 275

    }
  });

  const ClimateStyles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: "red",
      borderRadius: 10,
      padding: 10
    },
    Text: {
      fontSize: 20
    }
  })

  return (
    <View style={styles.containor}>
      <View>
        <SelectListBox />
      </View>
      {Climate.name ?
        <View style={ClimateStyles.container}>
          <Text style={ClimateStyles.Text}>City:- {Climate.name}</Text>
          <Text style={ClimateStyles.Text}>Temp:- {Math.floor(Climate.main.temp_max - 273.15)}°C</Text>
          <Text style={ClimateStyles.Text}>Pressure:- {Climate.main.pressure / 1000}-bar</Text>
          <Text style={ClimateStyles.Text}>Humidity:- {Climate.main.humidity}%</Text>
          <Text style={ClimateStyles.Text}>WindSpeed:- {Climate.wind.speed}M/S</Text>
        </View>
        : ""}
      <View>
        <Text style={styles.result}>{Sum}</Text>
        <SafeAreaView>
          <ScrollView>
            <Text style={styles.text}>{History}</Text>
          </ScrollView>
        </SafeAreaView>
      </View>
      <View style={styles.ValueEntered}>
        <Text style={styles.text}>{value}</Text>
      </View>
      <View style={styles.buttons}>
        <Text onPress={(e) => HandelAdd()} style={styles.SpecialButtons}>+</Text>
        <Text onPress={(e) => HandelSub()} style={styles.SpecialButtons}>-</Text>
        <Text onPress={(e) => HandelMul()} style={styles.SpecialButtons}>*</Text>
        <Text style={styles.SpecialButtons} onPress={(e) => {
          SetSum(0)
          SetHistory("")
        }} >C</Text>
      </View>
      <View style={styles.flex}>
        <View>
          <Text onPress={(e) => HandelClick(e)} style={styles.textStyle}>1</Text>
          <Text onPress={(e) => HandelClick(e)} style={styles.textStyle}>4</Text>
          <Text onPress={(e) => HandelClick(e)} style={styles.textStyle}>7</Text>
        </View>
        <View>
          <Text onPress={(e) => HandelClick(e)} style={styles.textStyle}>2</Text>
          <Text onPress={(e) => HandelClick(e)} style={styles.textStyle}>5</Text>
          <Text onPress={(e) => HandelClick(e)} style={styles.textStyle}>8</Text>
        </View>
        <View>
          <Text onPress={(e) => HandelClick(e)} style={styles.textStyle}>3</Text>
          <Text onPress={(e) => HandelClick(e)} style={styles.textStyle}>6</Text>
          <Text onPress={(e) => HandelClick(e)} style={styles.textStyle}>9</Text>
        </View>
        <View>
          <Text style={styles.SpecialButtons} onPress={(e) => HandelDiv()}>/</Text>
          <Text style={styles.SpecialButtons} onPress={(e) => HandelMod()}>%</Text>
          <Text onPress={(e) => HandelClick(e)} style={styles.textStyle}>0</Text>
        </View>
      </View>
    </View>
  );
};



export default App;
