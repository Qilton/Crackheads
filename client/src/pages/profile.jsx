import React, { useEffect, useState } from "react";
import { Camera, MapPin, Phone } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyDwDptbSsNwAu-w91OKbO9YQswSsKVJk6g";

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

function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("id");
        const token = localStorage.getItem("token");

        const response = await axios.get(`http://localhost:8080/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data.user;

        const userProfile = {
          name: user.name,
          email: user.email,
          address: user.address || "",
          phone: user.phone || "",
          photoUrl: user.photoUrl || "",
        };

        setProfile(userProfile);
        setFormData(userProfile);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const newPhotoUrl = URL.createObjectURL(file);
      setPhotoFile(file); // store for upload
      setFormData({ ...formData, photoUrl: newPhotoUrl });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getCurrentAddress = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await axios.get(
            "https://maps.googleapis.com/maps/api/geocode/json",
            {
              params: {
                latlng: `${latitude},${longitude}`,
                key: GOOGLE_MAPS_API_KEY,
              },
            }
          );
          const address = response.data.results?.[0]?.formatted_address || "";
          setFormData({ ...formData, address });
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("id");
      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("address", formData.address);
      data.append("phone", formData.phone);
      if (markerPosition) {
        data.append("location", JSON.stringify(markerPosition));
      }
      if (photoFile) data.append("photo", photoFile); // only if a new one is selected

      await axios.post(`http://localhost:8080/user/update/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!profile || !formData) return <div>Loading profile...</div>;

  return (
    <div className="min-h-screen bg-white flex">
      <div className="w-80 border-r border-gray-200 p-8 flex flex-col items-center">
        <div className="relative">
          <img
            src={formData.photoUrl || "/default-profile.png"}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-2 border-lime-500"
          />
          {isEditing && (
            <label className="absolute bottom-2 right-2 bg-white rounded-full p-2 cursor-pointer shadow-lg border border-gray-200">
              <Camera className="w-5 h-5 text-gray-700" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </label>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mt-6">
          {formData.name}
        </h2>
        <p className="text-gray-500 text-sm mt-2">{formData.email}</p>
      </div>

      <div className="flex-1 p-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Profile Settings
          </h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900">Address</h3>
                </div>
                {isEditing ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-lime-500"
                      />
                      <button
                        type="button"
                        onClick={getCurrentAddress}
                        className="px-6 py-3 text-sm font-medium text-white bg-lime-500 rounded-lg hover:bg-lime-600"
                      >
                        Use My Location
                      </button>
                    </div>
                    <GoogleMapPicker
                      onLocationSelect={(address) =>
                        setFormData({ ...formData, address })
                      }
                    />
                  </div>
                ) : (
                  <p className="text-gray-700 text-lg">{formData.address}</p>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="w-6 h-6 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900">
                    Phone Number
                  </h3>
                </div>
                {isEditing ? (
                  <PhoneInput
                    country={"us"}
                    value={formData.phone}
                    onChange={(phone) =>
                      setFormData({ ...formData, phone })
                    }
                    inputClass="!w-full !pl-12 !border !border-gray-200 !rounded-lg !py-3 !text-base"
                    containerClass="!w-full"
                  />
                ) : (
                  <p className="text-gray-700 text-lg">{formData.phone}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(profile);
                      setPhotoFile(null);
                      setIsEditing(false);
                    }}
                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-medium text-white bg-lime-500 rounded-lg hover:bg-lime-600"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 text-sm font-medium text-white bg-lime-500 rounded-lg hover:bg-lime-600"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
