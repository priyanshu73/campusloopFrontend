import React, { useEffect, useState, useContext } from 'react';
import AuctionItem from './AuctionItem';
import { AuthContext } from '../Auth/AuthProvider';
 // Import the CSS file

const AuctionList = () => {
    const [auctions, setAuctions] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [askPrice, setAskPrice] = useState('');
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false); // State to manage form visibility
    const { auth } = useContext(AuthContext); // Access auth state
    const baseUrl = 'http://localhost:3500';

    useEffect(() => {
        const fetchAuctions = async () => {
            const response = await fetch(`${baseUrl}/favor`);
            const data = await response.json();
            setAuctions(data);
        };

        fetchAuctions();
    }, []);

    const handleCreateAuction = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

        const token = localStorage.getItem('jwtToken'); // Assuming the token is stored in localStorage

        if (!token || !auth || !auth.user || !auth.user.id) {
            setError('User is not authenticated');
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/favor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    askPrice: parseFloat(askPrice), // Convert askPrice to float
                    creatorId: auth.user.id
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error);
                return;
            }

            const newFavor = await response.json();
            setAuctions([...auctions,newFavor]);
            setTitle('');
            setDescription('');
            setAskPrice('');
            setShowForm(false); // Hide the form after successful submission
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="auction-container">
            <h1 className="auction-header">Auctions</h1>
            <button className="toggle-form-button" onClick={() => setShowForm(!showForm)}>
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
                    {error && <p>{error}</p>}
                </form>
            )}
           <ul className="auction-list">
            {auctions.slice().reverse().map((auction) => (
                <AuctionItem key={auction.id} auction={auction} />
            ))}
        </ul>
        </div>
    );
};

export default AuctionList;