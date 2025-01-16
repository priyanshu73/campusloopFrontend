// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
//  // Import the CSS file
// import BidForm from './BidForm';
// const AuctionDetails = () => {
//     const { id } = useParams();
//     const [auction, setAuction] = useState(null);
//     const [bidders, setBidders] = useState([]);
//     const [error, setError] = useState('');
//     const [showBidForm, setShowBidForm] = useState(false); // State to manage bid form visibility
//     const baseUrl = 'http://localhost:3500';

//     useEffect(() => {
//         const fetchAuctionDetails = async () => {
//             try {
//                 const token = localStorage.getItem('jwtToken'); // Retrieve the token from localStorage

//                 const response = await fetch(`${baseUrl}/favor/${id}`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
//                     },
//                 });

//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     setError(errorData.error);
//                     return;
//                 }

//                 const favor = await response.json();
//                 setAuction(favor);
//                 setBidders(favor.bids);
//             } catch (error) {
//                 setError(error.message);
//             }
//         };

//         fetchAuctionDetails();
//     }, [id]);

//     const handleNewBid = (newBid) => {
//         setBidders((prevBidders) => [newBid,...prevBidders]);
//     };

//     const isCreator = () => {
//         const user = JSON.parse(localStorage.getItem('user'));
//         return auction && user && auction.creator.id === user.id;
//     };

//     if (error) {
//         return <p className="error-message">{error}</p>;
//     }

//     if (!auction) {
//         return <p className="loading-message">Loading...</p>;
//     }

//     return (
//         <div className="auction-details-container">
//             <h1>{auction.title}</h1>
//             <p className="auction-description">{auction.description}</p>
//             <p className="auction-ask-price">Ask Price: ${auction.askPrice}</p>
//             <p className="auction-creator">Created by: {auction.creator.username}</p>
//             <p className="auction-created-at">Created at: {new Date(auction.createdAt).toLocaleString()}</p>
//             {!isCreator() && (
//                 <>
//                     <button className="bid-button" onClick={() => setShowBidForm(!showBidForm)}>Bid</button>
//                     {showBidForm && <BidForm auctionId={id} onNewBid={handleNewBid} />}
//                 </>
//             )}
//             <h2 className="bidders-header">Bidders</h2>
//             <ul className="bidders-list">
//                 {bidders.map((bidder) => (
//                     <li key={bidder.id} className="bidder-item">
//                         <span>{bidder.user.username}</span>  - 
//                         <span>{new Date(bidder.createdAt).toLocaleString('en-US', {
//                             year: 'numeric',
//                             month: 'short',
//                             day: 'numeric',
//                             hour: '2-digit',
//                             minute: '2-digit',
//                             second: '2-digit'
//                         })}</span> -  <span>Bid: ${bidder.amount}</span>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default AuctionDetails;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BidForm from './BidForm';

const AuctionDetailsContainer = styled.div`
  background-color: #1a1a2e;
  color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  margin-bottom: 5px;
  font-size: 18px;
`;

const Info = styled.p`
  margin-bottom: 10px;
  font-size: 16px;
  color: #b0b0b0;
`;

const AskPrice = styled.div`
  font-size: 18px;
  font-weight: bold;
  background: #4caf50;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  width: fit-content;
  margin: 10px 0;
`;

const BiddersHeader = styled.h2`
  color: #4caf50;
  margin-top: 20px;
`;

const BidderList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const BidderItem = styled.li`
  background-color: #2e2e4e;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BidderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const BidderName = styled.span`
  font-weight: bold;
`;

const BidAmount = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #4caf50;
`;

const AcceptButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #45a049;
  }
`;

const BidButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const AuctionDetails = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bidders, setBidders] = useState([]);
  const [error, setError] = useState('');
  const [showBidForm, setShowBidForm] = useState(false);
  const baseUrl = 'http://localhost:3500';

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(`${baseUrl}/favor/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
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
    setBidders((prevBidders) => [newBid, ...prevBidders]);
  };

  const isCreator = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return auction && user && auction.creator.id === user.id;
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!auction) {
    return <p>Loading...</p>;
  }

  return (
    <AuctionDetailsContainer>
      <Title>{auction.title}</Title>
      <Description>{auction.description}</Description>
      <AskPrice>Ask Price: ${auction.askPrice}</AskPrice>
      <Info>Created by: {auction.creator.username}</Info>
      <Info>Created at: {new Date(auction.createdAt).toLocaleString()}</Info>

      {!isCreator() && (
        <>
          <BidButton onClick={() => setShowBidForm(!showBidForm)}>
            Bid
          </BidButton>
          {showBidForm && <BidForm auctionId={id} onNewBid={handleNewBid} />}
        </>
      )}

      <BiddersHeader>Bidders</BiddersHeader>
      <BidderList>
        {bidders.map((bidder) => (
          <BidderItem key={bidder.id}>
            <BidderInfo>
              <BidderName>{bidder.user.username}</BidderName>
              <span>
                {new Date(bidder.createdAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </span>
            </BidderInfo>
            <BidAmount>${bidder.amount}</BidAmount>
            {isCreator() && <AcceptButton>Accept Bid</AcceptButton>}
          </BidderItem>
        ))}
      </BidderList>
    </AuctionDetailsContainer>
  );
};

export default AuctionDetails;
