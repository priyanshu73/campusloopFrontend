import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuctionItem from './AuctionItem';
import { AuthContext } from '../Auth/AuthProvider';


const AuctionList = () => {
    const [auctions, setAuctions] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [askPrice, setAskPrice] = useState('');
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false); // State to manage form visibility
    const [loading, setLoading] = useState(true); // State to manage loading
    const { auth } = useContext(AuthContext); // Access auth state
    const navigate = useNavigate();
    const baseUrl = 'http://localhost:3500';

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                let url = `${baseUrl}/favor`;
                let options = {};

                if (auth) {
                    url = `${baseUrl}/favor/auth`;
                    const token = localStorage.getItem('jwtToken');
                    
                    options = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    };
                }

                const response = await fetch(url, options);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setAuctions(data);
                } else {
                    setError('Unexpected data format');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchAuctions();
    }, [auth]);

    const handleCreateAuction = async (e) => {
        e.preventDefault();
        if (!auth) {
            navigate('/login'); // Redirect to login page if user is not logged in
            return;
        }
        try {
            const response = await fetch(`${baseUrl}/favor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    askPrice: parseFloat(askPrice), // Convert askPrice to float
                    creatorId: auth.user.id // Use the authenticated user's ID as creatorId
                }),
            });
            const newAuction = await response.json();
            if (Array.isArray(auctions)) {
                setAuctions([...auctions, newAuction]);
            } else {
                setAuctions([newAuction]);
            }
            setShowForm(false);
            setTitle('');
            setDescription('');
            setAskPrice('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="auction-container">
            <h1 className="auction-header">Auctions</h1>
            <button className="toggle-form-button" onClick={() => {
                if (!auth) {
                    navigate('/login'); // Redirect to login page if user is not logged in
                } else {
                    setShowForm(!showForm);
                }
            }}>
                {showForm ? 'Cancel' : 'Create Auction'}
            </button>
            {showForm && (
                <form onSubmit={handleCreateAuction} className="auction-form">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Ask Price"
                        value={askPrice}
                        onChange={(e) => setAskPrice(e.target.value)}
                    />
                    <button type="submit">Create Auction</button>
                </form>
            )}
            {error && <div className="error">{error}</div>}
            <div className="auction-list">
                {loading ? (
                    <div className="loading">Loading...</div> // Show loading indicator inside auction-list div
                ) : (
                    auctions.map((auction) => (
                        <AuctionItem key={auction.id} auction={auction} /> // Ensure each child has a unique key
                    ))
                )}
            </div>
        </div>
    );
};

export default AuctionList;