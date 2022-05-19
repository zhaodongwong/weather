import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import moment from "moment";
import { BrowserRouter as Router, Routes, Route, useParams, Link } from "react-router-dom";



function Weather() {
 const [data, setData] = useState();
 const [query, setQuery] = useState("");
 const [results, setResults] = useState([]);

 const { place } = useParams();

 useEffect(() => {
   setQuery('')
   fetch(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${place || 'Johor Bahru'}&days=3&aqi=no&alerts=no`)
   .then(res => res.json())
   .then(d => setData(d))
 }, [place]);
 
 useEffect(() => {
   setResults([])
   if (query){
     fetch( `http://api.weatherapi.com/v1/search.json?key=${import.meta.env.VITE_API_KEY}&q=${query}}`)
     .then(res => res.json())
   .then(d => setResults(d))
   }
 }, [query]);
 

  return (data 
    ?
    <div className="flex h-screen">
     <div className="w-1/2 h-full bg-cyan-500 flex flex-col justify-center p-16 text-white">
       <h1 className="text-2xl font-['Roboto']">
         {moment(data.location.localtime_epoch * 1000).format("ddd, MMM D")}
       </h1>
       <h2 className="text-5xl mt-8">
         Hi, Zhao Dong!
       </h2>
       <h3 className="text-2xl mt-6 tracking-wide font-['Roboto']">
         Here&apos;s your weather telecast for today.
       </h3>
       <img className='w-20 mt-8' src={data.current.condition.icon}/>
       <div className='flex flex-row items-center mt-6'>
       <Icon icon="carbon:location-filled" width="40" height="40" />
       <h4 className="text-2xl font-['Roboto']">{data.location.name}</h4>
       </div>
       <div className='justify-between flex flex-row items-center'>
       <h5 className='text-3xl mt-6'>
       {data.current.condition.text}
       </h5>
       <h7 className="text-7xl">
         {data.current.temp_c} °C
       </h7>
       </div>
       <h6 className="text-xl mt-2 font-['Roboto']">
         Feels like {data.current.feelslike_c}°C
       </h6>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='absolute bottom-0 left-0 w-1/2 opacity-50'>
         <path fill="#0099ff" fill-opacity="1" d="M0,32L288,224L576,64L864,320L1152,128L1440,320L1440,320L1152,320L864,320L576,320L288,320L0,320Z"></path>
       </svg>
       <Icon icon="bi:cloud-fill" color="white" className='opacity-20 absolute top-12' width="100" height="100"/>
       <Icon icon="bi:cloud-fill" color="white" className='opacity-20 absolute top-20 left-1/3' width="150" height="150"/>
       <Icon icon="bi:cloud-fill" color="white" className='opacity-20 absolute bottom-28 ml-5' width="150" height="150"/>
       <Icon icon="bi:cloud-fill" color="white" className='opacity-20 absolute bottom-24 left-1/3 mr-5' width="100" height="100"/>
     </div>
     <div className="w-1/2 h-full">
       <div className='ml-20 flex items-end mt-5 relative'>
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
       <div className='m-20 mt-12'>
         <h8 className="text-3xl">Weather Details</h8>
         <div className="flex flex-col divide-y space-y-3 text-xl mt-5 ">
           <div className="justify-between flex flex-row p-3 ">
             <h1 className="font-['Montserrat']">Cloudy</h1>
             <h1 className="font-['Montserrat']">{data.current.cloud}%</h1>
         </div>
         <div className='justify-between flex flex-row p-3'>
             <h1 className="font-['Montserrat']">Humidity</h1>
             <h1 className="font-['Montserrat']">{data.current.humidity}%</h1>
         </div>           
         <div className='justify-between flex flex-row p-3'>
             <h1 className="font-['Montserrat']">Wind</h1>
             <h1 className="font-['Montserrat']">{data.current.wind_dir} @ {data.current.wind_kph}km/h</h1>
         </div>           
         <div className='justify-between flex flex-row p-3'>
             <h1 className="font-['Montserrat']">Pressure</h1>
             <h1 className="font-['Montserrat']">{data.current.pressure_mb}mb</h1>
         </div>
         <div className='justify-between flex flex-row p-3'>
             <h1 className="font-['Montserrat']">Visibility</h1>
             <h1 className="font-['Montserrat']">{data.current.vis_km}km</h1>
         </div>
         <div className='justify-between flex flex-row p-3'>
             <h1 className="font-['Montserrat']">Wind Gust</h1>
             <h1 className="font-['Montserrat']">{data.current.gust_kph}km/h</h1>
         </div>
       </div>
     </div>
     <div className='m-20 mt-12'>
     <h8 className="text-3xl">Forecasts</h8>
     <div className='flex flex-col divide-y space-y-3 text-xl mt-5'>
        {data.forecast.forecastday.map((day) => (
              <div className="flex justify-between items-center p-3">
                <span className="font-light text-zinc-700 font-['Montserrat']">
                  {moment(day.date_epoch * 1000).format("ddd, MMM D")}
                </span>
                <img src={day.day.condition.icon} className="w-8 h-8" />
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
