import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserPage from './routes/userPage';
// import CustomerPage from './routes/CustomerPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/user" />} />
        <Route exact path="/home" element={<UserPage />} />
        {/* <Route path="/customer" element={<CustomerPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
