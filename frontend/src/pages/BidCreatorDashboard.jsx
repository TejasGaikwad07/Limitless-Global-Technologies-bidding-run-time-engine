import React from "react";
import CreateBid from "../components/CreateBid";
import ManageBids from "../components/ManageBids";
import RealTimeLeaderboard from "../components/RealTimeLeaderboard";

const BidCreatorDashboard = () => {
  return (
    <div>
      <h1>Bid Creator Dashboard</h1>
      <CreateBid />
      <ManageBids />
      <RealTimeLeaderboard />
    </div>
  );
};

export default BidCreatorDashboard;
