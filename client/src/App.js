import React from "react";

import "./App.css";

import ContentContainer from "./components/content-container/content-container.component";
// import ConfiguredParticles from "./components/particles/particles.component";
import Footer from "./components/footer/footer.components";

const App = () => (
  <div className="App">
    {/* <ConfiguredParticles /> */}
    <ContentContainer />
    <Footer />
  </div>
);

export default App;
