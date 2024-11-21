import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/Login';
import ImageUpload from './components/ImageUpload';

function App() {
    return (
      <GoogleOAuthProvider clientId="">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/upload" element={<ImageUpload />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    );
  }
  
  export default App;
