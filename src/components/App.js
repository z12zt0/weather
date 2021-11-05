import { useState, useEffect } from "react";
import {Autocomplete, TextField} from "@mui/material";
import CityCard from "./CityCard";
import HistoryBar from "./HistoryBar";
import {getCitiesByInput, throttle} from "./fetchFuncs/getInput.js";
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// DON'T FORGET TO REMOVE ALL THE INLINE STYLES!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


/* TODO:
 1)THINK ABOUT THROTTLE FUNCTOIN (use debounce - it works the same (almost),
  but already implemented twice, so you have an example)
 2)WORK ON UI
 3)ADD .ENV SUPPORT FOR YOUR API KEY
 */

// so, I wanted to make throttled calls on server, but it doesn't seem to work
function App() {
  const [city, changeCity] = useState("");
  const [history, setHistory] = useState(null);
  const [listOfCities, setListOfCities] = useState(["London", "Moscow", "New York", "Berlin"]);
  const [warningFlag, setWarningFlag] = useState(false);

  function trimHistory(history) {
    setHistory(past => {
      let keyToDelete = Object.keys(past)[0];
      let newObj = Object.entries(past).filter(subArr => {
        if (subArr[0] !== keyToDelete) {
          return true;
        }
        return false;
      });
      
      return Object.fromEntries(newObj);
    })
  }

  useEffect(() => {
    if (!history || Object.keys(history).length < 11) return;
    trimHistory(history);
  }, [history])
  // all the idless divs will become routes later
  // also will add login (and skip button) too (check the bottom comment)
////////
  async function getEveryCity(input) {
    let fullNames = await getCitiesByInput(input);
    setListOfCities(fullNames);
  };
  const throttledCity = throttle(getEveryCity, 1500);

  return (
    <div className="App">
      <h1>Weather in your city</h1>
      <div>
        <Autocomplete 
          freeSolo
          id="input-city"
          options={listOfCities}
          sx={{ width: "75vw", m: "auto", mb: "3vh"}}
          onChange={(e, newValue) => {
            changeCity(newValue?.split(",")[0]);
            setWarningFlag(flag => false);
          }}
          onInput={async(e) => {
            await throttledCity(e.target.value);
            //await getEveryCity(e.target.value);
          }}
          renderInput={(params) => <TextField variant="outlined" {...params} label="City" />}></Autocomplete>
        </div>
        <div>
          {city && <CityCard city={city} setHistory={setHistory} warningFlag={warningFlag} setWarningFlag={setWarningFlag}/>}
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
