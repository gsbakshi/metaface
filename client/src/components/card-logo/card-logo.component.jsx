import React from "react";

import "./card-logo.styles.scss";

import { ReactComponent as Logo } from "../../logos/default-monochrome.svg";

const CardLogo = () => (
  <div className="logo-container">
    <Logo className="logo" />
  </div>
);

export default CardLogo;