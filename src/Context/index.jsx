import { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState('');
    const [location, setLocation] = useState('');
    const [timezone, setTimezone] = useState('UTC'); // Default timezone

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
                'X-RapidAPI-Key': '',
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            const thisData = Object.values(response.data.locations)[0];
            setLocation(thisData.address);
            setValues(thisData.values);
            setWeather(thisData.values[0]);
            setTimezone(thisData.timezone || 'UTC');
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
            setPlace('Mumbai');
        }
    };

    useEffect(() => {
        fetchUserLocation();
    }, []);

    useEffect(() => {
        if (place) {
            fetchWeather(place);
        }
    }, [place]);

    return (
        <StateContext.Provider value={{ weather, setPlace, values, location, timezone }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => {
    return useContext(StateContext);
};
