import { Box, Alert, AlertTitle, Typography } from "@mui/material";

function AlertBox({alert}) {
    return (
        <Box className="alert-box">
            <Alert severity="error" className="alert-box__time">
                <AlertTitle className="alert-box__title">{alert.event}</AlertTitle>
                {"Start: " + new Date(alert.start*1000).toLocaleDateString() +"\n"}
                {"End: " + new Date(alert.end*1000).toLocaleDateString() }
            </Alert>
            <Typography className="alert-box__description" component="main">
                {alert.description}
            </Typography>
            <Typography className="alert-box__sender">
                {alert.sender_name}
            </Typography>
        </Box>
    )
}

export default AlertBox;