import React from 'react';

const InputField = ({ placeholder, required, name, onChange, id, className, value, disabled, min }) => {
  return (
    <input
      type="text"
      placeholder={`${placeholder}${!!required ? "*" : ""}`}
      name={name}
      onChange={onChange}
      id={id}
      className={className}
      value={value}
      required={required}
      disabled={disabled}
      min={min}
    />
  );
};

export default InputField;
