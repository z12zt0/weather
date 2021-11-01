// import { useState, useEffect } from "react";
/**
 * 
 * @param {string} city Name of the city to get longitue and latitude
 * @returns {Object} given city's location and a way to re-use this hook
 */
async function getLocation(city) {
    // //https://openweathermap.org/api/geocoding-api#direct
    let cityCoords = null;
    try{
        let data = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=51ea28dd2730cd3f7fd426a0e45af644`);
        let json = await data.json();
        console.log(json[0]);
        cityCoords = {lon: json[0].lon, lat: json[0].lat};
    }
    catch(err) {
        console.log(err);
        return "An error occurred, try later please";
    }
    return cityCoords;
}

export default getLocation;