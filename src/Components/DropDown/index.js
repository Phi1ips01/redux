import React, { Component } from 'react';
export default class DropDown extends Component {
  handleLogOut = ()=>{
console.log(this.props)
    this.props.logout()
    window.location.href = "/"
  }
  render() {
    return (
      <div>
            <div className="dropdown">
        <button className="dropdown-btn">&#9776;</button>
        <div className="dropdown-content">
          <a href="/home">Trip Details</a>
          <a href="/tripData">Admin Panel</a>
          <div className='logout'>
          <button className='logout-button' onClick={this.handleLogOut}>Logout</button>
        </div>
      
        </div>
        
        <div className="clear"></div>

    </div>
        </div>
    );
  }
}
