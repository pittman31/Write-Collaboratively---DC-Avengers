import wallpaper from "../assets/wallpaper.jpg"
import React, { useState } from 'react';
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
  const [notes_images, setNotesImages] = useState([]);
  const [preview, setImagePreview] = useState([]);
  const [notes_title, setNotesTitle] = useState('');
  const changePage = useNavigate();

  const onHomeClick = () => {
    changePage('/home')
  }

  const onNotesImageChange = (event) => {
    const uploaded_images = Array.from(event.target.files);
    setNotesImages((previousImages) => [...previousImages, ...uploaded_images]);

    const imagesPreviews = uploaded_images.map((image_file) => URL.createObjectURL(image_file));
    setImagePreview((previousImagesPreviews) => [...previousImagesPreviews, ...imagesPreviews]);
  };

  const onNotesTitleChange = (e) => {
    console.log("title changed", e.target.value)
    setNotesTitle(e.target.value);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('formTitle', notes_title);
    notes_images.forEach((image_file, index) => {
      data.append('uploadedImages[]', image_file);
    });
    console.log('Submitted Data:', data.getAll('formTitle'), data.getAll('uploadedImages[]'));
    clearform();
  };

  const clearform = () => {
    setNotesImages([]);
    setNotesTitle('');
    setImagePreview([]);
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
          minWidth: 300,
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: 480,
          backgroundColor: '#fafafa',
          borderRadius: "2vh",
          backgroundColor: 'white',
          marginTop: "2rem",
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
          <TextField
            label="Title"
            required
            value={notes_title}
            fullWidth
            margin="normal"
            onChange={onNotesTitleChange}
          />

          <Button
            variant="contained"
            component="label"
            sx={{ marginLeft: "19vh", marginTop: "1rem", borderRadius: "3vh" }}>
            Browse Image
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={onNotesImageChange}
            />
          </Button>

          <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
            {preview.map((image_file, index) => (
              <Box item xs={5} sm={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="100"
                    image={image_file}
                    alt={`previewImage ${index}`}
                  />

                </Card>
              </Box>
            ))}
          </Box>

          <Card sx={{ display: 'flex', justifyContent: 'space-between', marginTop: "3rem" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ borderRadius: "3vh" }}
              color="primary"
            >
              Submit
            </Button>
            <Button
              variant="contained"
              sx={{ borderRadius: "3vh" }}
              onClick={clearform}
            >
              Clear
            </Button>
          </Card>
        </form>
      </Box>
    </div>

  </div>
};



export default ImageUpload;
