import React from "react";

import "./card-container.styles.scss";

import CardLogo from "../card-logo/card-logo.component";
import CardHeading from "../card-heading/card-heading.component";

const CardContainer = ({ data, title, onClickText, onClickAction }) => (
  <div className="card-container">
    <CardLogo />
    <CardHeading content={title} />
    <div className="data">{data}</div>
    <div className="option" onClick={onClickAction}>
      {onClickText}
    </div>
  </div>
);

export default CardContainer;
