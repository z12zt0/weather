// import { useState, useEffect } from "react";
// import useLocation from "./useLocation";
/**
 * Longitude, latitude -> name of the nearest city.
 * More info -> https://openweathermap.org/api/one-call-api
 * @param {String} lon longitude of the location
 * @param {String} lat latitude of the location
 * @returns {JSON} data about the nearest city
 */
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