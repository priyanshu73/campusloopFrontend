import React,{ useContext }from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

const AuctionItem = ({ auction }) => {

    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick = (e) => {
        if (!auth) {
            e.preventDefault(); // Prevent the default link action
            navigate('/login'); // Redirect to login page if user is not authenticated
        }
    };

    return (
        <li className="auction-item">
            <Link to={`/auction/${auction.id}`} className="auction-link" onClick={handleClick}>
                <div className="auction-item-content">
                    <span className="auction-title">{auction.title}</span>
                    <span className="auction-ask-price">${auction.askPrice}</span>
                </div>
            </Link>
        </li>
    );
};

export default AuctionItem;