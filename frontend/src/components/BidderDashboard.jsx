import React, { useEffect, useState } from "react";
import { connectToWebSocket } from "../utils/websocket";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  CircularProgress,
} from "@mui/material";
import styled from "styled-components";

const fetchInvitations = async () => {
  try {
    const response = await fetch("/api/bids/invitations");
    if (!response.ok) throw new Error("Failed to fetch invitations");
    return response.json();
  } catch (error) {
    console.error("Error fetching invitations:", error);
    return [];
  }
};

const fetchActiveBids = async () => {
  try {
    const response = await fetch("/api/bids/active");
    if (!response.ok) throw new Error("Failed to fetch active bids");
    return response.json();
  } catch (error) {
    console.error("Error fetching active bids:", error);
    return [];
  }
};

const BidInvitations = () => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvitations = async () => {
      const data = await fetchInvitations();
      setInvitations(data);
      setLoading(false);
    };
    loadInvitations();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Bid Invitations
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : invitations.length ? (
          <List>
            {invitations.map((invitation, index) => (
              <ListItem key={index}>{invitation.title}</ListItem>
            ))}
          </List>
        ) : (
          <Typography>No invitations available</Typography>
        )}
      </CardContent>
    </Card>
  );
};

const ActiveBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBids = async () => {
      const data = await fetchActiveBids();
      setBids(data);
      setLoading(false);
    };
    loadBids();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Active Bids
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : bids.length ? (
          <List>
            {bids.map((bid, index) => (
              <ListItem key={index}>{bid.title}</ListItem>
            ))}
          </List>
        ) : (
          <Typography>No active bids available</Typography>
        )}
      </CardContent>
    </Card>
  );
};

const RealTimeRanking = () => {
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ws = connectToWebSocket();
    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === "LEADERBOARD_UPDATE") {
        setRank(data.rank);
        setLoading(false);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Your Current Rank
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Typography>
            {rank !== null ? `Rank: ${rank}` : "Calculating..."}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  max-width: 800px;
  margin: auto;
`;

const BidderDashboard = () => {
  return (
    <DashboardContainer>
      <BidInvitations />
      <ActiveBids />
      <RealTimeRanking />
    </DashboardContainer>
  );
};

export default BidderDashboard;
