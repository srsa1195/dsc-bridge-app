import React, { useContext, useState} from "react";
import { useForm } from "react-hook-form";
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
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: '',
      email: '', 
      password: '', 
      confirmPassword: ''
    }
  });
  const onSubmit = (data, e)=>{
    const password = user.password;
    const confirmPassword = user.confirmPassword;
    // perform all neccassary validations
    if (password !== confirmPassword) {
        alert("Passwords don't match");
    } else {
        // make API call
        handleClick(e);
        console.log(data, e);
    }
    
  }

  const handleChange = (event) => {
    setUser({ ...user,[event.target.name]: event.target.value});

  }
  const handleClick = async event => {
    event.preventDefault();
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
    <form onSubmit={handleSubmit(onSubmit)}>
    <BoxContainer>
      <FormContainer>
      <Input
        type="text"
        id="fullName"
        name="fullName"
        placeholder="Full Name"
        {...register("fullName", { required: true })}
        value={user.fullName}
        onChange={handleChange}
      />
      <Input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        {...register("email", { required: true })}
        value={user.email}
        onChange={handleChange}
      />
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        {...register("password", { required: true })}
        value={user.password}
        onChange={handleChange}
      />
      <Input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm Password"
        {...register("confirmPassword", { required: true })}
        value={user.confirmPassword}
        onChange={handleChange}
      />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit">Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
    </form>
  );
}