import React from 'react';
import logo from '../../images/logo sigma.png'
import './dropdown.css'
import { useDispatch } from 'react-redux';

import { KEYS } from '../../dataKeys';
import { logOutUser } from '../../features/login/loginSlice';

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
        <a href='/'><img src={logo} alt="Logo" /></a>
      </div>
      <div className="links">
        <a href="/home">CUSTOMER TRIP</a>
        <a href="/tripData">ADMIN PANEL</a>
        <a href="/" onClick={handleLogOut}>LOG OUT</a>
      </div>
    </div>
  );
};

export default DropDown;
