import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { connectToWebSocket } from "../utils/websocket";

export const CreateBid = () => {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([{ description: "", amount: 0 }]);

  const handleCreateBid = async () => {
    try {
      const response = await axios.post("/api/bids", { title, items });
      console.log("Bid created:", response.data);
    } catch (err) {
      console.error("Failed to create bid:", err);
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", amount: 0 }]);
  };

  return (
    <CreateBidContainer>
      <Typography variant="h4" gutterBottom>
        Create a New Bid
      </Typography>
      <TextField
        fullWidth
        label="Bid Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />
      {items.map((item, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              value={item.description}
              onChange={(e) =>
                handleItemChange(index, "description", e.target.value)
              }
              style={{ marginBottom: "1rem" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Amount"
              variant="outlined"
              value={item.amount}
              onChange={(e) =>
                handleItemChange(index, "amount", e.target.value)
              }
              style={{ marginBottom: "1rem" }}
            />
          </Grid>
        </Grid>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={addItem}
        style={{ marginBottom: "1rem" }}
      >
        Add Another Item
      </Button>
      <Button variant="contained" color="secondary" onClick={handleCreateBid}>
        Create Bid
      </Button>
    </CreateBidContainer>
  );
};

export const ManageBids = () => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get("/api/bids");
        setBids(response.data);
      } catch (err) {
        console.error("Failed to fetch bids:", err);
      }
    };
    fetchBids();
  }, []);

  return (
    <ManageBidsContainer>
      <Typography variant="h4" gutterBottom>
        Manage Your Bids
      </Typography>
      <List>
        {bids.map((bid) => (
          <ListItem key={bid._id}>
            <ListItemText
              primary={bid.title}
              secondary={`Number of items: ${bid.items.length}`}
            />
          </ListItem>
        ))}
      </List>
    </ManageBidsContainer>
  );
};

export const RealTimeLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const ws = connectToWebSocket();
    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === "LEADERBOARD_UPDATE") {
        setLeaderboard(data.leaderboard);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <RealTimeLeaderboardContainer>
      <Typography variant="h4" gutterBottom>
        Real-Time Leaderboard
      </Typography>
      {leaderboard.length ? (
        <List>
          {leaderboard.map((entry) => (
            <ListItem key={entry.userId}>
              <ListItemText
                primary={entry.userName}
                secondary={`Bid Amount: ${entry.amount}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No leaderboard data available</Typography>
      )}
    </RealTimeLeaderboardContainer>
  );
};

const CreateBidContainer = styled.div`
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ManageBidsContainer = styled.div`
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const RealTimeLeaderboardContainer = styled.div`
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
