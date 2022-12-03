import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useNavigate } from "react-router-dom";
export function LoginForm(props) {
  const navigate = useNavigate();
  const { switchToSignup } = useContext(AccountContext);
  const [user, setUser] = useState({email: "", password: ""}); 
  const handleChange = (event) => {
    setUser({ ...user,[event.target.name]: event.target.value});

  }
  const handleClick = async event => {
    event.preventDefault();
    // console.log("user created", user)
    // console.log(JSON.stringify(user));
    const result = await 
    // Send data to the backend via POST
    fetch('http://localhost:8080/login', {  // Enter your IP address here

      method: 'POST', 
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user) // body data type must match "Content-Type" header

    })
    const resultInJSON = await result.json()
    console.log(resultInJSON)
    navigate('/map');
  };
  return (
    <BoxContainer>
      <FormContainer>
      <Input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
      />
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
      />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleClick}>Sign In</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}