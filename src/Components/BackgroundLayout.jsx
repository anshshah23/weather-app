import React, { useEffect, useState } from 'react';
import { useStateContext } from '../Context';
// images
import Clear from '../assets/images/Clear.jpg';
import Fog from '../assets/images/fog.png';
import Cloudy from '../assets/images/Cloudy.jpg';
import Rainy from '../assets/images/Rain.jpg';
import Snow from '../assets/images/snow.jpg';
import Stormy from '../assets/images/Stormy.jpg';
import Sunny from '../assets/images/Sunny.jpg';
import Haze from '../assets/images/haze.jpg';
import Overcast from '../assets/images/Overcast.jpg';
const BackgroundLayout = () => {
  const { weather } = useStateContext();
  const [image, setImage] = useState(Clear);

  useEffect(() => {
    if (weather.conditions) {
      let imageString = weather.conditions;
      if (imageString.toLowerCase().includes('clear')) {
        setImage(Clear);
      } else if (imageString.toLowerCase().includes('cloud')) {
        setImage(Cloudy);
      } else if (imageString.toLowerCase().includes('rain') || imageString.toLowerCase().includes('shower')) {
        setImage(Rainy);
      } else if (imageString.toLowerCase().includes('snow')) {
        setImage(Snow);
      } else if (imageString.toLowerCase().includes('fog')) {
        setImage(Fog);
      } else if (imageString.toLowerCase().includes('thunder') || imageString.toLowerCase().includes('storm')) {
        setImage(Stormy);
      } else if (imageString.toLowerCase().includes('haze')) {
        setImage(Haze);
      }
      else if (imageString.toLowerCase().includes('overcast')) {
        setImage(Overcast);
      }
      else {
        setImage(Sunny);
      }
    }
  }, [weather]);

  return (
    <div className="fixed inset-0 -z-10 h-screen w-full">
      <img src={image} alt="weather_image" className="object-cover h-full w-full" />
    </div>
  );
};

export default BackgroundLayout;
