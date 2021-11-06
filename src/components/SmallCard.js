import { Card, CardContent, Box, Typography, CardMedia } from "@mui/material";
import { memo } from "react";

function SmallCard({city, temperature, icon, photo}) {

    return (
        <Card sx={{ display: 'flex', justifyContent: "space-between", m: '15px' }}>
            <Box sx={{display: "flex", alignItems: "center"}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" sx={{fontSize: "2rem"}}>
                        {city}
                    </Typography>
                </CardContent>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <CardMedia
                    component="img"
                    sx={{ width: "auto"}}
                    image={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt="current weather"
                />
                <Typography variant="h4" color="text.secondary" component="div">
                        {temperature + "℃"}
                </Typography>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 150, pl: "10px"}}
                image={photo}
                alt="city image"
            />
            </Card>
    )
};

function compareProps(prevProps, nextProps) {
    // prevProps and nextProps have the same keys,
    // so no need to create 2 different vars
    const propsKeys = Object.keys(prevProps);

    for (let prop = 0; prop < propsKeys.length; prop++) {
        if (prevProps[propsKeys[prop]] !== nextProps[propsKeys[prop]]) {
            return false;
        }
    }
    return true;
}

const PureSmallCard = memo(SmallCard, compareProps);

export default PureSmallCard;