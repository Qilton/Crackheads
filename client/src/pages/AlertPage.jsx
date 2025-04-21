import React from 'react';

const AlertPage = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const name = queryParams.get("name");
  const lat = queryParams.get("lat");
  const lng = queryParams.get("lng");
  const alert = queryParams.get("alert");

  const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 space-y-6">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-red-600">🚨 {alert}</h1>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Location:</strong> Lat: {lat}, Lng: {lng}</p>
        <div className="mt-4 w-full h-64 rounded-lg overflow-hidden">
          <iframe
            title="User Location"
            src={mapSrc}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AlertPage;
