import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import CardContainer from "../../components/card-content/card-content.component";
import TextBox from "../../components/text-box/text-box.component";

const SignUpPage = ({ loadUser }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const handleSubmit = async (event) => {
    try {
      fetch("http://localhost:80/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.id) {
            loadUser(data);
          } else {
            // TODO make better alert dialog for security policy compliance
            alert("invalid credentials");
            setEmail("");
            setName("");
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

  const onNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const onPasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const signin = () => history.push("/signin");

  const onEnter = async (event) => {
    const value = password.trim();
    try {
      if (event.which === 13 && value.length !== 0) handleSubmit();
    } catch (error) {
      console.error(error);
    }
  };

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
          placeholder={"Enter Name"}
          onChange={onNameChange}
          value={name}
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
      title="Register"
      data={renderSignInForm()}
      onClickText={"Sign In"}
      onClickAction={signin}
      altOption
    />
  );
};

export default SignUpPage;
