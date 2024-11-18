import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { Typography, Button, } from '@mui/material';
import wallpaper from "../assets/wallpaper.jpg"
import user_icon from "../assets/user.png"

const Login = () => {
    const navigate_route = useNavigate();

    return (

        <div style={{
            width: "100%",
            marginTop: "-7vh",
            height: "107vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${wallpaper})`,
            backgroundPosition: "center",
            opacity: 0.78
        }}>

            <Typography variant="h3" color="#F0F0F0" sx={{
                marginTop: "20vh",
                marginBottom: "10vh",
                letterSpacing: 2,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                fontFamily: '"Playwrite US Trad", sans-serif'
            }} >
                <b> Write Collaboratively</b>
            </Typography>

            <div style={{ padding: "3vh", backgroundColor: 'gray', opacity: 0.8, alignItems: "center", display: "flex", flexDirection: "column", borderRadius: "1vh" }}>
                <img src={user_icon}
                    style={{ width: '80px', height: '80px', marginBottom: "1vh" }}
                />

                <GoogleLogin
                    onSuccess={(response) => {
                        navigate_route('/home');
                    }}
                    onError={(error) => {
                        console.error('Login Failed', error);
                    }}
                />
            </div>
        </div>
    );
};

export default Login;