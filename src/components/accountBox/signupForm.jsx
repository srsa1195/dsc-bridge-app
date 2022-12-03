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

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [user, setUser] = useState({fullName: "", email: "", password: "", confirmPassword: ""});
  const handleChange = (event) => {
    setUser({ ...user,[event.target.name]: event.target.value});

  }
  const handleClick = async event => {
    event.preventDefault();
    // console.log("user created", user)
    // console.log(JSON.stringify(user));
    const result = await 
    // Send data to the backend via POST
    fetch('http://localhost:8080/register', {  // Enter your IP address here

      method: 'POST', 
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user) // body data type must match "Content-Type" header

    })
    const resultInJSON = await result.json()
    console.log(resultInJSON) 
    switchToSignin(AccountContext);
  };
  return (
    <BoxContainer>
      <FormContainer>
      <Input
        type="text"
        id="fullName"
        name="fullName"
        placeholder="Full Name"
        value={user.fullName}
        onChange={handleChange}
      />
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
      <Input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={user.confirmPassword}
        onChange={handleChange}
      />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={handleClick}>Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}