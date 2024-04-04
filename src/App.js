import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes/Home/Home';
import TripData from './routes/TripData/tripData';
import './routes/styles/travel.css'
import Bus from './routes/Bus/Bus'
import BusOperator from './routes/BusOperator/Bus_Operator'
import User from './routes/User/user'
import LoginPage from './routes/Login/Login';
import LandingPage from './routes/landingPage/LandingPage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<LoginPage/> }/>
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/tripData" element={<TripData />} />
        <Route exact path="/bus" element={<Bus />} />
        <Route exact path="/busOperator" element={<BusOperator/>}/>
        <Route exact path="/user" element={<User/>}/>
        <Route path='/*' element={<Navigate to="/"/>}/>
              {/* <PrivateRoute path="/home" element={<Home />} />
                <PrivateRoute path="/tripData" element={<TripData />} />
                <PrivateRoute path="/bus" element={<Bus />} />
                <PrivateRoute path="/busOperator" element={<BusOperator />} />
                <PrivateRoute path="/user" element={<User />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
