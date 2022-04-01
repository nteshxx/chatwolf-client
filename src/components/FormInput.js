import React from 'react';
import correct from '../assets/correct.svg';
import '../styles/form.css';

const FormInput = (props) => {
  const { type, placeholder, name, autoComplete, pattern } = props;

  return (
    <div className="input-box">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        autoComplete={autoComplete}
        pattern={pattern}
        required={true}
      />
      <img className='input-validation' src={correct} alt="" />
    </div>
  );
};

export default FormInput;
