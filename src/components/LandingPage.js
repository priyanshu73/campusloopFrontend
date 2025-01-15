// filepath: /C:/Users/Asus/Desktop/loopcampusfrontend/src/components/LandingPage.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './Auth/AuthProvider';
import '../global.css'; // Import the global CSS file.
import backgroundImage from '../imgs/background.jpg'; // Import the background image

const LandingPage = () => {
    const { auth } = useContext(AuthContext); // Get the authentication status

    return (
        <div className="landing-page">
            <div className="landing-page-header">
                <h1 className="landing-page-title">Welcome to CampusLoop</h1>
                <i className="fas fa-gavel hammer-icon"></i> {/* Add hammer icon */}
            </div>
            <div className="landing-page-image-container">
                <img src={backgroundImage} alt="Background" className="landing-page-image" />
                <div className="landing-page-overlay">
                    <p className="landing-page-description">Your one-stop platform for auctions and bidding.</p>
                    <div className="landing-page-info">
                        <p>Create an auction to ask someone to do a favor, complete a small task, or sell your items.</p>
                        <p>Join our community and start bidding today!</p>
                    </div>
                    {!auth && (
                        <Link to="/login">
                            <button className="landing-page-button">Login</button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;