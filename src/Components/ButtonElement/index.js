import React from 'react';
import PropTypes from 'prop-types';

const ButtonElement = ({ type, placeholderLabel, htmlForName, onChange, value, children, disable }) => (
  <button
    type={type}
    placeholder={placeholderLabel}
    name={htmlForName}
    onChange={onChange}
    value={value}
    children={children}
    disabled={disable}
  />
);

ButtonElement.propTypes = {
  type: PropTypes.string,
  placeholderLabel: PropTypes.string,
  htmlForName: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  children: PropTypes.node,
  disable: PropTypes.bool,
};

export default ButtonElement;
