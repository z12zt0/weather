import { useState, useEffect } from "react";
import {getCitiesByInput, debounce} from "./fetchFuncs/getInput.js";
import AuthPage from "./AuthPage.js";
import { Routes, Route, Navigate } from "react-router-dom";
import setTransition from "./additionalFuncs/setTransition.js"
import Weather from "./Weather";

/* TODO:
 1) WORK ON UI
*/

function App() {
  const [city, changeCity] = useState("");
  const [history, setHistory] = useState(null);
  const [listOfCities, setListOfCities] = useState([]);
  const [warningFlag, setWarningFlag] = useState(false);

  const setTransitionOfCity = setTransition(city);

  function trimHistory() {
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
  }, [history]);

  async function getEveryCity(input) {
    let fullNames = await getCitiesByInput(input);
    setListOfCities(fullNames);
  };
  const debouncedCity = debounce(getEveryCity, 300);

  return (
    <div className="App">
      <Routes>   
        <Route path="/" element={<AuthPage />} />
        <Route path="/weather" element={
          <Weather 
            setTransitionOfCity={setTransitionOfCity}
            listOfCities={listOfCities}
            debouncedCity={debouncedCity}
            changeCity={changeCity}
            city={city}
            setHistory={setHistory}
            history={history}
            warningFlag={warningFlag}
            setWarningFlag={setWarningFlag}
          />      
        }>
        </Route>
        <Route path="*" element={<Navigate to="/"/>} ></Route>
      </Routes>
    </div>
  );
}

export default App;
