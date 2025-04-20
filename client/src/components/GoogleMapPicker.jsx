// components/GoogleMapPicker.js
import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "axios";



function GoogleMapPicker({ onLocationSelect,markerPosition,setMarkerPosition }) {

  const GOOGLE_MAPS_API_KEY = "AIzaSyDwDptbSsNwAu-w91OKbO9YQswSsKVJk6g";

  const containerStyle = {
    width: "100%",
    height: "400px",
  };
  
  const defaultCenter = {
    lat: 28.6139,
    lng: 77.209,
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });

    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            latlng: `${lat},${lng}`,
            key: GOOGLE_MAPS_API_KEY,
          },
        }
      );
      const address = response.data.results?.[0]?.formatted_address || "";
      onLocationSelect(address);
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
    }
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={markerPosition || defaultCenter}
      zoom={markerPosition ? 14 : 5}
      onClick={handleMapClick}
    >
      {markerPosition && <Marker position={markerPosition} />}
    </GoogleMap>
  );
}

export default GoogleMapPicker;