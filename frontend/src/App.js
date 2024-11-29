import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home} from './components/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/Login';
import ImageUpload from './components/ImageUpload';
import EditData from './components/EditData';

function App() {
    return (
      <GoogleOAuthProvider clientId="">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/upload" element={<ImageUpload />} />
            <Route path="/edit/:id" element={<EditData />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    );
  }
  
  export default App;
