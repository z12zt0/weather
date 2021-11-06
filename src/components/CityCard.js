import getLocation from "./fetchFuncs/getLocation.js";
import getWeather from "./fetchFuncs/getWeather.js";
import { useEffect, useState } from "react";
import getPhoto from "./fetchFuncs/getPhoto.js";
import { Card, CardMedia, Typography, CardActions, CardContent, Button, Alert, CircularProgress, Box } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AlertBox from "./AlertBox.js";

function CityCard({city, setHistory, warningFlag, setWarningFlag}) {
    const [weatherData, setWeatherData] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getData(city) {
        setLoading(true);
        let location = await getLocation(city);
        let photosURL = await getPhoto(city);  
        let currentWeather = await getWeather(location.lon, location.lat);

        setPhotoURL(photosURL);
        setWeatherData(currentWeather);
        setLoading(false);

        return currentWeather;
    }

    useEffect(() => {
            getData(city);
    }, [city]);

    useEffect(() => {
        if (!loading || !weatherData) return;
        setHistory(past =>{ 
            return {...past, [`${Date.now()}`]: { city, temperature: weatherData.current.temp, icon: weatherData.current.weather[0].icon, photo: photoURL[1]}}
        })
    }, [weatherData]); // this is not a good thing to do (why would this component save stuff in history???)

    if (loading) {
        return (
         <div style={{margin: "auto", width: "100vw", display: "flex", placeContent: "center" }}>
            <CircularProgress color="inherit" sx={{m: "15vh"}}/>   
        </div>
        )
    }
    // for the icon - http://openweathermap.org/img/wn/{icon}@{times(0, 2, 4)}x.png
    return (
        <div>
            <Card sx={{maxWidth: "75vw", margin: "auto",}}>
                <CardMedia
                    sx={{minHeight: "20vh", maxHeight: "153px"}}
                    component="img"
                    height="auto"
                    image={photoURL[0]}
                    alt={`${city} is really nice`}
                />
                <CardContent>
                    {/*WIP*/}
                    <Box id="main-card" sx={{display: "flex", justifyContent: "space-between", alignItems: "start"}}>
                        <div id="main-card__intoduction">
                            <Typography variant="h2" component="div">
                                {city}
                            </Typography>
                            <Typography gutterBottom variant="h5">
                                {"Timezone: " + weatherData.timezone}
                            </Typography>
                        </div>

                        <div id="main-card__percipitation">
                        <CardMedia
                            sx={{mb: "-5vh", mt:"-5vh"}}
                            component="img"
                            height="auto"
                            image={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
                            alt="current weather icon"
                        />
                        <Typography variant="body1" component="aside" sx={{m: "0", textAlign: "center"}}>
                            <h2 style={{marginBottom:"inherit", marginTop: "-4vh"}}>{weatherData.current.weather[0].main}</h2>
                            <p style={{marginTop: "inherit"}}>{weatherData.current.weather[0].description}</p>
                        </Typography>
                            
                        </div>
                    </Box>
                    {/*will re-make this tomorrow */}               
                    <Box variant="body" component="div" sx={{display: "flex", alignItems: "ceneter", justifyContent: "space-evenly"}}>
                        <Box sx={{mb: 0, pb: 0}} color="GrayText">
                            {/* unite them in a single class */}
                            <h3 style={{padding: "inherit", margin: "inherit"}}>{`Temperature: ${weatherData.current.temp+"℃"}`}</h3>
                            <h3 style={{padding: "inherit", margin: "inherit"}}>{`Feels like: ${weatherData.current.feels_like+"℃"}`}</h3>
                            
                        </Box>
                        <h3>{`Clouds: ${weatherData.current.clouds}%`}</h3>
                        <Box sx={{mb: 0, pb: 0, display: "flex", alignItems: "center", justifyContent: "space-evenly"}} color="GrayText">
                            {/* unite them in a single class */}
                            <h3 style={{padding: "inherit", margin: "inherit"}}>{`Wind speed: ${weatherData.current.wind_speed}`}</h3>
                            <h3 style={{padding: "inherit", margin: "inherit"}}>{<ArrowUpwardIcon titleAccess={weatherData.current.wind_deg+"deg"} sx={{transform: `translateY(3px) rotate(${weatherData.current.wind_deg}deg)`}}/>}</h3>
                        </Box>
                    </Box>
                    
                </CardContent>
                <CardActions>
                    {weatherData.alerts && 
                    <Button variant="oulined" size="medium" sx={{margin: "auto"}} onClick={() => setWarningFlag(flag => !flag)}>
                        <Alert severity="warning">There are currently warnings for this area</Alert>
                    </Button>}
                </CardActions>
                {warningFlag &&
                 <CardContent>
                     <Box>
                        <h2>Current weather alerts:</h2>
                        {weatherData.alerts.map(alert => 
                            <AlertBox key={`alert-${Date.now(alert.start)}`} alert={alert}/>
                        )}
                     </Box>
                </CardContent>}
            </Card>
            {/*weatherData && <div>{JSON.stringify(weatherData)}</div>*/}
        </div>
    )
}

export default CityCard;