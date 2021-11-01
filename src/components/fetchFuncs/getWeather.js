// import { useState, useEffect } from "react";
// import useLocation from "./useLocation";

async function getWeather(lon, lat) {
    // // https://openweathermap.org/api/one-call-api
    try{
        let result = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=51ea28dd2730cd3f7fd426a0e45af644&units=metric`);
        let json = await result.json();
        return json;
    }
    catch(err) {
        console.error(err);
        return "An error occurred in getWeather function! Check the logs";
    }
}


export default getWeather;