import React from "react";

import "./card-content.styles.scss";

import CardLogo from "../card-logo/card-logo.component";
import CardHeading from "../card-heading/card-heading.component";

const CardContainer = ({ data, title, onClickText, onClickAction, altOption }) => (
  <div className="card-content">
    <CardLogo />
    <CardHeading content={title} />
    <div className="data">{data}</div>
    <div className={`${altOption ? 'alt' : ''} option`} onClick={onClickAction}>
      {onClickText}
    </div>
  </div>
);

export default CardContainer;
