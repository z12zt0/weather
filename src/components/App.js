import { useState } from "react";
import {Autocomplete, TextField} from "@mui/material";
import CityCard from "./CityCard";

function App() {
  const [city, changeCity] = useState("");
  const listOfCities = ["London", "Moscow", "New York", "Berlin"];

  return (
    <div className="App">
      <h1>Weather in your city</h1>
      <div>
        <Autocomplete 
          disablePortal
          id="input-city"
          options={listOfCities}
          sx={{ width: 300 }}
          onChange={(e, newValue) => changeCity(newValue)}
          renderInput={(params) => <TextField variant="outlined" {...params} label="City" />}></Autocomplete>
        </div>
        <div>
          <h2>{city}</h2>
          {/*Here will be mounted the main card-like component with the current city's weather */}
          {/*
          TODO:
          https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
          https://openweathermap.org/api/one-call-api
          key = 51ea28dd2730cd3f7fd426a0e45af644;

          for lon and lat
          https://openweathermap.org/api/geocoding-api#direct
          http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
          */}
          <CityCard city={city}/>
        </div>
        <div>
          {/*Here will be mounted 10 components from search history (mb like array or something) */}
        </div>
    </div>
  );
}

// on auth page make a button "don't care, didn't ask" to skip the auth 
// if skipped, search will be saved in localStorage instead of mongoDB

export default App;
