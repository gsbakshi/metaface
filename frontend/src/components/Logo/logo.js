import React from "react";
import Tilt from "react-parallax-tilt";
import brain from './brain.svg';


function Logo() {
  return (
    <div
      className="ma4"
      style={{ display: "flex", justifyContent: "flex-start" }}
    >
      <Tilt className="Tilt" style={{ height: 100, width: 100 }}>
        <div className="Tilt-inner flex items-center">
          <img src={brain} alt="logo" className="br2 shadow-4" />
          <p className='ph3 f4'>SmartBrain</p>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;
