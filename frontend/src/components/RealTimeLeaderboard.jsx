import React, { useEffect, useState } from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import styled from "styled-components";
import { connectToWebSocket } from "../utils/websocket";

const RealTimeLeaderboard = () => {
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
    <LeaderboardContainer>
      <Typography variant="h4" gutterBottom>
        Real-Time Leaderboard
      </Typography>
      <List>
        {leaderboard.map((entry) => (
          <ListItem key={entry.userId}>
            <ListItemText
              primary={entry.username}
              secondary={`Bid Amount: ${entry.amount}`}
            />
          </ListItem>
        ))}
      </List>
    </LeaderboardContainer>
  );
};

export default RealTimeLeaderboard;

const LeaderboardContainer = styled.div`
  padding: 2rem;
  background: #f5f5f5;
`;
