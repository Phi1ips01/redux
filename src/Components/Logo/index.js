import React, { Component } from 'react';
// import PropType from 'prop-types';
import logo from '../../images/logo sigma.png';
export default class Logo extends Component {
  render() {
    return (
      <div>

      <div className="logo">
      <img className="logo-img" src={logo} alt='logo'/>
      {/* <h3>Logo</h3> */}
  </div>
  </div>
    )
  }
}
// InputField.Prototype = {
//   className: PropType.string,
//   type: PropType.string,
//   placeholder: PropType.string,
//   value: PropType.string,
// };