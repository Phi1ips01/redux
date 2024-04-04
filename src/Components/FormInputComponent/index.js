import React from 'react';
import InputField from '../InputField';

const FormInput = ({type,id,name,className,placeholder,required,min,disabled }) => {
  return (
    <div className="input-data">
                <InputField type={type} id={id} name={name} className={`${className} asterek`} placeholder={placeholder} required={required} min={min} disabled={disabled}/>    
               <div className="underline"></div>
            </div>
  );
};

export default FormInput;
