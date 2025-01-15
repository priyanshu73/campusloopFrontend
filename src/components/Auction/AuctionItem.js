import React from 'react';
import { Link } from 'react-router-dom';

const AuctionItem = ({ auction }) => {
    return (
        <li className="auction-item">
            <Link to={`/auction/${auction.id}`} className="auction-link">
                <div className="auction-item-content">
                    <span className="auction-title">{auction.title}</span>
                    <span className="auction-ask-price">${auction.askPrice}</span>
                </div>
            </Link>
        </li>
    );
};

export default AuctionItem;