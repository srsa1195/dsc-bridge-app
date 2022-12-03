import React, { useContext } from "react";
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
  var  jsonData = {
    "users": [
        {
            "email": "sruthik11@gmail.com",
            "password": "admin123"
        }
    ]
  } 
  function handleClick() {
    
    // Send data to the backend via POST
    fetch('http://localhost:8080/data', {  // Enter your IP address here

      method: 'POST', 
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header

    })
    navigate("/map")
    
  }
  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
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