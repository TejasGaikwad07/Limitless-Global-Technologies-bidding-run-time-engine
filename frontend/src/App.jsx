
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BidderDashboard from './pages/BidderDashboard';
import BidCreatorDashboard from './pages/BidCreatorDashboard';
import Auth from './components/Auth';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bidder-dashboard" element={<BidderDashboard />} />
        <Route path="/bid-creator-dashboard" element={<BidCreatorDashboard />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
