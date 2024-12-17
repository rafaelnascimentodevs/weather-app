'use client'
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Weather from "@/components/Weather";
import Spinner from "@/components/Spinner";




export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchWeather = (e) => {
    e.preventDefault();
    if (!city) {
      console.error("City name cannot be empty");
      return;
    }
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
    axios.get(url).then((response) => {
      setWeather(response.data);
      // console.log(response.data);
      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching the weather data:", error);
      setLoading(false);
    });
    setCity('');
  };

  const formatForecast = (secs, offset, data) => {
    console.log(secs);

  const hourly = data
  .filter((f) => f.dt > secs )
  .map((f) => ({
    temp: f.main.temp,
    title: formatLocaltime(f.dt, offset, "HH:mm a"),
    icon: `http://openweathermap.org/img/wn/${f.weather[0].icon}.png`,
    date: f.dt_txt,
  }))
  .slice(0, 5);

  const daily = data.filter((f) => f.dt_txt.slice(-8) === "00:00:00").map((f) => ({
    temp: f.main.temp,
    title: formatLocaltime(f.dt, offset, "ccc"),
    icon: `http://openweathermap.org/img/wn/${f.weather[0].icon}.png`,
    date: f.dt_txt,
  }))

  return {hourly , daily};
}

  if (loading) {
    return <Spinner />
  } else {  
    return (
      <div>
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/40 z[1]'/>
        {/* Background Image */}
        <Image 
            src='https://images3.alphacoders.com/134/1349491.jpeg' 
            layout='fill'
            className='object-cover'
            alt='bg-netweather' // 
          />

      {/* Search Bar */}
      
      <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
        <form onSubmit={fetchWeather} className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl">
          <div>
            <input 
            onChange={(e) => setCity(e.target.value)}
            value={city}
            className="bg-transparent border-none text-withe focus:outline-none" type="text" placeholder="Search City"/>
          </div>
          <button onClick={fetchWeather}><BsSearch size={20} /></button>
        </form>
      </div>
      
      {/* Weather Info */}
      
      {weather.main && <Weather data={weather} />}
      
      {/* Forecast */}


    </div>  

    )
  }
}