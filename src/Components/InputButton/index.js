import React from 'react';

const InputButton = ({value,className,onSubmit}) => {
  return (
    <input
      type="submit"
      value={value}
      className={className}
      onSubmit={onSubmit}
    />
  );
};
export default InputButton;
