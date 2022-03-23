import './App.css';
import Navbar from './Components/Navbar';
import MainPage from './Components/MainPage';
import Footer from './Components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RandevuSorgula from './Components/RandevuSorgula';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<MainPage />} />
                <Route exact path='/randevu/:id' element={<RandevuSorgula />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
