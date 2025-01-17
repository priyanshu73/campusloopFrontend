import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const floatAnimation = keyframes`
    0% {
        transform: translateY(0px) rotate(0deg);
    }
    50% {
        transform: translateY(-20px) rotate(5deg);
    }
    100% {
        transform: translateY(0px) rotate(0deg);
    }
`;

const glowAnimation = keyframes`
    0% {
        box-shadow: 0 0 5px #4a90e2, 0 0 5px #4a90e2, 0 0 7px #4a90e2;
    }
    50% {
        box-shadow: 0 0 10px #4a90e2, 0 0 5px #4a90e2, 0 0 15px #4a90e2;
    }
    100% {
        box-shadow: 0 0 5px #4a90e2, 0 0 5px #4a90e2, 0 0 7px #4a90e2;
    }
`;

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #000000; /* Dark background */
    color: #ffffff; /* Text color */
`;

const LoginCard = styled.div`
    position: relative;
    width: 100%;
    max-width: 400px;
    background: rgba(30, 30, 30, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
`;

const FloatingIcon = styled.div`
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 80px;
    background: #2B6ABC;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${floatAnimation} 3s ease-in-out infinite;

    &::before {
        content: '📋';  // Changed to clipboard/task icon
        font-size: 2rem;
    }
`;

const Title = styled.h2`
    color: #ffffff;
    text-align: center;
    margin: 2rem 0 0.5rem;
    font-size: 2rem;
    font-weight: 700;
`;

const Subtitle = styled.p`
    color: #9e9e9e;
    text-align: center;
    margin-bottom: 2rem;
    font-size: 0.9rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;


const Input = styled.input`
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 1rem;
    border: 1px solid #333;
    border-radius: 5px;
    background-color: #2a2a2a; /* Input background for dark mode */
    color: #ffffff; /* Text color */
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: #6200ea; /* Highlight color */
    }
`;
const SubmitButton = styled.button`
    padding: 1rem;
    background: linear-gradient(45deg, #2B6ABC, #1E88E5);
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    animation: ${glowAnimation} 2s infinite;

    &:hover {
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(1px);
    }
`;

const ErrorMessage = styled.p`
    color: #ff5252;
    text-align: center;
    margin-top: 1rem;
    font-size: 0.9rem;
`;

const RegisterLink = styled.p`
    text-align: center;
    margin-top: 1.5rem;
    color: #ffffff;

    a {
        color: #2B6ABC;
        text-decoration: none;
        font-weight: 600;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:3500/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error);
                return;
            }
            
            const data = await response.json();
            login(data.accessToken, data.user);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <LoginContainer>
            <LoginCard>
                <FloatingIcon />
                <Title>Welcome to CampusLoop</Title>
                <Subtitle>Your campus task marketplace</Subtitle>
                <Form onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            placeholder="Your college email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    <SubmitButton type="submit">
                        Sign In to Marketplace
                    </SubmitButton>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </Form>
                <RegisterLink>
                    New to CampusLoop? <a href="/register">Create an account</a>
                </RegisterLink>
            </LoginCard>
        </LoginContainer>
    );
};

export default Login;