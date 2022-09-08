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

const Options = {
    Delhi: {
        latitude: 28.6139,
        longitude: 77.2090,
    },
    Mumbai: {
        latitude: 19.0760,
        longitude: 72.8777,
    },
    Bengaluru: {
        latitude: 12.9716,
        longitude: 77.5946,
    },
    Chennai: {
        latitude: 13.0827,
        longitude: 80.2707,
    },
    Andhra: {
        latitude: 15.9129,
        longitude: 79.7400,
    },
    Pune: {
        latitude: 18.5204,
        longitude: 73.8567
    },
    Goa: {
        latitude: 15.2993,
        longitude: 74.1240
    },
    Kerala: {
        latitude: 10.8505,
        longitude: 76.2711
    },
    kanyakumari: {
        latitude: 8.0883,
        longitude: 77.5385,
    },
    Vizag: {
        latitude: 17.6868,
        longitude: 83.2185,
    },
    Ladakh: {
        latitude: 34.2268,
        longitude: 77.5619,
    },
    Kashmir: {
        latitude: 33.2778,
        longitude: 75.3412
    }

}

const Cities = ["banglore","chennai","delhi","mumbai","kashmir","Pune","vizag","goa","kanyakumari","Ladakh","kerala"]

const { width: screenWidth } = Dimensions.get('window');

const MyCarousel = props => {

    const [bangalore, SetBangalore] = useState({})

    const [Chennai, SetChennai] = useState({})

    const [Delhi, SetDelhi] = useState({})

    const [Mumbai, SetMumbai] = useState({})

    const [Andhra, SetAndhra] = useState({})

    const [Pune, SetPune] = useState({})

    const [Vizag, SetVizag] = useState({})

    const [Kerala, SetKerala] = useState({})

    const [Goa, SetGoa] = useState({})

    const [Kanyakumari, SetKanyakumari] = useState({})

    const [Ladakh, SetLadakh] = useState({})

    const [Kashmir, SetKashmir] = useState({})

    const [Status, SetStatus] = useState(false)

    const [entries, setEntries] = useState([]);

    const carouselRef = useRef(null);

    const ENTRIES1 = [
        {
            illustration: 'https://www.holidify.com/images/bgImages/ANDHRA-PRADESH.jpg',
            data: Andhra
        },
        {
            illustration: 'https://roofandfloor.thehindu.com/real-estate-blog/wp-content/uploads/sites/14/2018/12/Bangalore-2018-WRAP-UP-840x480.jpg',
            data: bangalore
        },
        {
            illustration: 'https://static2.tripoto.com/media/filter/tst/img/15546/TripDocument/4126922057_8e74c08828_o.jpg',
            data: Delhi
        },
        {
            illustration: 'https://image.shutterstock.com/image-illustration/chennai-city-monuments-yellow-background-600w-2049533492.jpg',
            data: Chennai
        },
        {
            illustration: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Marine_Lines_Mumbai_2021.jpg/800px-Marine_Lines_Mumbai_2021.jpg',
            data: Mumbai
        },
        {
            illustration: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Shaniwaarwada_Pune.jpg/800px-Shaniwaarwada_Pune.jpg',
            data: Pune
        },
        {
            illustration: 'https://images.moneycontrol.com/static-mcnews/2021/04/Roof-top-pool-2-taj-goa.jpg?impolicy=website&width=570&height=231',
            data: Goa
        },
        {
            illustration: 'https://img.onmanorama.com/content/dam/mm/en/travel/outside-kerala/images/2022/2/15/vembanad-kumarakom.jpg',
            data: Kerala
        },
        {
            illustration: 'https://www.kanyakumarians.com/data/catalog/Thengapattanam/Ajai-AL.jpg',
            data: Kanyakumari
        },
        {
            illustration: "https://assets.thehansindia.com/h-upload/feeds/2019/05/10/1300x460_173219-vizag.jpg",
            data: Vizag
        },
        {
            illustration: "https://static.toiimg.com/photo/91796663.cms",
            data: Ladakh
        },
        {
            illustration: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Neeulm_Valley_AJK_%28Arang_Kel%29.jpg/640px-Neeulm_Valley_AJK_%28Arang_Kel%29.jpg",
            data: Kashmir
        }
    ];

    useEffect(() => {
        GetWeatherOfCity(Options.Chennai.latitude, Options.Chennai.longitude, SetChennai)
        GetWeatherOfCity(Options.Delhi.latitude, Options.Delhi.longitude, SetDelhi)
        GetWeatherOfCity(Options.Mumbai.latitude, Options.Mumbai.longitude, SetMumbai)
        GetWeatherOfCity(Options.Andhra.latitude, Options.Andhra.longitude, SetAndhra)
        GetWeatherOfCity(Options.Pune.latitude, Options.Pune.longitude, SetPune)
        GetWeatherOfCity(Options.Bengaluru.latitude, Options.Bengaluru.longitude, SetBangalore)
        GetWeatherOfCity(Options.Goa.latitude, Options.Goa.longitude, SetGoa)
        GetWeatherOfCity(Options.Kerala.latitude, Options.Kerala.longitude, SetKerala)
        GetWeatherOfCity(Options.kanyakumari.latitude, Options.kanyakumari.longitude, SetKanyakumari)
        GetWeatherOfCity(Options.Vizag.latitude, Options.Vizag.longitude, SetVizag)
        GetWeatherOfCity(Options.Ladakh.latitude, Options.Ladakh.longitude, SetLadakh)
        GetWeatherOfCity(Options.Kashmir.latitude, Options.Kashmir.longitude, SetKashmir)
    }, [Status]);

    const GetWeatherOfCity = async (lat, long, Set) => {
        try {
            await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${"0d73de379dffe7d028b1d22e3459a4fc"}`).then(Responce => Responce.json()).then((data) => {
                Set(data)
                Entries()
            })
            // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
        } catch (error) {
            console.log("error", error.message)
        }
    }

    const Entries = () => {
        setEntries(ENTRIES1)
        setTimeout(() => {
            SetStatus(true)
        }, 200)
    }

    const renderItem = ({ item, index }, parallaxProps) => {
        // console.log("item in render",item)
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
                    item.data.name ?
                        <View style={WeatherCard.container}>
                            <Text style={{ fontSize: 20, marginBottom: 10 }}>
                                Location:- {item.data.name}
                            </Text>
                            <View style={WeatherCard.TempBox}>
                                <Text style={{ fontSize: 20 }}>Max Temperature:- {Math.floor(item.data.main.temp_max - 273.15)}°C</Text>
                                <Text style={{ fontSize: 20 }}>Min Temperature:- {Math.ceil(item.data.main.temp_min - 273.15)}°C</Text>
                            </View>
                            <View style={WeatherCard.TempBox}>
                                <Text style={{ fontSize: 20 }}>Atmospheric Pressure:- {item.data.main.pressure / 1000}-bar</Text>
                                <Text style={{ fontSize: 20 }}>Wind Speed:- {item.data.wind.speed}M/S</Text>
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
                        data={entries}
                        renderItem={renderItem}
                        hasParallaxImages={true}
                        onSnapToItem={index => setIndex(index)}
                    />
                    <Text style={WeatherCard.Pagination}>{index+1}/{entries.length}</Text>
                </View>
            </>
                : ""}

                <Pagination

                    dotsLength={entries.length}
                    activeDotIndex={index}
                    carouselRef={carouselRef}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 8,
                        backgroundColor: '#F4BB41',
                    }}
                    tappableDots={true}
                    inactiveDotStyle={{
                        backgroundColor: 'black',
                        // Define styles for inactive dots here
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
        </>
    );
};

export default MyCarousel;

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
    Pagination:{
        fontSize:25,
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "black",
        borderWidth:1,
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