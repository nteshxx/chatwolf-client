import React from 'react';
import '../styles/form.css';

const FormInput = (props) => {
  const { type, placeholder, name, autoComplete, errorMessage, pattern } = props;

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
      <span className='form-error'>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
