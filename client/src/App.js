import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

import "./App.scss";

import ConfiguredParticles from "./components/particles/particles.component";
import Footer from "./components/footer/footer.components";
import HomePage from "./pages/home-page/home-page.component";
import SignInPage from "./pages/sign-in-page/sign-in-page.component";
import SignUpPage from "./pages/sign-up-page/sign-up-page.component";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  let history = useHistory();

  const loadUser = (data) => setCurrentUser(data);
  const logout = () => {
    window.sessionStorage.clear();
    setCurrentUser(null);
  };

  const updateEntries = (count) =>
    setCurrentUser({ ...currentUser, entries: count });

  useEffect(() => {
    let token = window.sessionStorage.getItem("token");
    if (token) {
      fetch("http://localhost:80/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.id) {
            fetch(`http://localhost:80/profile/${data.id}`, {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            })
              .then((res) => res.json())
              .then((user) => {
                if (user && user.email) {
                  loadUser(user);
                  history.push("/");
                }
              });
          }
        })
        .catch(console.log);
    }
  }, [history]);

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
              render={() => <SignInPage loadUser={loadUser} />}
            />
            <Route
              exact
              path="/register"
              render={() => <SignUpPage loadUser={loadUser} />}
            />
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
