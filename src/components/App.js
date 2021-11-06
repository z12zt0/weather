import { useState, useEffect } from "react";
import CityCard from "./CityCard";
import HistoryBar from "./HistoryBar";
import {getCitiesByInput, debounce} from "./fetchFuncs/getInput.js";
import AuthPage from "./AuthPage.js";
import { Routes, Route, Navigate } from "react-router-dom";
import AutocompletedInput from "./AutocompletedInput";
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// DON'T FORGET TO REMOVE ALL THE INLINE STYLES!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


/* TODO:
 2)WORK ON UI
 3)ADD .ENV SUPPORT FOR YOUR API KEY
 4) REACT ROUTER -> AUTH PAGE
 */

function App() {
  const [city, changeCity] = useState("");
  const [history, setHistory] = useState(null);
  const [listOfCities, setListOfCities] = useState([]);
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

  async function getEveryCity(input) {
    let fullNames = await getCitiesByInput(input);
    setListOfCities(fullNames);
  };
  const debouncedCity = debounce(getEveryCity, 300);

  function setTransition(id, isOnFocus) {
    let element = document.getElementById(id);
    
    if (isOnFocus) {
      if (!city) {
        element.style.marginTop = "5vh";
        // timeout and scrollTo need to re-render window, so 
        // the pop-up div will catch up to city-input
        setTimeout(() => window.scrollTo({top: 1, left: 0, behavior: "smooth"}), 300);
      }
      return;
    }
    if (!city) {
      element.style.marginTop = "20vh";
      window.scrollTo(0, 0);
    }
    
    
  }

  return (
    <div className="App">
      <Routes>
        
        <Route path="/" element={<AuthPage />} />
        <Route path="/weather" element={
          <div id="app__weather-wrapper">
            <h1 style={{textAlign: "center", marginTop: "10vh"}}>Weather in your city</h1>

            <AutocompletedInput 
              setTransition={setTransition}
              listOfCities={listOfCities}
              changeCity={changeCity}
              setWarningFlag={setWarningFlag}
              debouncedCity={debouncedCity}
            />
            <div id="app__weather__cityCard">
              {city && <CityCard city={city} setHistory={setHistory} warningFlag={warningFlag} setWarningFlag={setWarningFlag}/>}
            </div>

            <div style={{display: "flex"}} id="app__weather__historyBar">
              <HistoryBar history={history} />
            </div>
          </div>       
        }>
        </Route>
        <Route path="*" element={<Navigate to="/"/>} ></Route>
      </Routes>
    </div>
  );
}

// on auth page make a button "don't care, didn't ask" to skip the auth form
// if skipped, search will be saved in localStorage instead of mongoDB

export default App;
