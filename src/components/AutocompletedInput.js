import { Autocomplete, TextField } from "@mui/material";

function AutocompletedInput({listOfCities, setTransition, changeCity, setWarningFlag, debouncedCity}) {
    return (
        <div id="input-wrapper" style={{marginTop: "20vh", transition: "margin-top 500ms"}}>
              <Autocomplete 
                freeSolo
                id="input-city"
                options={listOfCities}
                sx={{ width: "75vw", m: "auto", mb: "3vh"}}
      
                onFocus={() => {
                  setTransition("input-wrapper", true);
                }}
                onBlur={() => {
                  setTransition("input-wrapper", false);
                }}
      
                onChange={(e, newValue) => {
                  changeCity(newValue?.split(",")[0]);
                  setWarningFlag(flag => false);
                }}
                onInput={async(e) => {
                  await debouncedCity(e.target.value);            
                }}
                
                renderInput={(params) => <TextField variant="outlined" {...params} label="Enter your city..." />}></Autocomplete>
            </div>
    )
}

export default AutocompletedInput;