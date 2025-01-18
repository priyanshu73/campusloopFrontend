import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Define the border animation
const borderBeamAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const RegisterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #000000; /* Dark background */
    color: #ffffff; /* Text color */
`;


const RegisterForm = styled.form`
    background-color: #1e1e1e;
    padding: 2rem;
    border-radius: 10px;
    width: 100%;
    max-width: 400px;
    position: relative;
    isolation: isolate; // This helps with z-index stacking

    &::before {
        content: '';
        position: absolute;
        top: -1.2px;
        left: -1.2px;
        right: -1.2px;
        bottom: -1.2px;
        border-radius: 12px; // Slightly larger than the form's border-radius
        background: linear-gradient(
            90deg,
            #000000,
            #ffffff,
            #0000ff,
            #4b0082,
            #006400,
            #000000,
            #ee82ee
        );
        background-size: 200% 200%;
        animation: ${borderBeamAnimation} 4s linear infinite;
        z-index: -1;
        filter: blur(0px); // Adds the glow effect
    }

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: #1e1e1e;
        border-radius: 10px;
        z-index: -1;
    }
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 1rem;
    color: #ffffff;
`;

const Error = styled.p`
    color: #ff5252;
    text-align: center;
    margin-bottom: 1rem;
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

const Button = styled.button`
    width: 100%;
    padding: 0.8rem;
    background-color: #6200ea; /* Primary dark theme color */
    color: #ffffff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: #3700b3; /* Hover effect */
    }
`;

const SignInLink = styled.p`
    text-align: center;
    margin-top: 1rem;
    color: #F7ECCB;
    font-weight: 600;

    a {
        color: #2B6ABC; 
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [collegeName, setCollegeName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors
        try {
            const response = await fetch('http://localhost:3500/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password, collegeName }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Registration failed');
            }
            const data = await response.json();
            alert('Registration successful, Proceed to login');
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <RegisterContainer>
            <RegisterForm onSubmit={handleSubmit}>
                <Title>Create an Account</Title>
                <p style={{ color: 'gray' }}>Join CampusLoop where favors meet opportunities</p>
                {error && <Error>{error}</Error>}
                <Input
                    type="email"
                    placeholder="your.email@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    placeholder="Enter your college name"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    required
                />
                <Button type="submit">Register</Button>
                <SignInLink>
                    Already have an account? <a href="/login">Sign in</a>
                </SignInLink>
            </RegisterForm>
        </RegisterContainer>
    );
};

export default Register;
