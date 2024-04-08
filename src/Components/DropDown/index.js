import React from 'react';
import logo from '../../images/logo sigma.png'
import './dropdown.css'
import { useDispatch } from 'react-redux';

import { KEYS } from '../../dataKeys';
import { logOutUser } from '../../features/login/loginSlice';
import { Link } from 'react-router-dom';

const DropDown = () => {
  const dispatch = useDispatch();

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logOutUser())
    console.log('Logout clicked',localStorage.getItem(KEYS.ACCESS_TOKEN));
    window.location.href = '/';
  };

  return (
    <div className='dropdown-content'>
      <div className="nav-logo">
        <Link href='/'><img src={logo} alt="Logo" /></Link>
      </div>
      <div className="links">
      <Link to="/home">CUSTOMER TRIP</Link>
        <Link to="/tripData">ADMIN PANEL</Link>
        <Link to="/" onClick={handleLogOut}>LOG OUT</Link>
        
      </div>
    </div>
  );
  
};

export default DropDown;
