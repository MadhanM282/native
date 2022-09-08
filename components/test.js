import React, { useRef, useState, useEffect } from 'react';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

const Cities = ["Bengaluru", "chennai", "delhi", "mumbai", "Jammu and Kashmir", "Pune", "visakhapatnam", "goa", "kanyakumari", "Ooty", "kerala"]

const { width: screenWidth } = Dimensions.get('window');

const MyCarouselCards = props => {

    const [AllCityes, SetAllCityes] = useState([])

    const [Status, SetStatus] = useState(false)

    const carouselRef = useRef(null);

    useEffect(() => {
        SetAllCityes([])
        Cities.forEach((e) => {
            GetWeatherOfCity(e)
        })
    }, [Status]);

    const GetWeatherOfCity = async (city) => {
        try {
            await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"0d73de379dffe7d028b1d22e3459a4fc"}`).then(Responce => Responce.json()).then((data) => {
                SetAllCityes((pre) => {
                    return [...pre, data]
                })
                Entries()
            })
        } catch (error) {
            console.log("error", error.message)
        }
    }

    const Entries = () => {
        setTimeout(() => {
            SetStatus(true)
        }, 200)
    }

    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.illustration }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                {
                    item.name ?
                        <View style={WeatherCard.container}>
                            <Text style={{ fontSize: 20, marginBottom: 10 }}>
                                Location:- {item.name}
                            </Text>
                            <View style={WeatherCard.TempBox}>
                                <Text style={{ fontSize: 20 }}>Max Temperature:- {Math.floor(item.main.temp_max - 273.15)}°C</Text>
                                <Text style={{ fontSize: 20 }}>Min Temperature:- {Math.ceil(item.main.temp_min - 273.15)}°C</Text>
                            </View>
                            <View style={WeatherCard.TempBox}>
                                <Text style={{ fontSize: 20 }}>Atmospheric Pressure:- {item.main.pressure / 1000}-bar</Text>
                                <Text style={{ fontSize: 20 }}>Wind Speed:- {item.wind.speed}M/S</Text>
                            </View>
                        </View>
                        : ""}
            </View>
        );
    };

    const [index, setIndex] = useState(0);

    return (
        <>
            {Status ? <>

                <View style={styles.container}>
                    <Carousel
                        ref={carouselRef}
                        sliderWidth={screenWidth}
                        sliderHeight={screenWidth}
                        itemWidth={screenWidth - 60}
                        data={AllCityes}
                        renderItem={renderItem}
                        hasParallaxImages={true}
                        onSnapToItem={index => setIndex(index)}
                    />
                    <Text style={WeatherCard.Pagination}>{index + 1}/{AllCityes.length}</Text>
                </View>
            </>
                : ""}

        </>
    );
};

export default MyCarouselCards;

const WeatherCard = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: "white",
        borderRadius: 5,
        marginTop: 10,
        fontSize: 20,
        height: 200,
        width: 430,
        // shadowColor: 'red',
        elevation: 4,
        padding: 5
    },
    TempBox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    Pagination: {
        fontSize: 25,
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "black",
        borderWidth: 1,
        borderColor: "white",
    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 0,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
});