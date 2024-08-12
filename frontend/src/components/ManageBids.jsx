import React, { useEffect, useState } from "react";

const ManageBids = () => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await fetch("/api/bids");
        const data = await response.json();

        if (Array.isArray(data)) {
          setBids(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    };

    fetchBids();
  }, []);

  return (
    <div>
      <h1>Manage Bids</h1>
      {Array.isArray(bids) ? (
        bids.map((bid) => (
          <div key={bid.id}>
            <h2>{bid.title}</h2>
            <p>{bid.amount}</p>
          </div>
        ))
      ) : (
        <p>No bids available</p>
      )}
    </div>
  );
};

export default ManageBids;
