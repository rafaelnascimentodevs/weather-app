import Image from "next/image";
import React from "react";
import moment from 'moment';


const Weather = ({data}) => {
    console.log(data);
    return (
        <div className="relative flex flex-col justify-between max-w-[500px] w-full h-[90vh] m-auto p-4 text-gray-200">
            <div className="relative flex justify-between pt-12">
                <div className="flex flex-col items-center">
                    <Image 
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
                    alt="/"
                    width="100"
                    height="100"/>
                    <p>{data.weather[0].main}</p>
                </div>
                <p className="text-9xl">{data.main.temp.toFixed(0)}&#176;</p>
            </div>

            {/* time */}
            
           <div>
              </div>
                <div className="text-center bg-black/50 relative p-5 rounded-md">
                 <p className="text-2xl">{moment().hour()}:{moment().minutes()}:{moment().seconds()}</p>
                 <p className="text-xl">{moment().format('MMMM Do YYYY')}</p>
           </div>

            {/* Botton */}
<div className="bg-black/50 relative p-7 rounded-md">
    <p className="text-2xl text-center pb-6">Weather in {data.name}</p>
    <div className="flex justify-between text-center">
        <div>
            <p className="font-bold text-2l">{data.main.feels_like.toFixed(0)}&#176;</p>
            <p className="text-xl">Feels like</p>
        </div>
        <div>
            <p className="font-bold text-2l">{data.main.humidity.toFixed(0)}%</p>
            <p className="text-xl">Humidity</p>
        </div>
        <div>
            <p className="font-bold text-2l">{data.wind.speed.toFixed(0)}/Mph</p>
            <p className="text-xl">Winds</p>
        </div>
        <div>
            <p className="font-bold text-2l">{data.main.temp_min.toFixed(0)} Min</p>
            <p className="text-xl">Temp</p>
        </div>
        <div>
            <p className="font-bold text-2l">{data.main.temp_max.toFixed(0)} Max</p>
            <p className="text-xl">Temp</p>
        </div>
    </div>
</div>          

        </div>
    )
}

export default Weather;