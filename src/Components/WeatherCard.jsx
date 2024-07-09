import React, { useEffect, useState } from 'react';
import { useDate } from '../Utils/useDate';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';
import '../index.css';

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
  datetime,
  timezone,
  onBackClick
}) => {
  const [icon, setIcon] = useState(sun);
  const { date, time } = useDate(timezone, datetime);

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) {
        setIcon(cloud);
      } else if (iconString.toLowerCase().includes('rain')) {
        setIcon(rain);
      } else if (iconString.toLowerCase().includes('clear')) {
        setIcon(sun);
      } else if (iconString.toLowerCase().includes('thunder')) {
        setIcon(storm);
      } else if (iconString.toLowerCase().includes('fog')) {
        setIcon(fog);
      } else if (iconString.toLowerCase().includes('snow')) {
        setIcon(snow);
      } else if (iconString.toLowerCase().includes('wind')) {
        setIcon(wind);
      }
    }
  }, [iconString]);

  return (
    <div className='w-full sm:w-[22rem] min-w-[18rem] sm:min-w-[22rem] h-auto sm:h-[30rem] bg-opacity-60 rounded-xl shadow-black shadow-xl hover:scale-105 hover:shadow-2xl hover:shadow-gray-900 hover:bg-opacity-70 bg-gray-500 duration-500 border-white border-[1px] p-4 glassCard' >
      <div className='flex flex-col sm:flex-row w-full justify-center items-center gap-4 mt-4 sm:mt-4 mb-4'>
        <img src={icon} alt="weather_icon" className='w-12 h-12 sm:w-16 sm:h-16' />
        <p className='font-bold text-3xl sm:text-5xl flex justify-center items-center'>{temperature} &deg;C</p>
      </div>
      <div className='font-bold text-center text-xl'>{place}</div>
      <div className='w-full flex flex-col sm:flex-row justify-center items-center mt-4'>
        <p className='text-lg sm:text-xl'>{date}</p>
      </div>
      <div className='w-full flex flex-col sm:flex-row justify-between items-center mt-4 gap-4'>
        <p className='flex-1 text-center p-2 font-bold bg-blue-500 shadow rounded-lg'>Wind Speed <b className='font-normal'>{windspeed} km/h</b></p>
        <p className='flex-1 text-center p-2 font-bold rounded-lg bg-green-500'>Humidity <span className='font-normal'>{humidity} gm/m&#179;</span></p>
      </div>
      <div className='w-full p-0 sm:p-3 mt-4 flex flex-col sm:flex-row justify-between items-center'>
        <p className='font-semibold text-lg'>Heat Index</p>
        <p className='text-lg'>{heatIndex ? heatIndex : 'N/A'}</p>
      </div>
      <hr className='bg-white h-[3px]' />
      <div className='w-full p-2 flex flex-col sm:flex-row justify-center items-center text-3xl font-semibold'>
        {conditions}
      </div>
      <button onClick={onBackClick} className="m-2 p-2 bg-red-500 rounded text-white">Back</button>
    </div>
  );
};

export default WeatherCard;
