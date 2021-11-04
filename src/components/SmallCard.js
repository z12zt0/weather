import { Card, CardContent, Box, Typography, CardMedia } from "@mui/material";

function SmallCard({city, temperature, icon, photo}) {
    console.log("SMALL CARD", city)
    return (
        <Card sx={{ display: 'flex', justifyContent: "space-between", m: '15px' }}>
            <Box sx={{display: "flex", alignItems: "center"}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h3">
                        {city}
                    </Typography>
                </CardContent>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                <CardMedia
                    component="img"
                    sx={{ width: "auto" }}
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
}

export default SmallCard;