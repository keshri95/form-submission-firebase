import React from "react";
import '../FormInput/form-input.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="formInput-contaienr">
      <label htmlFor={`${label}`}>{label}</label>
      <input { ...otherProps }  />
    </div>
  );
};

export default FormInput;
