import React, { useState, FC } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

interface IMapProps {
  lat: any;
  setlat: (value: any) => void;
  lng: any;
  setlng: (value: any) => void;
}

const Map: FC<IMapProps> = ({ lng, setlng, lat, setlat }) => {
  const mapStyles: React.CSSProperties = {
    height: "400px",
    width: "100%",
  };

  const defaultCenter = {
    lat: 35.696625718604935, // Replace with your desired latitude
    lng: 51.457553521420195, // Replace with your desired longitude
  };

  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  const onMarkerDragEnd = (e: any) => {
    setlng(e.latLng.lng() as string);
    setlat(e.latLng.lat() as string);
    setMarkerPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAfJ3fC8YvnadyeyanNyR2aQ2_BSuSTXE4" // Replace with your Google Maps API key
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15} // Adjust the initial zoom level as needed
        center={defaultCenter}
        onClick={onMarkerDragEnd}
      >
        {/* Add a Draggable Marker */}
        <MarkerF position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(Map);
