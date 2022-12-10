


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
 
const [usersinfo, setUsersInfo] = useState([]);
const [latLng, setLatLng]=useState()



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
  ).then((response) => response.json())
var array=[]
for (var i=0; i<response.length; i++)
    {
        array.push(response[i].Location)
    }


  // update the state
 console.log(JSON.stringify(array))
 setLatLng(array)
 setUsersInfo(response)
 

};

//var names = [{latLng:pos, un:"Kristen Stewart!"},{latLng:position, un:"Anne Hathaway!"}];


useEffect(() => {
  
  getApiData();


  

}, []);

  return (
    
    latLng &&
    <MapContainer style={{border: "10px solid white"}} bounds={[latLng]} zoom={7}scrollWheelZoom={false} >
      <TileLayer
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {usersinfo.map(function(user, index){
                    return <Marker position={user.Location}>
                           <Popup>
                            <img src={user.image_url} style={{ width: 50, height: 60}} />
                           </Popup>
                           </Marker>
       
                  })}
  
      
    </MapContainer>
    
);
}

export default MyMap

