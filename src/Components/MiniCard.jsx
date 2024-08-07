/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';
import defaultIcon from '../assets/icons/default.png';
const MiniCard = ({ time, temp, iconString, onClick }) => {
  const [icon, setIcon] = useState(defaultIcon);

  useEffect(() => {
    if (iconString) {
      switch (true) {
        case iconString.toLowerCase().includes('cloud'):
          setIcon(cloud);
          break;
        case iconString.toLowerCase().includes('rain'):
          setIcon(rain);
          break;
        case iconString.toLowerCase().includes('clear'):
          setIcon(sun);
          break;
        case iconString.toLowerCase().includes('thunder'):
          setIcon(storm);
          break;
        case iconString.toLowerCase().includes('fog'):
          setIcon(fog);
          break;
        case iconString.toLowerCase().includes('snow'):
          setIcon(snow);
          break;
        case iconString.toLowerCase().includes('wind'):
          setIcon(wind);
          break;
        case iconString.toLowerCase().includes('mist'):
          setIcon(fog);
          break;
        default:
          setIcon(defaultIcon);
          break;
      }
    }
  }, [iconString]);

  return (
    <div
      className='w-[10rem] h-[10rem] flex flex-col rounded-xl shadow-gray-900 shadow-xl hover:scale-105 hover:shadow-2xl hover:shadow-gray-900 hover:bg-opacity-70 bg-gray-500 duration-500 border-white border-[1px] p-4 glassCard'
      onClick={onClick}
    >
      <p className='text-center'>
        {new Date(time).toLocaleTimeString('en', { weekday: 'long' }).split(' ')[0]}
      </p>
      <hr />
      <div className='w-full flex justify-center items-center flex-1'>
        <img src={icon} alt="forecast not available" className='w-[4rem] h-[4rem]' />
      </div>
      <p className='text-center font-bold'>{temp}&deg;C</p>
    </div>
  );
};

export default MiniCard;
