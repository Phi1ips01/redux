import React from 'react';
import './sidebar.css';

const SideBar = () => {
  return (
    <div>
      <div className="sidenav">
        <ul>
          <li><a href='/tripData'>CUSTOMER DATA</a></li>
          <li><a href="/bus">BUS</a></li>
          <li><a href="/busOperator">BUS OPERATOR</a></li>
          <li><a href="/user">USER</a></li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
