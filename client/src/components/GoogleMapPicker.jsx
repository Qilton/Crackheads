// components/GoogleMapPicker.js
import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.209,
};

function GoogleMapPicker({ onLocationSelect }) {
  const [markerPosition, setMarkerPosition] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace this
    libraries: ["places"],
  });

  const handleMapClick = useCallback(async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });

    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            latlng: `${lat},${lng}`,
            key: "AIzaSyCGyi_WL_32_GlhP4Dny8RctfHmnRiMFTY", 
          },
        }
      );
      const address = response.data.results?.[0]?.formatted_address || "";
      onLocationSelect({address, lat, lng});
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
    }
  }, [onLocationSelect]);

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

export default React.memo(GoogleMapPicker);
