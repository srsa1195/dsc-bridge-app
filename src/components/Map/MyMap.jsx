
import React, {useState} from "react";
import {  MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from "leaflet";
//import marker from 'https://dcscprojectbucket.s3.us-west-1.amazonaws.com/kristenImage.jpeg'

function GetIcon(_iconSize){
    return L.icon({
        iconUrl:require('./kristenImage.jpeg'),
        iconSize:[_iconSize]
    })
}


function MyMap() {
    
  return (
    <MapContainer center={[45.4, -75.7]} zoom={11}scrollWheelZoom={false}>
      <TileLayer
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[45.4, -75.7]}>
      {/* icon={GetIcon(40)} */}
      <Popup>
        <h3>Kristen Stewart</h3>
       <img src={'https://dcscprojectbucket.s3.us-west-1.amazonaws.com/kristenImage.jpeg'} style={{ width: 50, height: 60}} />
      </Popup>
    </Marker>
    </MapContainer>
);
}

export default MyMap

