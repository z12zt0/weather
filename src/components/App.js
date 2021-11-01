import { useState } from "react";
import {Autocomplete, TextField} from "@mui/material";
import CityCard from "./CityCard";

function App() {
  const [city, changeCity] = useState("");
  const listOfCities = ["London", "Moscow", "New York", "Berlin"]; // will change it later

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
          for icons:
          https://openweathermap.org/weather-conditions
          */}
          {city && <CityCard city={city}/>}
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
