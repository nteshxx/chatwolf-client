import React from 'react';
import '../styles/form.css';

const FormInput = (props) => {
  return (
    <div className="input-box">
      <input
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        autoComplete={props.autoComplete}
      />
    </div>
  );
};

export default FormInput;
