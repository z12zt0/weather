import { useState, useEffect } from "react";
import {Autocomplete, TextField} from "@mui/material";
import CityCard from "./CityCard";
import HistoryBar from "./HistoryBar";

function App() {
  const [city, changeCity] = useState("");
  const [history, setHistory] = useState(null);
  const [listOfCities, setListOfCities] = useState(["London", "Moscow", "New York", "Berlin"]);

  function trimHistory(history) {
    if (!history) return;

    let sizeOfHistory = 0;
    for (let cityTimestop of Object.keys(history)) {
      sizeOfHistory++;

      if (sizeOfHistory > 10) {
        setHistory(past => {
          delete past[Object.keys(history)[0]];
          return {...past};
        })
      }
    }
  }

  useEffect(() => {
    trimHistory(history);
  }, [history])
  // all the idless divs will become routes later
  // also will add login (and skip button) too (check the bottom comment)

  async function getEveryCity(input) {
    let result = await fetch(`https://api.teleport.org/api/cities/?search=${input}`);
    let json = await result.json();
    let fullNames = [];
    await json._embedded["city:search-results"].map(currentVariant => {
      fullNames.push(currentVariant.matching_full_name);
    });
    setListOfCities(fullNames);
  };

  function throttle(func, timeout) {
    let flag = true;
    let savedArgs, savedContext;

    return function wrapper() {
      if (!flag) {
        savedArgs = arguments;
        savedContext = this;
        return;
      }
      func.apply(this, arguments);
      flag = false;

      setTimeout(() => {
        flag = true;
        if (savedArgs) {
          wrapper.apply(savedContext, savedArgs);
          savedArgs = null;
          savedContext = null;
        }
      }, timeout);
    }
  }
  const throttledCity = throttle(getEveryCity, 2000);

  return (
    <div className="App">
      <h1>Weather in your city</h1>
      <div>
        <Autocomplete 
          freeSolo
          id="input-city"
          options={listOfCities}
          sx={{ width: "75vw", m: "auto"}}
          onChange={(e, newValue) => {
            changeCity(newValue?.split(",")[0]);
          }}
          onInput={async(e) => {
            await throttledCity(e.target.value);
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
