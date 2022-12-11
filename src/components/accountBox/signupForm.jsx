import React, { useContext } from "react";
import UploadImageToS3WithNativeSdk from "./UploadImageToS3WithNativeSdk";
import { useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  Label,
  Label1,
  MutedLink,
  SubmitButton,
  sideBySide
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
  const [lookingFor, setLookingFor]=useState(null)
  
 
 
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
    
    alert("Picture Uploaded!")
    console.log(s3url)
  }
  
  const handleSubmit=event=>{
    Geocode.fromAddress(address1+""+address2).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        alert(lat+" "+lng)
        
       const request={ "person":{
          "Name":fullname,
          "Address":address1+","+address2,
          "Location":[lat,lng],
          "email":email,
          "Ethnicity":"white",
          "Interested_Ethnicity":userinfo.response,
          "Interests":userint.res,
          "Gender":gender,
          "Gender_Interest":"both",
          "Age":age,
          "image_url":s3url,
          "password":password
        
        }
          
        }
        console.log(JSON.stringify())
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request)
      };
      fetch('http://localhost:5001/api/v1/register/', requestOptions)
          .then(response => response.json())
          
          
      },
      (error) => {
        console.error(error);
      }
    );
    switchToSignin()
  };

 
  
  return (
    <form>
    <BoxContainer>
      <FormContainer>
      <div className="side-by-side">
      <Input type="text" placeholder="Full Name" onChange={event => setFullname(event.target.value)} value={fullname}/>
      <Input type="email" placeholder="Email" onChange={event => setEmail(event.target.value)} value={email}/>
      </div>
      <div className="side-by-side">
      <Input type="password" placeholder="Password" />
      <Input type="password" placeholder="Confirm Password" onChange={event => setPassword(event.target.value)} value={password}/>
      </div>
      <Input type="text" placeholder="Age" onChange={event => setAge(event.target.value)} value={age}/>
      <div className="side-by-side">
        <Input type="text" placeholder="Address Line 1"  onChange={event => setAddress1(event.target.value)} value={address1}/>
        <Input type="text" placeholder="Address Line 2"  onChange={event => setAddress2(event.target.value)} value={address2}/>
      </div>
        <Marginer direction="vertical" margin="0.6em" />
        <Label>Your Ethinicity</Label>
        <select onChange={event => setEthinicity(event.target.value)} value={ethinicity}>
          <option selected value="Native American">Native American</option>
          <option value="Asian">Asian</option>
          <option value="Black">Black</option>
          <option value="Hispanic">Hispanic</option>
          <option value="White">White </option>
          <option value="Pacific Islander">Pacific Islander</option> 
        </select>
        <Marginer direction="vertical" margin="0.6em" />
        <Label>Ethinicity interested in</Label>  
        <div className="side-by-side">
        <Label1>Native American<input type='checkbox' id="flexCheckDefault" value="Native American" onChange={handleEthChange}/></Label1>
        <Label1>Asian<input  type='checkbox' id="flexCheckDefault" value="Asian" onChange={handleEthChange}/></Label1>
        <Label1>Black<input  type='checkbox' id="flexCheckDefault" value="Black" onChange={handleEthChange}/></Label1>
        <Label1>Hispanic<input  type='checkbox' id="flexCheckDefault" value="Hispanic" onChange={handleEthChange}/></Label1>
        <Label1>White<input  type='checkbox' id="flexCheckDefault" value="White" onChange={handleEthChange}/></Label1>
        <Label1>Pacific Islander<input  type='checkbox' id="flexCheckDefault" value="Pacific Islander" onChange={handleEthChange}/></Label1>
        </div>
        <Marginer direction="vertical" margin="0.6em" />
        <Label>Gender</Label>
        <select onChange={event => setGender(event.target.value)} value={gender}>
          <option value="Male">Men</option>
          <option value="Female">Women</option>
          <option selected value="Transgender">Transgender</option>
        </select>
        <Marginer direction="vertical" margin="0.6em" />
        <Label>Upload Profile Picture</Label>
        <UploadImageToS3WithNativeSdk handleS3Url={getS3Url} > </UploadImageToS3WithNativeSdk>
        <Label>Interested In</Label>
        <select onChange={event => setLookingFor(event.target.value)} value={lookingFor}>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option selected value="Both">Both</option>
        </select>
        <Label>Your Interests</Label>
        <div className="side-by-side">
        <Label1>Reading<input  type='checkbox' id="IntDefault" value="Reading" onChange={handleIntChange}/></Label1>
        <Label1>Hiking<input  type='checkbox' id="IntDefault" value="Hiking" onChange={handleIntChange}/></Label1>
        <Label1>Workout<input  type='checkbox' id="IntDefault" value="Workout" onChange={handleIntChange}/></Label1>
        <Label1>Cooking<input  type='checkbox' id="IntDefault" value="Cooking" onChange={handleIntChange}/></Label1>
        </div>
        <div className="side-by-side">
        <Label1>Poetry<input  type='checkbox' id="IntDefault" value="Poetry" onChange={handleIntChange}/></Label1>
        <Label1>Dancing<input  type='checkbox' id="IntDefault" value="Dancing" onChange={handleIntChange}/></Label1>
        <Label1>Board Games<input  type='checkbox' id="IntDefault" value="Board Games" onChange={handleIntChange}/></Label1>
        <Label1>Food<input  type='checkbox' id="IntDefault" value="Food" onChange={handleIntChange}/></Label1>
        </div>
       </FormContainer>
       <Marginer direction="vertical" margin={10} />
       <SubmitButton type="submit" onClick={handleSubmit}>Signup</SubmitButton>
       <Marginer direction="vertical" margin="1em"/>
       <MutedLink href="#" margin1="0.8em" >
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
    </form>
  );
}