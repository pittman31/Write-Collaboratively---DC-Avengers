import React, { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Typography, TextareaAutosize, Box } from '@mui/material';
import wallpaper from "../assets/wallpaper.jpg"
import HomeIcon from '@mui/icons-material/Home';
import axios from "axios";

const EditData = () => {
    const { id } = useParams();
    const changePage = useNavigate();
    const [formData, setFormData]=useState({content:"empty"});

    useEffect(() => {
        console.log("as page loads");
        getDocument();
        console.log("formData",formData)
    },[])

    const getDocument = () => {
        axios.post("http://54.90.144.150:5000/get_document", {id})
        .then(response => {
            console.log('POST Request Response:', response);
            console.log('response data, status',response['data']['status'])
            
            if (response['data']['status'] == 'success') {
                setFormData({
                    content: response['data']['content']
                });
            }

        })
        .catch(error => {
            console.error('Error:', error)

        });}


const onHomeClick = () => {
    changePage('/home')
}

const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

return (<div style={{
    width: "100%",
    marginTop: "-7vh",
    height: "107vh",
    alignItems: "center",
    padding: "2vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    backgroundImage: `url(${wallpaper})`,
    backgroundPosition: "center",
    opacity: 0.78
}}>

    <div style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "2vh",
        display: "flex",
        flexDirection: "row",
    }}>
        <Typography variant="h3" color="#F0F0F0" sx={{
            marginTop: "10vh",
            marginBottom: "10vh",
            letterSpacing: 2,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            fontFamily: '"Playwrite US Trad", sans-serif'
        }} >
            <b> Write Collaboratively</b>
        </Typography>

        <div>
            <HomeIcon fontSize="large" style={{ color: "white", width: "50px", height: "50px", marginRight: "60px", marginTop: "20px", cursor: "pointer" }}
                onClick={onHomeClick} />
        </div>
    </div>

    <div>
        <Box
            sx={{
                minWidth: 500,
                marginLeft: "auto",
                marginTop: "2rem",
                padding: "2rem",
                maxWidth: 480,
                backgroundColor: '#fafafa',
                borderRadius: "3vh",
                marginRight: "auto",
                opacity: 0.8,

            }} >
            <Typography variant="h4" sx={{
                letterSpacing: 2,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                fontFamily: '"Playwrite US Trad", sans-serif'
            }} gutterBottom>
                View Document
            </Typography>
            <form onSubmit={getDocument}>
            
                <TextareaAutosize
                    minRows={5}
                    style={{ width: '100%', marginTop: 16, padding: 8 }}
                    name="content"
                    value={formData.content}
                    onChange={onInputChange}
                />
                <Button variant="contained" color="primary" type="submit" style={{ borderRadius: "3vh", marginTop: 10 }}>
                    Refresh
                </Button>
            </form>
        </Box>
    </div>
</div>
);
};

export default EditData;
