import { Card, Box, Typography, CardMedia } from "@mui/material";
import { memo } from "react";
import "../CSS/historySmallCard.css";


function SmallCard({city, temperature, icon, photo}) {

    return (
        <Card className="smallCard" id={`city-${city}`}>
            <Box>
                <Typography>
                    {city}
                </Typography>
            </Box>
            <Box>
                <CardMedia
                    component="img"
                    id={`cityIcon-${icon}`}
                    image={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt="current weather"
                />
                <Typography variant="h4" color="text.secondary" component="div">
                        <p id={`cityTemp-${city}`}>{temperature + "℃"}</p>
                </Typography>
            </Box>
            <CardMedia
                component="img"
                id={`cityImg-${city}`}
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