import React, { useEffect, useState } from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import styled from "styled-components";
import { connectToWebSocket } from "../utils/websocket";

const RealTimeRanking = () => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const ws = connectToWebSocket();
    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === "RANKING_UPDATE") {
        setRankings(data.rankings);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <RankingContainer>
      <Typography variant="h4" gutterBottom>
        Real-Time Ranking
      </Typography>
      <List>
        {rankings.map((entry) => (
          <ListItem key={entry.userId}>
            <ListItemText
              primary={entry.username}
              secondary={`Rank: ${entry.rank}, Amount: ${entry.amount}`}
            />
          </ListItem>
        ))}
      </List>
    </RankingContainer>
  );
};

export default RealTimeRanking;

const RankingContainer = styled.div`
  padding: 2rem;
  background: #f5f5f5;
`;
