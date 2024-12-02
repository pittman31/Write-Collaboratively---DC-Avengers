
import wallpaper from "../assets/wallpaper.jpg"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardMedia,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';



const ImageUpload = () => {
  const [notes_images, setNotesImages] = useState(null);
  const [preview, setImagePreview] = useState(null);
  const [notes_title, setNotesTitle] = useState('');
  const changePage = useNavigate();

  useEffect(() => {
    console.log("p1", preview);
    clearform(null);
    console.log("p2", preview);

  }, [])

  const onHomeClick = () => {
    changePage('/home')
  }

  const onNotesImageChange = (event) => {
    const uploaded_image = event.target.files[0];
    setNotesImages(uploaded_image);

    if (uploaded_image) {
      const imagesPreviews = URL.createObjectURL(uploaded_image);
      setImagePreview(imagesPreviews);
    }
    else {
      setImagePreview()

    }
  };

  const onNotesTitleChange = (e) => {
    console.log("title changed", e.target.value)
    setNotesTitle(e.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('docTitle', notes_title);
    data.append('imagefile', notes_images);

    console.log('Submitted Data:', data.getAll('docTitle'), data.getAll('imagefile'));

    axios.post("http://34.233.133.74:5000/upload_image", data)

      .then(response => {

        console.log('POST Request Response:', response);
        if (response['data']['status'] == 'success') {


          changePage("/Home")
        }

      })
      .catch(error => {
        console.error('Error:', error)

      });

    clearform();



  };


  const clearform = () => {
    setNotesImages([]);
    setNotesTitle('');
    setImagePreview(null);
  };

  return <div style={{
    width: "100%",
    marginTop: "-7vh",
    height: "107vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${wallpaper})`,
    backgroundPosition: "center",
    opacity: 0.78
  }}>

    <div style={{
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "2vh"
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
          marginRight: "auto",
          maxWidth: 700,
          backgroundColor: '#fafafa',
          borderRadius: "2vh",
          backgroundColor: 'white',
          padding: "2rem",
          opacity: 0.8,

        }} >
        <Typography variant="h4" align="center" sx={{
          letterSpacing: 2,
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          fontFamily: '"Playwrite US Trad", sans-serif'
        }} gutterBottom>
          Upload Image
        </Typography>
        <form onSubmit={onFormSubmit}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              label="Title"
              required
              value={notes_title}
              fullWidth
              margin="normal"
              onChange={onNotesTitleChange}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ borderRadius: "1vh", height: "3rem", marginTop: "1.25rem", marginLeft: "1rem" }}
              color="primary"
            >
              Submit
            </Button>

          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              component="label"
              sx={{ marginTop: "1rem", borderRadius: "3vh" }}>
              Browse Image
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={onNotesImageChange}
              />
            </Button>
            <Button
              variant="contained"
              sx={{ borderRadius: "1vh", marginTop: "1rem" }}
              onClick={clearform}
            >
              Clear
            </Button>
          </div>

          {preview && (
            <Box marginTop='2rem'>
              <Card>
                <CardMedia
                  component="img"
                  height="100"
                  image={preview}
                  alt="preview"
                />
              </Card>
            </Box>
          )}

        </form>
      </Box>
    </div>
  </div>
};



export default ImageUpload;