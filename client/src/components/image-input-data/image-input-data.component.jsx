import React from "react";

import "./image-input-data.styles.scss";

import InputImageUrl from "../input-image-url/input-image-url.component";

const ImageInputData = ({
  input,
  onInputChange,
  onEnter,
  onSubmit,
  clear,
  persons,
}) => (
  <React.Fragment>
    {persons != null && (
      <div className="persons-detected">{`${persons} ${
        persons === 0 ? "person" : "persons"
      } detected `}</div>
    )}
    <InputImageUrl
      input={input}
      onInputChange={onInputChange}
      onEnter={onEnter}
      onSubmit={onSubmit}
    />
    {input && (
      <div className="clear" onClick={clear}>
        <i className="fa fa-times" />
        Clear
      </div>
    )}
  </React.Fragment>
);

export default ImageInputData;
