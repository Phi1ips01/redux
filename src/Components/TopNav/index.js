import React, { Component } from 'react';

import train from '../../images/train.png'
import bus from "../../images/bus.png"
import flight from "../../images/airplane.png"
import DropDown from '../DropDown'
import logo from '../../images/logo sigma.png'
import { NavLink } from 'react-router-dom';
export default class TopNav extends Component {
  
  render() {
    return (
      <div>
        <div className="header">
        <DropDown logout={this.props.logout}/>

        <ul className="topnav">
        <li className="topnav-list no-hover"><a href="/">
        <div className="logo-topnav">
      <img className="logo-topnav-img" src={logo} alt='logo'/>

      </div>
           
           </a></li>

          <li className="topnav-list"> <a className='disabled-button' title='This feature will be available soon' disabled><img src={train} className='topnav-image' alt='train'/></a></li>
          <li className="topnav-list">
              <NavLink to="/home" activeClassName="active">
                <img src={bus} className="topnav-image" alt="bus" />
              </NavLink>
          </li>
          <li className="topnav-list"><a className='disabled-button' title='This feature will be available soon' disabled><img src={flight} className='topnav-image' alt='flight'/></a></li>
      </ul>
      </div>
      </div>
    );
  }
}

