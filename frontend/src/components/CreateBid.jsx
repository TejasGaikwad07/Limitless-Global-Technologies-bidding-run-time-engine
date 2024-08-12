import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import styled from "styled-components";

const CreateBid = () => {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([{ description: "", amount: 0 }]);

  const handleCreateBid = async () => {
    try {
      const title = "Bid Title";
      const items = [{ itemName: "Item 1", itemPrice: 100 }];

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        "http://localhost:8080/api/bids",
        { title, items },
        { headers }
      );
      console.log("Bid created:", response.data);
    } catch (error) {
      console.error("Failed to create bid:", error);
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", amount: 0 }]);
  };

  return (
    <CreateBidContainer>
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Create a New Bid
        </Typography>
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {items.map((item, index) => (
          <Grid container spacing={2} key={index} style={{ marginTop: "1rem" }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                value={item.description}
                onChange={(e) =>
                  handleItemChange(index, "description", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                variant="outlined"
                value={item.amount}
                onChange={(e) =>
                  handleItemChange(index, "amount", e.target.value)
                }
              />
            </Grid>
          </Grid>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={addItem}
          style={{ marginTop: "1rem" }}
        >
          Add Item
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCreateBid}
          style={{ marginTop: "1rem" }}
        >
          Create Bid
        </Button>
      </Paper>
    </CreateBidContainer>
  );
};

export default CreateBid;

const CreateBidContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #f5f5f5;
`;
