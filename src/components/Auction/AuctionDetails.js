import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
 // Import the CSS file
import BidForm from './BidForm';
const AuctionDetails = () => {
    const { id } = useParams();
    const [auction, setAuction] = useState(null);
    const [bidders, setBidders] = useState([]);
    const [error, setError] = useState('');
    const [showBidForm, setShowBidForm] = useState(false); // State to manage bid form visibility
    const baseUrl = 'http://localhost:3500';

    useEffect(() => {
        const fetchAuctionDetails = async () => {
            try {
                const token = localStorage.getItem('jwtToken'); // Retrieve the token from localStorage

                const response = await fetch(`${baseUrl}/favor/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setError(errorData.error);
                    return;
                }

                const favor = await response.json();
                setAuction(favor);
                setBidders(favor.bids);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchAuctionDetails();
    }, [id]);

    const handleNewBid = (newBid) => {
        setBidders((prevBidders) => [newBid,...prevBidders]);
    };

    const isCreator = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return auction && user && auction.creator.id === user.id;
    };

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!auction) {
        return <p className="loading-message">Loading...</p>;
    }

    return (
        <div className="auction-details-container">
            <h1>{auction.title}</h1>
            <p className="auction-description">{auction.description}</p>
            <p className="auction-ask-price">Ask Price: ${auction.askPrice}</p>
            <p className="auction-creator">Created by: {auction.creator.username}</p>
            <p className="auction-created-at">Created at: {new Date(auction.createdAt).toLocaleString()}</p>
            {!isCreator() && (
                <>
                    <button className="bid-button" onClick={() => setShowBidForm(!showBidForm)}>Bid</button>
                    {showBidForm && <BidForm auctionId={id} onNewBid={handleNewBid} />}
                </>
            )}
            <h2 className="bidders-header">Bidders</h2>
            <ul className="bidders-list">
                {bidders.map((bidder) => (
                    <li key={bidder.id} className="bidder-item">
                        <span>{bidder.user.username}</span>  - 
                        <span>{new Date(bidder.createdAt).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        })}</span> -  <span>Bid: ${bidder.amount}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuctionDetails;