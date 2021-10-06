import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import CardContainer from "../../components/card-content/card-content.component";
import TextBox from "../../components/text-box/text-box.component";

const SignInPage = ({ loadUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const handleSubmit = async (event) => {
    try {
      fetch("http://localhost:3001/signin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.id) {
            loadUser(data);
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
