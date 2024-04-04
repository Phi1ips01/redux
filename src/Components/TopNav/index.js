import React from 'react';
import './topnav.css';
import train from '../../images/train-timetable-italy-svgrepo-com.png';
import bus from "../../images/bus-svgrepo-com (7).png";
import flight from "../../images/plane-svgrepo-com.png";
import { NavLink } from 'react-router-dom';

const TopNav = () => {
  return (
    <div>
      <div className="header">
        <ul className="topnav">
          <li className="topnav-list">
            <a className='disabled-button' title='This feature will be available soon' disabled>
              <div className='topnav-list-container'>
                <img src={train} className='topnav-image' alt='train'/>
                TRAIN
              </div>
            </a>
          </li>
          <li className="topnav-list">
            <NavLink to="/home">
              <div className='topnav-list-container'>
                <img src={bus} className="topnav-image" alt="bus" />
                BUS
              </div>
            </NavLink>
          </li>
          <li className="topnav-list">
            <a className='disabled-button' title='This feature will be available soon' disabled>
              <div className='topnav-list-container'>
                <img src={flight} className='topnav-image' alt='flight'/>
                FLIGHTS
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopNav;
