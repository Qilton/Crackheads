import React, { useEffect, useState } from "react";
import { Camera, MapPin, Phone } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import GoogleMapPicker from "../components/GoogleMapPicker";
import Navbar from "../components/landing/Navbar";
import { useNavigate } from "react-router-dom";



function Profile() {
  const navigate = useNavigate();
  const GOOGLE_MAPS_API_KEY = "AIzaSyDwDptbSsNwAu-w91OKbO9YQswSsKVJk6g"
  const [markerPosition, setMarkerPosition] = useState(null);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("id");
        const token = localStorage.getItem("token");

        const response = await axios.get(`https://crackheads-three.vercel.app/user/${userId}`, {
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
          pfp: user.pfp || "",
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
      setFormData({ ...formData, pfp: newPhotoUrl });
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
  
          setMarkerPosition({ lat: latitude, lng: longitude });
  
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
  
          setFormData((prev) => ({ ...prev, address }));
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      });
    }
  };
  
  const HandleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;
  
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("loggedInUser");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
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

      await axios.post(`https://crackheads-three.vercel.app/user/update/${userId}`, data, {
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
  <div>
    <Navbar scrolled={true} className="fixed" />
    <div className="min-h-screen bg-white pt-16 px-4 md:px-0">
      <div className="md:flex md:items-start md:space-x-6">
        {/* Sidebar/Profile Pic */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 md:p-8 flex flex-col items-center">
          <div className="relative">
            <img
              src={formData.pfp || "/default-profile.png"}
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-lime-500"
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
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-4">
            {formData.name}
          </h2>
          <p className="text-gray-500 text-sm mt-1">{formData.email}</p>
        </div>

        {/* Profile Form */}
        <div className="flex-1 pt-6 md:py-10 md:pr-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Profile Settings
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Address Block */}
              <div className="bg-gray-50 rounded-lg p-4 md:p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900">Address</h3>
                </div>
                {isEditing ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-3">
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
                        className="px-4 py-3 text-sm font-medium text-white bg-lime-500 rounded-lg hover:bg-lime-600"
                      >
                        Use My Location
                      </button>
                    </div>
                    <GoogleMapPicker
                      markerPosition={markerPosition}
                      setMarkerPosition={setMarkerPosition}
                      onLocationSelect={(address) =>
                        setFormData({ ...formData, address })
                      }
                    />
                  </div>
                ) : (
                  <p className="text-gray-700 text-lg">{formData.address}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="bg-gray-50 rounded-lg p-4 md:p-6 space-y-4">
                <div className="flex items-center gap-3">
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

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(profile);
                        setPhotoFile(null);
                        setIsEditing(false);
                      }}
                      className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-white bg-lime-500 rounded-lg hover:bg-lime-600"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <>

                   <button
                    type="button"
                    onClick={() => HandleLogout()}
                    className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    Logout
                  </button>
                   <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-white bg-lime-500 rounded-lg hover:bg-lime-600"
                  >
                    Edit Profile
                  </button>
                  </>

                )}
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  
  </div>
);

}

export default Profile;
