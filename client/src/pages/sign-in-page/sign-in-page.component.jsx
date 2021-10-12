import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import CardContainer from "../../components/card-content/card-content.component";
import TextBox from "../../components/text-box/text-box.component";

const SignInPage = ({ loadUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem("token", token);
  };

  const handleSubmit = async (event) => {
    try {
      fetch("http://localhost:80/signin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.userId && data.success === "true") {
            saveAuthTokenInSession(data.token);
            fetch(`http://localhost:80/profile/${data.userId}`, {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.token,
              },
            })
              .then((res) => res.json())
              .then((user) => {
                if (user && user.email) {
                  loadUser(user);
                  history.push("/");
                }
              });
          } else {
            // TODO make better alert dialog
            alert("wrong credentials");
            setEmail("");
            setPassword("");
          }
        })
        .catch(console.log);
    } catch (error) {
      console.log(error);
    }
  };

  const onEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const onPasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const onEnter = async (event) => {
    const value = password.trim();
    try {
      if (event.which === 13 && value.length !== 0) handleSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  const signup = () => history.push("/register");

  const renderSignInForm = () => {
    return (
      <React.Fragment>
        <TextBox
          placeholder={"Enter Email"}
          onChange={onEmailChange}
          value={email}
          inputType={"email"}
          altOption
        />
        <TextBox
          placeholder={"Enter Password"}
          onChange={onPasswordChange}
          value={password}
          inputType={"password"}
          onKeyDown={onEnter}
          altOption
        />
        <button className="form-button" onClick={handleSubmit}>
          Submit
        </button>
      </React.Fragment>
    );
  };

  return (
    <CardContainer
      title="Sign In"
      data={renderSignInForm()}
      onClickText={"Sign Up"}
      onClickAction={signup}
      altOption
    />
  );
};

export default SignInPage;
