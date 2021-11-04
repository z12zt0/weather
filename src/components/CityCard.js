import getLocation from "./fetchFuncs/getLocation.js";
import getWeather from "./fetchFuncs/getWeather.js";
import { useEffect, useState } from "react";
import getPhoto from "./fetchFuncs/getPhoto.js";
import { Card, CardMedia, Typography, CardActions, CardContent, Button, Alert, CircularProgress, Box } from "@mui/material";

function CityCard({city, setHistory}) {
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
    }, [weatherData]); // this is not a good thing to do

    if (loading) {
        return (
         <div style={{margin: "auto", width: "100vw", height: "100vh"}}>
            <h1>Loading...</h1>
            <CircularProgress color="inherit" />   
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
                    <Box id="main-card" sx={{display: "flex", justifyContent: "space-between"}}>
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
                            sx={{m: -1}}
                            component="img"
                            height="auto"
                            image={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
                            alt="current weather icon"
                        />
                            <h3>{weatherData.current.weather[0].main}</h3>
                            <p>{weatherData.current.weather[0].description}</p>
                        </div>
                    </Box>
                    {/*will re-make this tomorrow */}               
                    <Typography variant="body" color="text.secondary">
                        {weatherData.current.temp+"℃" + "\n"}
                        {weatherData.current.feels_like+"℃" + "\n"}
                        {weatherData.current.clouds + "\n"}
                        {weatherData.current.wind_speed + "\n"}
                        {weatherData.current.wind_deg}

                    </Typography>
                    
                </CardContent>
                <CardActions>
                    {weatherData.alerts && 
                    <Button variant="outlined" size="medium" sx={{margin: "auto"}}>
                        <Alert severity="warning">There are currently warnings for this area</Alert>
                    </Button>}
                </CardActions>
            </Card>
            {/*weatherData && <div>{JSON.stringify(weatherData)}</div>*/}
        </div>
    )
}

export default CityCard;