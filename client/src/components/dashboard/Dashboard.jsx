import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCommunity } from "../../provider/CommunityProvider.jsx"

const AlertButton = ({ title, icon, color, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-center p-4 ${color} text-white rounded-xl hover:opacity-90 transition-opacity duration-200`}
  >
    <div className="flex items-center space-x-3">
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
      </svg>
      <span className="font-medium">{title}</span>
    </div>
  </button>
);





const Dashboard = () => {
  const { selectedCommunity, setSelectedCommunity } = useCommunity();
  const [communities, setCommunities] = useState([]);

  const sendAlert = (alertTitle) => {
    if (!selectedCommunity) {
      return alert("Please select a community.");
    }
  
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
      const name = localStorage.getItem("loggedInUser");
  
      try {
        const res = await axios.post("http://localhost:8080/notification/alert", {
          communityId: selectedCommunity.communityId,
          message: alertTitle,
          locationUrl,
          name,
        }, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
  
        alert("Emergency notification sent!");
        console.log("Server response:", res.data);
  
      } catch (error) {
        console.error("Error sending alert:", error);
        alert("Failed to send alert.");
      }
    }, (err) => {
      console.error("Location error:", err);
      alert("Please enable location access.");
    });
  };
  
  
  useEffect(() => {
    const getCommunity = async () => {
      try {
        const result = await axios.get("http://localhost:8080/community/get", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        })

        setCommunities(result.data.communities);
        if (result.data.communities.length > 0 && !selectedCommunity) {
          setSelectedCommunity(result.data.communities[0]);
        }

      } catch (error) {
        console.error("Error fetching community data:", error);
      }

    }
    getCommunity()
  }, [])

  const HandleCode = async (communityId) => {
    try {
      const result = await axios.post(`http://localhost:8080/community/code`, { communityId }, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      alert(`It is a one time code. Make sure to copy it :  ${result.data.code}`);
    } catch (error) {
      console.error("Error generating code:", error);
    }
  }

  const alerts = [
    { title: 'Suspicious Activity', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', color: 'bg-yellow-500' },
    { title: 'Stranger at Door', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', color: 'bg-orange-500' },
    { title: 'Fire Alert', icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z', color: 'bg-red-500' },
    { title: 'Theft or Vandalism', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', color: 'bg-purple-500' },
    { title: 'Emergency', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', color: 'bg-red-600' },
  ];

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">History</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">History visualization would go here</p>
          </div>
        </div>

        {/* Projects section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className='flex justify-between items-start  mb-4 w-[full]'>
            <h2 className="text-xl font-semibold mb-4">Active Community</h2>
            {selectedCommunity?.role === 'admin' && <button
              onClick={() => HandleCode(selectedCommunity.communityId)}
              disabled={!selectedCommunity}
              className="text-sm bg- font-semibold  text-blue-600 hover:underline"
            >Generate Code</button>}
          </div>
          <div className="space-y-4">
            {communities.map((community) => {
              const isSelected = selectedCommunity?.communityId === community.communityId;
              return (
                <div
                  key={community.communityId}
                  onClick={() => setSelectedCommunity(community)}
                  className={`cursor-pointer flex justify-between items-center p-4 rounded-lg transition-all duration-200 ${isSelected ? 'bg-blue-100 border border-blue-400' : 'bg-gray-50'
                    }`}
                >
                  <div>
                    <h3 className="font-medium">{community.name}</h3>
                    <p className="text-sm text-gray-500">{community.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{community.role}</p>
                    <p className="text-xs text-gray-500">{community.membersCount}</p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Emergency Alerts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {alerts.map((alert) => (
            <AlertButton
              key={alert.title}
              title={alert.title}
              icon={alert.icon}
              color={alert.color}
              onClick={() => sendAlert(alert.title)}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;