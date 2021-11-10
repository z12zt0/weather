import getLocation from "./fetchFuncs/getLocation.js";
import getWeather from "./fetchFuncs/getWeather.js";
import { useEffect, useState } from "react";
import getPhoto from "./fetchFuncs/getPhoto.js";
import { Card, CardMedia, Typography, CardActions, CardContent, Button, Alert, CircularProgress, Box } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AlertBox from "./AlertBox.js";
import "../CSS/cityCard.css";


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
         <div id="loading-banner">
            <CircularProgress color="inherit" sx={{m: "15vh"}}/>   
        </div>
        )
    }
    // for the icon - http://openweathermap.org/img/wn/{icon}@{times(0, 2, 4)}x.png
    return (
        <div>
            <Card id="mainCard" >
                <CardMedia
                    component="img"
                    height="auto"
                    image={photoURL[0]}
                    alt={`${city} is really nice`}
                />

                <CardContent>
                    <Box id="mainCard__display" >
                        <div>
                            <Typography variant="h2" component="div">
                                {city}
                            </Typography>
                            <Typography gutterBottom variant="h5">
                                {"Timezone: " + weatherData.timezone}
                            </Typography>
                        </div>

                        <div id="mainCard__percipitation">
                            <CardMedia   
                                component="img"
                                height="auto"
                                image={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
                                alt="current weather icon"
                            />
                            <Typography variant="body1" component="aside">
                                <h2>{weatherData.current.weather[0].main}</h2>
                                <p>{weatherData.current.weather[0].description}</p>
                            </Typography>
                            
                        </div>
                    </Box>
                                 
                    <Box id="mainCard__addInfo" variant="body" component="div">
                        <Box color="GrayText">
                            <h3 className="inheritH3Text">{`Temperature: ${weatherData.current.temp+"℃"}`}</h3>
                            <h3 className="inheritH3Text">{`Feels like: ${weatherData.current.feels_like+"℃"}`}</h3>         
                        </Box>
                        <h3>{`Clouds: ${weatherData.current.clouds}%`}</h3>
                        <Box color="GrayText">
                            <h3 className="inheritH3Text">{`Wind speed: ${weatherData.current.wind_speed}`}</h3>
                            <h3 className="inheritH3Text">{<ArrowUpwardIcon titleAccess={weatherData.current.wind_deg+"deg"} sx={{transform: `translateY(3px) rotate(${weatherData.current.wind_deg}deg)`}}/>}</h3>
                        </Box>
                    </Box>  
                </CardContent>

                <CardActions>
                    {weatherData.alerts && 
                    <Button id="warning-button" variant="oulined" size="medium" onClick={() => setWarningFlag(flag => !flag)}>
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
        </div>
    )
}

export default CityCard;