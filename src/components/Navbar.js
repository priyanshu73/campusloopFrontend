import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "./Auth/AuthProvider";

// Styled components for the navbar
const NavBarContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #121212; /* Dark background for the navbar */
  padding: 0.65rem 1rem;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  width: fit-content;
  height: fit-content; 
  margin: 1rem auto; /* Centers the navbar horizontally */
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 2rem;
`;

const NavItem = styled.li`
  position: relative;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? "#ffffff" : "#aaa")}; /* White for active, lighter gray for others */
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  background-color: ${({ isActive }) => (isActive ? "#2c2c2c" : "transparent")}; /* Dark background for active */
  
  &:hover {
    background-color: #3a3a3a; /* Slightly lighter gray background on hover */
    color: #ffffff; /* Bright white text on hover */
  }
`;


const StyledButton = styled.button`
  background-color: ${({ isActive }) => (isActive ? "#2c2c2c" : "transparent")};
  border: none;
  color: ${({ isActive }) => (isActive ? "#ffffff" : "#aaa")};
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #3a3a3a; /* Slightly lighter gray background on hover */
    color: #ffffff; 
  }
`;


const ActiveIndicator = styled.div`
  position: absolute;
  top: -16px; /* Tubelight on top */
  left: 50%;
  transform: translateX(-50%);
  height: 5px;
  width: 50%;
  background-color: #ffffff;
  border-radius: 5px;
  opacity: ${({ isActive }) => (isActive ? "1" : "0")};
  transition: opacity 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  box-shadow: 0 0 10px 4px rgba(255, 255, 255, 0.6); /* Glow effect */
`;

const NavBar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logging out
  };

  const currentPath = window.location.pathname;

  return (
    <NavBarContainer>
      <NavList>
        <NavItem>
          <StyledLink to="/" isActive={currentPath === "/"}>
            Home
            <ActiveIndicator isActive={currentPath === "/"} />
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/auctions" isActive={currentPath === "/auctions"}>
            Auctions
            <ActiveIndicator isActive={currentPath === "/auctions"} />
          </StyledLink>
        </NavItem>
        {auth ? (
          <NavItem>
            <StyledButton onClick={handleLogout} isActive={false}>
              Logout
            </StyledButton>
          </NavItem>
        ) : (
          <>
            <NavItem>
              <StyledLink to="/login" isActive={currentPath === "/login"}>
                Login
                <ActiveIndicator isActive={currentPath === "/login"} />
              </StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/register" isActive={currentPath === "/register"}>
                Register
                <ActiveIndicator isActive={currentPath === "/register"} />
              </StyledLink>
            </NavItem>
          </>
        )}
      </NavList>
    </NavBarContainer>
  );
};

export default NavBar;
