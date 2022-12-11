


import React, {useState, useEffect} from "react";
import {  MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from "leaflet";
import './MyMap.css';
import { ReactSession } from 'react-client-session';


//import marker from 'https://dcscprojectbucket.s3.us-west-1.amazonaws.com/kristenImage.jpeg'

function GetIcon(_iconSize){
    return L.icon({
        iconUrl:require('./man.svg'),
        iconSize:[_iconSize]
    })
}

function MyMap() {


  //alert(ReactSession.get("imageURL"))

document.body.style = 'background: rgb(241,196,15)';
 
const [usersinfo, setUsersInfo] = useState([]);
const [latLng, setLatLng]=useState()




const request={
  "_id": {
      "$oid": ReactSession.get("username")
  }
}



const getApiData = async () => {
  
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request)
};

  const response = await fetch(
    "http://localhost:5000/api/v1/getSimilarPeople/", requestOptions
  ).then((response) => response.json())
var array=[]
for (var i=0; i<response.length; i++)
    {
        array.push(response[i].Location)
    }


  // update the state
 
 setLatLng(array)
 setUsersInfo(response)
 

};

//var names = [{latLng:pos, un:"Kristen Stewart!"},{latLng:position, un:"Anne Hathaway!"}];


useEffect(() => {
  
  getApiData();


  

}, []);

  return [
    
    latLng &&
    <div className="top-div"><img  className="img-class-2" src={ReactSession.get("imageURL")} style={{ width: 100, height: 100 }}/><h2 className="txt-css">Hello {ReactSession.get("name")}, Happy Bridging!</h2></div>,
    latLng &&
    <MapContainer style={{border: "10px solid white"}} bounds={[latLng]} zoom={4} scrollWheelZoom={false} >
      <TileLayer
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {usersinfo.map(function(user, index){
                    return <Marker position={user.Location}  >
                           <Popup>
                            <div className="outer-div">
                            <div className="out-div">
                            <img  className="img-class" src={user.image_url} style={{ width: 100, height: 100 }} />
                            </div>
                            <div > Name: {user.Name}</div>
                            <div > Email Id: {user.email}</div>
                            <div > Ethnicity:{user.Ethnicity}</div>
                            <div><label>Interests:-</label></div>
                            <ul className="list-class">
                              {user.Interests.map(function(int,index){
                                return <li>{int}</li>
                              })}
                            </ul>
                            
                            
                            </div>
                           </Popup>
                           </Marker>
       
                  })}
  
      
    </MapContainer>
    
                ];
}

export default MyMap

