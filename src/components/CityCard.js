import getLocation from "./fetchFuncs/getLocation.js";
import getWeather from "./fetchFuncs/getWeather.js";
import { useEffect } from "react";

function CityCard({city}) {
    console.log(city + " in comp");
    let data = null;

    async function getData(city) {
        let location = await getLocation(city);
        let weatherData = await getWeather(location.lon, location.lat);
        console.log(location, weatherData);
        data = weatherData;

        return weatherData;
    }

    useEffect(() => {
            getData(city);
    }, [city]);
    return (
        <div>
            <h3>{city}</h3>
            {/*1 of 3 pics: clear sky, clouds, rain -> opacity ~ 0.6, in left or bottom left corner */}
            <h5>Clouds</h5>
            <text>+5gr Celcius</text>
            {data && <div>{data}</div>}
        </div>
    )
}

export default CityCard;