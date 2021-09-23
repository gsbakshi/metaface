import React from "react";

import "./text-box.styles.scss";

const TextBox = ({
  placeholder,
  onChange,
  onKeyDown,
  value,
  autofocus,
  component,
}) => (
  <div className="text-box-container">
    <input
      className="text-box"
      type="text"
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
