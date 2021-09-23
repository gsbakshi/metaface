import React from "react";

import "./input-image-url.styles.scss";

import TextBox from "../text-box/text-box.component";

const InputImageUrl = ({ input, onInputChange, onEnter, onSubmit }) => (
  <div className="input-image-container">
    <TextBox
      placeholder="Paste image link"
      value={input}
      onChange={onInputChange}
      onKeyDown={onEnter}
      component={
        <button className="detect" onClick={onSubmit}>
          <i className="fa fa-angle-right" />
        </button>
      }
    />
  </div>
);

export default InputImageUrl;
