import React from "react";
import Particles from "react-tsparticles";

import "./particles.styles.scss";

import options from "./particles.options";

const ConfiguredParticles = () => (
  <Particles className="tsparticles" options={options} />
);

export default ConfiguredParticles;
