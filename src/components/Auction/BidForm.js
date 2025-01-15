import React, { useState, useContext } from 'react';
import { AuthContext } from '../Auth/AuthProvider';
 // Import the CSS file

const BidForm = ({ auctionId, onNewBid }) => {
    const [amount, setAmount] = useState('');
    const { auth } = useContext(AuthContext);
    const [error, setError] = useState('');
    const baseUrl = 'http://localhost:3500';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

        const token = localStorage.getItem('jwtToken'); // Assuming the token is stored in localStorage

        if (!token) {
            setError('User is not authenticated');
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/bid`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    amount: parseFloat(amount), // Convert amount to float
                    favorId: auctionId,

                    userId : auth.user.id
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error);
                return;
            }

            const newBid = await response.json();
            setAmount('');
            onNewBid(newBid); // Call the callback function to update the bidders list
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bid-form">
            <label>
                Bid Price:
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </label>
            <button type="submit" className="submit-bid-button">Submit</button>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
};

export default BidForm;