import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import styled from "styled-components";

const Auth = ({ setRole }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRoleLocal] = useState("Bidder");
  const navigate = useNavigate();

  const handleAuth = async () => {
    const endpoint = isSignup ? "/auth/signup" : "/auth/login";
    try {
      const response = await API.post(endpoint, {
        name,
        email,
        password,
        role,
      });
      localStorage.setItem("token", response.data.token);
      const userRole = response.data.role;
      if (userRole) {
        navigate(`/${userRole.toLowerCase().replace(" ", "-")}-dashboard`);
      } else {
        console.error("Role is undefined.");
      }
    } catch (err) {
      console.error(
        "Authentication failed:",
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <AuthContainer>
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          {isSignup ? "Sign Up" : "Login"}
        </Typography>
        <Grid container spacing={3}>
          {isSignup && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          {isSignup && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  value={role}
                  onChange={(e) => setRoleLocal(e.target.value)}
                >
                  <MenuItem value="Bidder">Bidder</MenuItem>
                  <MenuItem value="Bid Creator">Bid Creator</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleAuth}
            >
              {isSignup ? "Sign Up" : "Login"}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              align="center"
              onClick={() => setIsSignup(!isSignup)}
              style={{ cursor: "pointer" }}
            >
              {isSignup
                ? "Already have an account? Login"
                : "Don’t have an account? Sign Up"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </AuthContainer>
  );
};

export default Auth;

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
`;
