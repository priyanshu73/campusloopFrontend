import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Auth/AuthProvider';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('http://localhost:3500/api/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                },
            });
            const data = await response.json();
            setUser(data);
        };

        fetchUser();
    }, [auth.token]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile">
            <h1>User Profile</h1>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            {/* Add more user details as needed */}
        </div>
    );
};

export default UserProfile;