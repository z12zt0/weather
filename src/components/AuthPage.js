import { useNavigate } from "react-router-dom";
import { TextField, FormControl, Box, Button } from "@mui/material";
import "../CSS/authPage.css";

function AuthPage() {
    const navigate = useNavigate();

    function submitHandler(e) {
        e.preventDefault();
        // can use location.replace as an alternative
        navigate("weather");
    }

    return (
        <Box id="app__auth">
            <FormControl id="app__auth__form" >
                <h1>Let's authorize you</h1>
                <p>P.S. this is a dummy-page, so you can just press the "Enter" button to continue</p>
                <TextField
                    label="Email"
                    helperText="Please enter your email"
                    placeholder="Email@mail.com"
                    variant="outlined"
                    type="email"
                    required
                >    
                </TextField>

                <TextField
                    label="Password"
                    helperText="Please enter your password"
                    placeholder="Your password goes here..."
                    variant="outlined"
                    type="password"
                    required
                    sx={{mt: "10px"}}
                >    
                </TextField>
                <Button 
                    onClick={(e) => submitHandler(e)} 
                    variant="contained" 
                    size="large" 
                    type="submit">
                        Enter
                </Button>
            </FormControl>
        </Box>
        
    )
}

export default AuthPage;