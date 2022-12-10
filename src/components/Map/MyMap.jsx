


import React, {useState, useEffect} from "react";
import {  MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from "leaflet";
import './MyMap.css'

//import marker from 'https://dcscprojectbucket.s3.us-west-1.amazonaws.com/kristenImage.jpeg'

function GetIcon(_iconSize){
    return L.icon({
        iconUrl:require('./kristenImage.jpeg'),
        iconSize:[_iconSize]
    })
}

function MyMap() {

  document.body.style = 'background: rgb(241,196,15)';




const [usersinfo, setUsersInfo] = useState();

const position = [45.3, -75.7]
const pos = [45.4, -75.7]

const request={
  "_id": {
      "$oid": "6393b525ffe568ef632d8593"
  }
}



const getApiData = async () => {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request)
};

  const response = await fetch(
    "http://localhost:5001/api/v1/getSimilarPeople/", requestOptions
  ).then((response) => response.json());

  // update the state
  setUsersInfo(response)
  
  
};

var names = [{latLng:pos, un:"Kristen Stewart!"},{latLng:position, un:"Anne Hathaway!"}];

useEffect(() => {
  
  getApiData();
  

}, []);

  return (
    
    <MapContainer style={{border: "10px solid white"}}center={[45.4, -75.7]} zoom={11}scrollWheelZoom={false} >
      <TileLayer
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {names.map(function(name, index){
                    return <Marker position={name.latLng}>
                           <Popup>
                            {name.un} 
                            <img src={'https://dcscprojectbucket.s3.us-west-1.amazonaws.com/kristenImage.jpeg'} style={{ width: 50, height: 60}} />

                           </Popup>
                           </Marker>
       
                  })}
  
      
    </MapContainer>
    
);
}

export default MyMap

