import React, { useState} from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.scss";

import ConfiguredParticles from "./components/particles/particles.component";
import Footer from "./components/footer/footer.components";
import HomePage from "./pages/home-page/home-page.component";
import SignInPage from "./pages/sign-in-page/sign-in-page.component";
import SignUpPage from "./pages/sign-up-page/sign-up-page.component";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const loadUser = (data) => setCurrentUser(data);
  const logout = () => {
    setCurrentUser(null);
  };
  
  const updateEntries = (count) =>
    setCurrentUser(Object.assign(currentUser, { entries: count }));


  return (
    <div className="App">
      <ConfiguredParticles />
      <div className="page-container">
        <div className="content">
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                currentUser ? (
                  <HomePage
                    user={currentUser}
                    updateEntries={updateEntries}
                    logout={logout}
                  />
                ) : (
                  <Redirect to="/signin" />
                )
              }
            />
            <Route
              exact
              path="/signin"
              render={() =>
                currentUser ? (
                  <Redirect to="/" />
                ) : (
                  <SignInPage loadUser={loadUser} />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={() =>
                currentUser ? (
                  <Redirect to="/" />
                ) : (
                  <SignUpPage loadUser={loadUser} />
                )
              }
            />
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default App;
