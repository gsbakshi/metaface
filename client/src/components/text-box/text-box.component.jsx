import React from "react";

import "./text-box.styles.scss";

const TextBox = ({
  placeholder,
  onChange,
  onKeyDown,
  value,
  autofocus,
  component,
  inputType,
  altOption
}) => (
  <div className={`${altOption ? "alt" : ""} text-box-container`}>
    <input
      className="text-box"
      type={`${ inputType ? inputType : 'text'}`}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value}
      autoFocus={autofocus ?? false}
    />
    {component}
  </div>
);

export default TextBox;
