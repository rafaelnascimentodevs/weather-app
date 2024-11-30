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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
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

  if (loading) {
    return <Spinner />
  } else {  
    return (
      <div>
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/40 z[1]'/>
        {/* Background Image */}
        <Image 
            src='https://images.unsplash.com/photo-1561484930-998b6a7b22e8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
            layout='fill'
            className='object-cover'
            alt='bg-netweather' // Adicione uma descrição apropriada aqui
          />

      {/* Search Bar */}
      
      <div className="relative flex justify-between items-center max-w-[500px] text-white z-10">
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

    </div>
    )
  };
}