import React, { Component } from 'react';
import train from '../../images/train.png';
import bus from '../../images/bus.png';
import flight from '../../images/airplane.png';
import Logo from '../../Components/Logo';
import DropDown from '../../Components/DropDown';

class LandingPage extends Component {
    
        render() {
            
    return (
        <div className="landing-main">
            <DropDown/>
        <Logo className="logo-landing"/>
        <div className="mode">
            <button className='disabled-button' title='This feature will be available soon' disabled><img src={train} className="mode-img" alt="Train"/></button>
            <a href="/home"><button><img src={bus} className="mode-img" alt="Bus"/></button></a>
            <button className='disabled-button' title='This feature will be available soon' disabled><img src={flight} className="mode-img" alt="Flight"/></button>
        </div>
    </div>
    )
}
}
export default LandingPage;