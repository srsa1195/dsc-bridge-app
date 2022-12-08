import React, { useContext } from "react";
import UploadImageToS3WithNativeSdk from "./UploadImageToS3WithNativeSdk";
import { useState } from "react";
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
import Geocode from "react-geocode";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";




export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [s3url, setS3Url]=useState(null)
  const [fullname, setFullname]=useState(null)
  const [address1, setAddress1]=useState(null)
  const [address2, setAddress2]=useState(null)
  const [gender, setGender]=useState(null)
  const [age, setAge]=useState(null)
  const [ethinicity, setEthinicity]=useState(null)
  const [email, setEmail]=useState(null)
  const [password, setPassword]=useState(null)
 


  
  Geocode.setApiKey("AIzaSyB482Dz1fM2XJ6-Y77PrsAVoxfxfZ5JFu0");
  Geocode.setLanguage("en");

  const getS3Url= url=>{
    setS3Url(url)
    console.log(s3url)
  }
  const handleSubmit=event=>{
    Geocode.fromAddress(address1+""+address2).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
       console.log(lat, lng)
       alert(lat+" "+lng)
      },
      (error) => {
        console.error(error);
      }
    );
  };

 
  
  return (
    <form>
    <BoxContainer>
      <FormContainer >

        <Input type="text" placeholder="Full Name" onChange={event => setFullname(event.target.value)} value={fullname}/>
        <Input type="text" placeholder="Address Line 1"  onChange={event => setAddress1(event.target.value)} value={address1}/>
        <Input type="text" placeholder="Address Line 2"  onChange={event => setAddress2(event.target.value)} value={address2}/>
        <label>Ethinicity</label>
        <select onChange={event => setEthinicity(event.target.value)} value={ethinicity}>
          <option value="Native American">Native American</option>
          <option value="Asian">Asian</option>
          <option selected value="Black">Black</option>
          <option selected value="Hispanic">Hispanic</option>
          <option selected value="White">White</option>
          <option selected value="Pacific Islander">Pacific Islander</option>
        </select>
        <label>Gender</label>
        <select onChange={event => setGender(event.target.value)} value={gender}>
          <option value="Male">Men</option>
          <option value="Female">Women</option>
          <option selected value="Transgender">Transgender</option>
        </select>
        <Input type="text" placeholder="Age" onChange={event => setAge(event.target.value)} value={age}/>
        <UploadImageToS3WithNativeSdk handleS3Url={getS3Url} > </UploadImageToS3WithNativeSdk>
        <label>Interested In</label>
        <select>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option selected value="Both">Both</option>
        </select>
        <Input type="email" placeholder="Email" onChange={event => setEmail(event.target.value)} value={email}/>
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" onChange={event => setPassword(event.target.value)} value={password}/>
       </FormContainer>
       <Marginer direction="vertical" margin={10} />
       <SubmitButton type="submit" onClick={handleSubmit}>Signup</SubmitButton>
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