import AutocompletedInput from "./AutocompletedInput";
import CityCard from "./CityCard";
import HistoryBar from "./HistoryBar";
import "../CSS/weather.css";


function Weather({setTransitionOfCity, 
    listOfCities, 
    changeCity,  
    debouncedCity, 
    city, 
    setHistory,
    history, 
    warningFlag,
    setWarningFlag}) {

    return (
        <div id="app__weather-wrapper">
            <h1>Weather in your city</h1>

            <AutocompletedInput 
              setTransition={setTransitionOfCity}
              listOfCities={listOfCities}
              changeCity={changeCity}
              setWarningFlag={setWarningFlag}
              debouncedCity={debouncedCity}
            />
            <div id="app__weather__cityCard">
              {city && <CityCard city={city} setHistory={setHistory} warningFlag={warningFlag} setWarningFlag={setWarningFlag}/>}
            </div>

            <div id="app__weather__historyBar">
              <HistoryBar history={history} />
            </div>
          </div> 
    )
}

export default Weather;