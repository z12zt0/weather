import { useState, useEffect } from "react";
import {Autocomplete, TextField} from "@mui/material";
import CityCard from "./CityCard";
import HistoryBar from "./HistoryBar";

function App() {
  const [city, changeCity] = useState("");
  const listOfCities = ["London", "Moscow", "New York", "Berlin"]; // will change it later
  const [history, setHistory] = useState(null);
  // history = {city: {cityName, temperature, icon, photo}...}

  function trimHistory(history) {
    if (!history) return;

    let sizeOfHistory = 0;
    for (let cityTimestop of Object.keys(history)) {
      sizeOfHistory++;

      if (sizeOfHistory > 10) {
        setHistory(past => {
          delete past[cityTimestop];
          return {...past};
        })
      }
    }
  }

  useEffect(() => {
    console.log("HISTORY CHANGES", history);
    trimHistory(history);
  }, [history])
  // all the idless divs will become routes later
  // also will add login (and skip button) too (check the bottom comment)
  return (
    <div className="App">
      <h1>Weather in your city</h1>
      <div>
        <Autocomplete 
          disablePortal
          id="input-city"
          options={listOfCities}
          sx={{ width: "75vw", m: "auto"}}
          onChange={(e, newValue) => {
            changeCity(newValue)
          }}
          renderInput={(params) => <TextField variant="outlined" {...params} label="City" />}></Autocomplete>
        </div>
        <div>
          <h2>{city}</h2>
          {city && <CityCard city={city} setHistory={setHistory}/>}
        </div>
        {/*will fix it later */}
        <div style={{display: "flex"}}>
          {/*maybe I should add a button to go to the ./history route */}
          <HistoryBar history={history} />
        </div>
    </div>
  );
}

// on auth page make a button "don't care, didn't ask" to skip the auth form
// if skipped, search will be saved in localStorage instead of mongoDB

export default App;
