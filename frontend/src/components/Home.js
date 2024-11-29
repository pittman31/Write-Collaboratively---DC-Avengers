import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import wallpaper from "../assets/wallpaper.jpg"
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

export const Home = () => {
    const [data, setData] = useState([
        { id: "109zpwgU7kLhW5EeLEGcaunTgS0wwOLdufQINBhSqOSY"}
    ]);
    const changePage = useNavigate();

    useEffect(() => {
    }, []);

    const onUploadImgClick = () => {
        changePage('/upload')
    }

    const onDataClick = (id) => {
        changePage(`/edit/${id}`);
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
            padding: "1vh"
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
                <Button style={{ marginRight: "6vh" , borderRadius:"3vh"}} type='button' variant='contained' onClick={onUploadImgClick}> Upload Image </Button>
            </div>
        </div>

        <div>
        <Typography variant="h4" align="center" sx={{
          letterSpacing: 2,
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          fontFamily: '"Playwrite US Trad", sans-serif'
        }} gutterBottom>
          Upload History
        </Typography>

            <TableContainer component={Paper} sx={{ 
                    backgroundColor: 'lightgray', 
                }} style={{ opacity: 0.8 }}>
                <Table sx={{ minWidth: 400 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ backgroundColor: 'gray' }} ><b>DocumentID</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index} onClick={() => onDataClick(row.id)} style={{ cursor: 'pointer' }}>
                                <TableCell align="center">{row.id}</TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>

    </div>


}
