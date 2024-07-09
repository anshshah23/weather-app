import { useState, useEffect } from 'react';
import './App.css';
import search from './assets/icons/search.svg';
import { useStateContext } from './Context';
import { BackgroundLayout, WeatherCard, MiniCard } from './Components';

function App() {
  const [input, setInput] = useState('');
  const { weather, location, values, setPlace, timezone } = useStateContext();
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [selectedDatetime, setSelectedDatetime] = useState(null);

  const submitCity = () => {
    if (input.trim()) {
      setPlace(input);
      setInput('');
    }
  };

  useEffect(() => {
    setSelectedWeather(null); // Reset selected weather when new weather data is fetched
  }, [weather]);

  const handleMiniCardClick = (weatherDetails) => {
    setSelectedWeather(weatherDetails);
    setSelectedDatetime(weatherDetails.datetime);
  };

  const handleBackClick = () => {
    setSelectedWeather(null);
    setSelectedDatetime(null);
  };

  return (
    <div className='w-full h-screen text-white px-4 sm:px-8 flex flex-col items-center justify-between overflow-auto'>
      <BackgroundLayout />
      <nav className='w-full p-3 flex flex-col sm:flex-row justify-between items-center bg-opacity-20 bg-black rounded mb-10 shadow-black hover:shadow-md hover:shadow-gray-900 hover:bg-opacity-30 duration-500'>
        <h1 className='font-bold tracking-wide text-2xl sm:text-3xl'>Weather App</h1>
        <div className='bg-white w-[12rem] sm:w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
          <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
          <input
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                submitCity();
              }
            }}
            type="text"
            placeholder='Search city'
            className='focus:outline-none w-full text-[#212121] text-base sm:text-lg'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>
      </nav>
      <main className='w-full flex flex-col items-center justify-center'>
        {selectedWeather ? (
          <WeatherCard
            place={location}
            windspeed={selectedWeather.wspd}
            humidity={selectedWeather.humidity}
            temperature={selectedWeather.temp}
            heatIndex={selectedWeather.heatindex}
            iconString={selectedWeather.conditions}
            conditions={selectedWeather.conditions}
            onBackClick={handleBackClick}
            datetime={selectedDatetime}
            timezone={timezone}
          />
        ) : (
          <>
            <WeatherCard
              place={location}
              windspeed={weather.wspd}
              humidity={weather.humidity}
              temperature={weather.temp}
              heatIndex={weather.heatindex}
              iconString={weather.conditions}
              conditions={weather.conditions}
              datetime={weather.datetime}
              timezone={timezone}
            />
            <div className='flex flex-wrap justify-center gap-4 sm:gap-8 w-full mt-8 mb-10'>
              {values?.slice(1, 7).map(curr => (
                <MiniCard
                  key={curr.datetime}
                  time={curr.datetime}
                  temp={curr.temp}
                  iconString={curr.conditions}
                  onClick={() => handleMiniCardClick(curr)}
                />
              ))}
            </div>
          </>
        )}
        <footer className='w-full p-3 text-xl font-black flex justify-center items-center bg-opacity-20 bg-black rounded mb-20'>
          <p className='text-center'>Created by Ansh Shah</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
