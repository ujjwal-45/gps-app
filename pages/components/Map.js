import { useState, useEffect } from 'react';

import { MapContainer, TileLayer, Popup, Polyline, Marker } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { fetchData } from '../api/vehicles';



export default function Map() {
    const [coordinates, SetCoordinates] = useState([]);
    const [stoppages, SetStoppages] = useState([]);

    useEffect(() => {
        fetchData().then(({ latLngs, stoppages }) => {
            SetCoordinates(latLngs);
            SetStoppages(stoppages);
        }).catch(error => console.error('error fetching coordinates', error));
    }, []);

    return (
      <MapContainer
        center={[12.9677449, 74.871435]}
        zoom={12}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {coordinates.length > 0 && (
          <Polyline positions={coordinates} color="red" />
        )}

        {stoppages.map((stoppage, index) => (
          <Marker key={index} position={stoppage.position}>
            <Popup>
              <div>
                <strong>Stoppage Information</strong>
                <p>
                  <strong>Reach Time : </strong> {stoppage.reachTime}
                </p>
                <p>
                  <strong>End Time : </strong> {stoppage.endTime}
                </p>
                <p>
                  <strong>Duration : </strong> {stoppage.duration}
                  minutes
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    );
}