  import React, { Component } from 'react';
  // import PropType from 'prop-types';

  export default class InputField extends Component {
    render() {
                {/* {this.props.required && <div className='asterisk'>*</div>} */}

      return (
          <input
            type={this.props.type}
            placeholder={`${this.props.placeholder}${!!this.props.required ? "*":""}`}
            name={this.props.name}
            onChange={this.props.onChange}
            id={this.props.id}
            className={this.props.className}
            value={this.props.value}
            required={this.props.required}
            disabled={this.props.disabled}
            min = {this.props.min}
          />
      )
    }
  }
  // InputField.Prototype = {
  //   className: PropType.string,
  //   type: PropType.string,
  //   placeholder: PropType.string,
  //   value: PropType.string,
  // };