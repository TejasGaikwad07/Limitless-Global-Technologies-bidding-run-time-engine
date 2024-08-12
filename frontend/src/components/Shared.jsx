import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = () => (
  <StyledHeader>
    <h1>Bidding Engine</h1>
  </StyledHeader>
);

export const Sidebar = ({ role }) => (
  <StyledSidebar>
    {role === "Bidder" ? (
      <>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/invitations">Invitations</Link>
        <Link to="/rank">Current Rank</Link>
      </>
    ) : (
      <>
        <Link to="/create-bid">Create Bid</Link>
        <Link to="/manage-bids">Manage Bids</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </>
    )}
  </StyledSidebar>
);

export const Footer = () => (
  <StyledFooter>
    <p>&copy; 2024 Bidding Engine</p>
  </StyledFooter>
);

const StyledHeader = styled.header`
  /* styling */
`;
const StyledSidebar = styled.nav`
  /* styling */
`;
const StyledFooter = styled.footer`
  /* styling */
`;
