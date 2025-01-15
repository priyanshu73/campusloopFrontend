import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        try {
            const token = localStorage.getItem('jwtToken');
            const user = localStorage.getItem('user');
            if (token && user) {
                setAuth({ token, user: JSON.parse(user) });
            }
        } catch (error) {
            console.error('Failed to parse user from localStorage', error);
        }
    }, []);

    const login = (token, user) => {
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        setAuth({ token, user });
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;