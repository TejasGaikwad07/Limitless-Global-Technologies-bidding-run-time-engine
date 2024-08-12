import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container, Grid, Paper } from "@mui/material";
import styled from "styled-components";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <HomeContainer>
      <HeroSection>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Bidding Platform
        </Typography>
        <Typography variant="h5" gutterBottom>
          Your one-stop solution for collaborative bidding.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGetStarted}>
          Get Started
        </Button>
      </HeroSection>
      <FeaturesSection>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper style={{ padding: "2rem", textAlign: "center" }}>
                <Typography variant="h6">Create Bids</Typography>
                <Typography variant="body1">
                  Easily create and manage your bids.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper style={{ padding: "2rem", textAlign: "center" }}>
                <Typography variant="h6">Invite Bidders</Typography>
                <Typography variant="body1">
                  Invite others to participate in your bids.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper style={{ padding: "2rem", textAlign: "center" }}>
                <Typography variant="h6">Track Progress</Typography>
                <Typography variant="body1">
                  Monitor bids in real-time and view results.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </FeaturesSection>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  text-align: center;
  background: #f5f5f5;
  padding: 2rem 0;
`;

const HeroSection = styled.div`
  background: #3f51b5;
  color: white;
  padding: 4rem 0;
`;

const FeaturesSection = styled.div`
  padding: 4rem 0;
`;
