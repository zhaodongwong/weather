import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import moment from "moment";
import { BrowserRouter as Router, Routes, Route, useParams, Link } from "react-router-dom";
import 'animate.css';



function Weather() {
 const [data, setData] = useState();
 const [query, setQuery] = useState("");
 const [results, setResults] = useState([]);

 const { place } = useParams();

 useEffect(() => {
   setQuery('')
   fetch(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${place || 'Johor Bahru'}&days=3&aqi=no&alerts=no`)
   .then(res => res.json())
   .then(d => setData(d))
 }, [place]);
 
 useEffect(() => {
   setResults([])
   if (query){
     fetch( `https://api.weatherapi.com/v1/search.json?key=${import.meta.env.VITE_API_KEY}&q=${query}}`)
     .then(res => res.json())
   .then(d => setResults(d))
   }
 }, [query]);
 

  return (data 
    ?
    <div className="flex lg:h-screen tracking-wide flex-col h-full lg:flex-row">
     <div className="w-full lg:w-1/2 h-full bg-cyan-500 flex flex-col justify-center p-5 lg:p-16 text-white">
       <h1 className="text-2xl font-['Roboto'] animate__animated animate__slideInRight ">
         {moment(data.location.localtime_epoch * 1000).format("ddd, MMM D, h:mm")}
       </h1>
       <h2 className="text-5xl mt-8 animate__animated animate__slideInLeft">
         Hi!
       </h2>
       <h3 className="text-2xl mt-6 tracking-wide font-['Roboto'] animate__animated animate__slideInRight ">
         Here&apos;s your weather telecast for today.
       </h3>
       <img className='w-20 mt-8 animate__animated animate__slideInLeft' src={data.current.condition.icon}/>
       <div className='flex flex-row items-center mt-6'>
       <Icon icon="carbon:location-filled" width="40" height="40" className='animate__animated animate__slideInRight'/>
       <h4 className="text-2xl font-['Roboto'] animate__animated animate__slideInRight">{data.location.name}</h4>
       </div>
       <div className='justify-between flex flex-row items-center'>
       <h5 className='text-3xl mt-6 animate__animated animate__slideInLeft'>
       {data.current.condition.text}
       </h5>
       <h7 className="text-3xl lg:text-6xl animate__animated animate__fadeInDown">
         {data.current.temp_c} ??C
       </h7>
       </div>
       <h6 className="text-xl mt-2 font-['Roboto'] animate__animated animate__slideInRight">
         Feels like {data.current.feelslike_c}??C
       </h6>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='absolute bottom-0 left-0 w-1/2 text-cyan-800 opacity-50'>
         <path fill="#0099ff" fill-opacity="1" d="M0,32L288,224L576,64L864,320L1152,128L1440,320L1440,320L1152,320L864,320L576,320L288,320L0,320Z"></path>
       </svg>
       <Icon icon="bi:cloud-fill" color="white" className='opacity-20 absolute top-12' width="100" height="100"/>
       <Icon icon="bi:cloud-fill" color="white" className='opacity-20 absolute top-20 left-1/3' width="150" height="150"/>
       <Icon icon="bi:cloud-fill" color="white" className='opacity-20 absolute bottom-28 ml-5' width="150" height="150"/>
       <Icon icon="bi:cloud-fill" color="white" className='opacity-20 absolute bottom-24 left-1/3 mr-5' width="100" height="100"/>
     </div>
     <div className="w-full lg:w-1/2 h-full lg:overflow-y-auto ">
       <div className='ml-1 lg:ml-20 flex items-end mt-5 relative'>
         <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Location" className='flex-1 border-b-2 border-zinc-200 placeholder-zinc-300 pb-2 text-2xl focus:outline-none'/>
         <div className='w-12 h-12 bg-cyan-500 flex items-center justify-center'>
           <button>
         <Icon icon="ci:search" color="#ffffff" width="24" height="24"/>
         </button>
         </div>
         <div className="absolute bottom-0 left-0 translate-y-full w-[calc(100%-3rem)] flex flex-col bg-white rounded-b-md divide-y shadow-lg">
            {query && !results.length
              ? "No results"
              : results.map((result) => (
                <Link className="py-3 px-4 text-xl" to={`/${result.url}`}>
                  {[result.name, result.region, result.country]
                    .filter((e) => e)
                    .join(",")}
                </Link>
              ))}
          </div>
       </div>
       <div className='m-5 lg:m-20 mt-12'>
         <h8 className="text-3xl animate__animated animate__lightSpeedInRight">Weather Details</h8>
         <div className="flex flex-col divide-y space-y-3 text-xl mt-5 ">
           <div className="justify-between flex flex-row p-3 ">
             <h1 className="font-['Montserrat'] animate__animated animate__lightSpeedInRight">Cloudy</h1>
             <h1 className="font-['Montserrat'] animate__animated animate__lightSpeedInLeft">{data.current.cloud}%</h1>
         </div>
         <div className='justify-between flex flex-row p-3'>
             <h1 className="font-['Montserrat'] animate__animated animate__lightSpeedInRight">Humidity</h1>
             <h1 className="font-['Montserrat'] animate__animated animate__lightSpeedInLeft">{data.current.humidity}%</h1>
         </div>           
         <div className='justify-between flex flex-row p-3'>
             <h1 className="font-['Montserrat'] animate__animated animate__lightSpeedInRight">Wind</h1>
             <h1 className="font-['Montserrat'] animate__animated animate__lightSpeedInLeft">{data.current.wind_dir} @ {data.current.wind_kph}km/h</h1>
         </div>           
         <div className='justify-between flex flex-row p-3'>
             <h1 className="font-['Montserrat'] animate__animated animate__lightSpeedInRight">Pressure</h1>
             <h1 className="font-['Montserrat'] animate__animated animate__lightSpeedInLeft">{data.current.pressure_mb}mb</h1>
         </div>
         <div className='justify-between flex flex-row p-3'>
             <h1 className="font-['Montserrat'] animate__animated animate__lightSpeedInRight">Visibility</h1>
             <h1 className="font-['Montserrat'] animate__animated animate__lightSpeedInLeft">{data.current.vis_km}km</h1>
         </div>
         <div className='justify-between flex flex-row p-3'>
             <h1 className="font-['Montserrat'] animate__animated animate__lightSpeedInRight">Wind Gust</h1>
             <h1 className="font-['Montserrat'] animate__animated animate__lightSpeedInLeft">{data.current.gust_kph}km/h</h1>
         </div>
       </div>
     </div>
     <div className='m-5 lg:m-20 mt-12'>
     <h8 className="text-3xl animate__animated animate__lightSpeedInRight">Forecasts</h8>
     <div className='flex flex-col divide-y space-y-3 text-xl mt-5'>
        {data.forecast.forecastday.map((day) => (
              <div className="flex justify-between items-center p-3">
                <span className="font-light text-zinc-700 font-['Montserrat'] animate__animated animate__lightSpeedInRight">
                  {moment(day.date_epoch * 1000).format("ddd, MMM D")}
                </span>
                <img src={day.day.condition.icon} className="w-8 h-8 animate__animated animate__lightSpeedInLeft" />
              </div>
            ))}
       </div>
     </div>
    </div>
    </div>
  :"");
}

function App(){
  return( 
    <Router>
      <Routes>
        <Route path="/" element={<Weather/>}/>
        <Route path="/:place" element={<Weather/>}/>
      </Routes>
    </Router>
  );
}

export default App
