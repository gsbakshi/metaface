import React from "react";

import "./content-data.styles.scss";

import InputImageUrl from "../input-image-url/input-image-url.component";
import CardLogo from "../card-logo/card-logo.component";
import CardHeading from "../card-heading/card-heading.component";

const ContentData = ({
  input,
  onInputChange,
  onEnter,
  onSubmit,
  clear,
  name,
  rank,
  persons,
}) => (
  <div className="content-data">
    <CardLogo />
    <CardHeading
      content={`Hello ${name ?? "user"}, your current rank is ${rank ?? 0}`}
    />
    <div className="data">
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
    </div>
    <div className="option" onClick={() => console.log('asd')}>Sign Out</div>
  </div>
);

export default ContentData;
