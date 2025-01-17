import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../Auth/AuthProvider';
import { submitBid } from './BidForm';

// Styled components
export const StyledAuctionItem = styled.li`
    list-style: none;
    padding: 1.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 93%;
    margin: 1rem 0;
`;

export const AuctionCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const AuctionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled.h3`
    font-size: 1rem;
    font-weight: bold;
    margin: 0;
    color: #333;
`;

const Button = styled.button`
    background-color: #6200ea; /* Primary color */
    color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #3700b3; /* Darker shade on hover */
    }

    &:not(:last-child) {
        margin-right: 0.5rem; /* Add margin to all but the last button */
    }
`;

const CancelButton = styled(Button)`
    background-color: #f44336; /* Red color for cancel */
    
    &:hover {
        background-color: #d32f2f; /* Darker red on hover */
    }
`;

export const BidStatus = styled.span`
    font-size: 0.8rem;
    font-weight: bold;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    background-color: ${({ active }) => (active ? '#000' : '#f0f0f0')};
    color: ${({ active }) => (active ? '#fff' : '#888')};
    white-space: nowrap;
`;

export const AuctionDetails = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`;

export const PriceSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.5rem;
    flex: 1;
`;

export const Label = styled.span`
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 0.2rem;
`;

export const Price = styled.span`
    font-size: 1.1rem;
    font-weight: bold;
    color: #28a745;
`;

export const AuctionActions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: bold;
    text-align: center;
    flex: 1;
    margin: 0 0.25rem;
    background-color: ${({ secondary }) => (secondary ? '#f0f0f0' : '#808080')};
    color: ${({ secondary }) => (secondary ? '#333' : '#fff')};
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ secondary }) => (secondary ? '#e0e0e0' : '#333')};
    }
`;
const AuctionItem = ({ auction }) => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showBidInput, setShowBidInput] = useState(false);
    const [bidAmount, setBidAmount] = useState('');
    const [error, setError] = useState('');
    const baseUrl = 'http://localhost:3500';

    const handleClick = (e) => {
        if (!auth) {
            e.preventDefault();
            navigate('/login');
        }
    };

    const handlePlaceBidClick = (e) => {
        e.preventDefault();
        setShowBidInput(true);
    };

    const handleCancelClick = () => {
        setShowBidInput(false);
        setBidAmount('');
    };

    const handleSubmitClick = async () => {
        setError(''); // Clear any previous errors

        const token = localStorage.getItem('jwtToken'); // Assuming the token is stored in localStorage

        if (!token) {
            setError('User is not authenticated');
            return;
        }

        try {
            const newBid = await submitBid({
                amount: bidAmount,
                auctionId: auction.id,
                userId: auth.user.id,
                token,
                baseUrl,
            });
            setBidAmount('');
            setShowBidInput(false);
            // onNewBid(auction.id, newBid);
        } catch (error) {
            setError(error.message);
        }
    };

    const lowestBid = auction.bids && auction.bids.length > 0 
        ? Math.min(...auction.bids.map(bid => bid.amount)) 
        : null;

    if (auction.status === 'PENDING') {
        return (
            <StyledAuctionItem>
                <AuctionCard>
                    <AuctionHeader>
                        <Title>{auction.title}</Title>
                        <BidStatus active={!!lowestBid}>
                            {lowestBid ? 'Active Bids' : 'No Bids Yet'}
                        </BidStatus>
                    </AuctionHeader>
                    <AuctionDetails>
                        <PriceSection>
                            <Label>Ask Price</Label>
                            <Price>${auction.askPrice}</Price>
                        </PriceSection>
                        <PriceSection>
                            <Label>Current Bid</Label>
                            <Price>
                                {lowestBid !== null ? `$${lowestBid}` : '-'}
                            </Price>
                        </PriceSection>
                    </AuctionDetails>
                    <AuctionActions>
                        <StyledLink to={`/auction/${auction.id}`} onClick={handleClick} secondary>
                            View Details
                        </StyledLink>
                        {showBidInput ? (
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="number"
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                    placeholder="Enter your bid"
                                    style={{ padding: '0.5rem', borderRadius: '4px', marginRight: '0.5rem' }}
                                />
                                <Button onClick={handleSubmitClick}>
                                    Submit
                                </Button>
                                <CancelButton onClick={handleCancelClick}>
                                    Cancel
                                </CancelButton>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                            </div>
                        ) : (
                            <StyledLink to="#" onClick={handlePlaceBidClick}>
                                Place Bid
                            </StyledLink>
                        )}
                    </AuctionActions>
                </AuctionCard>
            </StyledAuctionItem>
        );
    }

    return null;
};

export default AuctionItem;