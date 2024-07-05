import { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState('');  // Initially empty, will be set later
    const [location, setLocation] = useState('');

    const fetchWeather = async (place) => {
        if (!place) {
            console.error('Place is not set.');
            return;
        }

        const options = {
            method: 'GET',
            url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
            params: {
                aggregateHours: '24',
                location: place,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames: 0,
            },
            headers: {
                'X-RapidAPI-Key': 'c38d0a1a4emsh1fa530df57d8552p118baejsn3f18a8077b89',
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
            }
        };

        try {
            console.log(`Fetching weather for: ${place}`);
            const response = await axios.request(options);
            console.log(response.data);
            const thisData = Object.values(response.data.locations)[0];
            setLocation(thisData.address);
            setValues(thisData.values);
            setWeather(thisData.values[0]);
        } catch (error) {
            console.error(error);
            alert('An error occurred while fetching weather data or the place you entered is invalid. Please try again.');
        }
    };

    const fetchUserLocation = async () => {
        try {
            const response = await axios.get('http://ip-api.com/json/');
            const { city } = response.data;
            setPlace(city);
        } catch (error) {
            console.error('Error fetching user location:', error);
            setPlace('Mumbai');  // Fallback to Mumbai if geolocation fails
        }
    };

    useEffect(() => {
        fetchUserLocation();
    }, []);

    useEffect(() => {
        if (place) {
            fetchWeather(place);  // Ensure place is passed to fetchWeather
        }
    }, [place]);

    useEffect(() => {
        console.log(values);
    }, [values]);

    return (
        <StateContext.Provider value={{ weather, setPlace, values, location }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => {
    return useContext(StateContext);
};
