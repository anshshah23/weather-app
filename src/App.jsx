import { useState } from 'react';
import './App.css';
import search from './assets/icons/search.svg';
import { useStateContext } from './Context';
import { BackgroundLayout, WeatherCard, MiniCard } from './Components';

function App() {
  const [input, setInput] = useState('');
  const { weather, location, values, place, setPlace } = useStateContext();

  const submitCity = () => {
    setPlace(input);
    setInput('');
  };

  return (
    <div className='w-full h-screen text-white px-4 sm:px-8 flex flex-col items-center justify-between overflow-auto'>
      <BackgroundLayout />
      <nav className='w-full p-3 flex flex-col sm:flex-row justify-between items-center'>
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
        <WeatherCard
          place={location}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatindex}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />
        <div className='flex flex-wrap justify-center gap-4 sm:gap-8 w-full mt-8'>
          {values?.slice(1, 7).map(curr => (
            <MiniCard
              key={curr.datetime}
              time={curr.datetime}
              temp={curr.temp}
              iconString={curr.conditions}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
