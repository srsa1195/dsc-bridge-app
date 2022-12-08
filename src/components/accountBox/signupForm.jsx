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
  const [latLng, setLatlng] = useState({
    lat:0,
    long:0,
  });
 
  const [userinfo, setUserInfo] = useState({
    languages: [],
    response: [],
  });
  const [userint, setUserInt] = useState({
    interests: [],
    res: [],
  });

  Geocode.setApiKey("AIzaSyB482Dz1fM2XJ6-Y77PrsAVoxfxfZ5JFu0");
  Geocode.setLanguage("en");
  
  const handleEthChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { languages } = userinfo;
      
    console.log(`${value} is ${checked}`);
     
    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        languages: [...languages, value],
        response: [...languages, value],
      });
      
    }
  
    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        languages: languages.filter((e) => e !== value),
        response: languages.filter((e) => e !== value),
      });
      
    }
  };

  const handleIntChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { interests } = userint;
      
    console.log(`${value} is ${checked}`);
     
    // Case 1 : The user checks the box
    if (checked) {
      setUserInt({
        interests: [...interests, value],
        res: [...interests, value],
      });
      
    }
  
    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        interests: interests.filter((e) => e !== value),
        res: interests.filter((e) => e !== value),
      });
      
    }
  };



  const getS3Url= url=>{
    setS3Url(url)
    console.log(s3url)
  }
  
  const handleSubmit=event=>{
    Geocode.fromAddress(address1+""+address2).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLatlng({lat:lat,long:lng});
        //alert(latLng.lat+" "+latLng.long)
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
        <label>Ethinicity interested in</label>
           
        Native American<input  type='checkbox' id="flexCheckDefault" value="Native American" onChange={handleEthChange}/>
        Asian<input  type='checkbox' id="flexCheckDefault" value="Asian" onChange={handleEthChange}/>
        Black<input  type='checkbox' id="flexCheckDefault" value="Black" onChange={handleEthChange}/>
        Hispanic<input  type='checkbox' id="flexCheckDefault" value="Hispanic" onChange={handleEthChange}/>
        White<input  type='checkbox' id="flexCheckDefault" value="White" onChange={handleEthChange}/>
        Pacific Islander<input  type='checkbox' id="flexCheckDefault" value="Pacific Islander" onChange={handleEthChange}/>
       
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
        <label>Your Interests</label>
           
           Reading<input  type='checkbox' id="IntDefault" value="Reading" onChange={handleIntChange}/>
           Hiking<input  type='checkbox' id="IntDefault" value="Hiking" onChange={handleIntChange}/>
           Workout<input  type='checkbox' id="IntDefault" value="Workout" onChange={handleIntChange}/>
           Cooking<input  type='checkbox' id="IntDefault" value="Cooking" onChange={handleIntChange}/>
           Poetry<input  type='checkbox' id="IntDefault" value="Poetry" onChange={handleIntChange}/>
           Dancing<input  type='checkbox' id="IntDefault" value="Dancing" onChange={handleIntChange}/>
           Board Games<input  type='checkbox' id="IntDefault" value="Board Games" onChange={handleIntChange}/>
           Food<input  type='checkbox' id="IntDefault" value="Food" onChange={handleIntChange}/>

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