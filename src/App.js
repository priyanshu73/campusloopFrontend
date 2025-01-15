import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AuthProvider, { AuthContext } from './components/Auth/AuthProvider';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AuctionList from './components/Auction/AuctionList';
import AuctionDetails from './components/Auction/AuctionDetails';
import './global.css'; // Import the global CSS
import LandingPage from './components/LandingPage';
const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <AuthContext.Consumer>
                                {({ auth, logout }) => (
                                    auth ? (
                                        <>
                                            <li><Link to="/auctions">Auctions</Link></li>
                                            <li><button onClick={logout}>Logout</button></li>
                                        </>
                                    ) : (
                                        <>
                                            <li><Link to="/login">Login</Link></li>
                                            <li><Link to="/register">Register</Link></li>
                                        </>
                                    )
                                )}
                            </AuthContext.Consumer>
                        </ul>
                    </nav>
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