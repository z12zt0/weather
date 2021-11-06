import { Link } from "react-router-dom";
import { TextField, FormControl, Box, Button } from "@mui/material";

function AuthPage() {
    return (
        <Box id="app__auth" sx={{width: "100vw", height: "100vh", display: "flex", placeContent: "center"}}>
            <FormControl sx={{display: "flex", placeContent: "center", width: "50vw"}}>
                {/* <label htmlFor="input-email">Email</label>
                <input className="input_auth" id="input-email" type="email" placeholder="email@mail.com"></input>

                <label htmlFor="input-email">Password</label>
                <input className="input_auth" id="input-password" type="password" placeholder="*****"></input> */}
                <h1>Let's authorize you</h1>
                <TextField
                    id="input_auth_email"
                    helperText="Email"
                    placeholder="Email@mail.com"
                    variant="outlined"
                    type="email"
                >    
                </TextField>

                <TextField
                    id="input_auth_password"
                    helperText="Password"
                    placeholder="Your password goes here..."
                    variant="outlined"
                    type="password"
                >    
                </TextField>


                <Link to="/weather" style={{textDecoration: "none"}}>
                    <Button variant="contained" size="large" type="submit">Enter</Button>
                </Link>
            </FormControl>
        </Box>
        
    )
}

export default AuthPage;