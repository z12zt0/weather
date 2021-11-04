// import { useState, useEffect } from "react";
// import useLocation from "./useLocation";

async function getWeather(lon, lat) {
    // https://openweathermap.org/api/one-call-api
    try{
        let result = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=51ea28dd2730cd3f7fd426a0e45af644&units=metric`);
        let json = await result.json();
        console.log(json);
        return json;
    }
    catch(err) {
        console.error(err);
        return new Error("No weather found for the given coords");
    }
}


export default getWeather;