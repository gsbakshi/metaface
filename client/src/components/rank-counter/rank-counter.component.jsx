import React from "react";

import './rank-counter.styles.scss';

const RankCounter = ({count}) => (
  <div className='rank-counter'>
    { `${count ?? 0} images detected ` }
  </div>
);

export default RankCounter;
