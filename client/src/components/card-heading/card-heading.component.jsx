import React from 'react';

import "./card-heading.styles.scss";

const CardHeading = ({content}) => (
  <div className="title">
    {content}
  </div>
);

export default CardHeading;