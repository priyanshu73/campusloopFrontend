import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AuthProvider, { AuthContext } from './components/Auth/AuthProvider';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AuctionList from './components/Auction/AuctionList';
import AuctionDetails from './components/Auction/AuctionDetails';
import './global.css'; // Import the global CSS
import LandingPage from './components/LandingPage';
import NavBar from './components/Navbar';
const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/auctions" element={<AuctionList />} />
                        <Route path="/auction/:id" element={<AuctionDetails />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};



export default App;