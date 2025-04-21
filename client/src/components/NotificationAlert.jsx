import { useState, useEffect } from "react";
import { messaging, getToken } from "../utils/firebase";

const NotificationAlert = () => {
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      setShowSlider(true);
    }
  }, []);

  const handleEnableNotifications = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: "BLutXQ7rOfztcm0DQg1IFv1tVaUgSGj9KfQokJlPY1CDgPWAeld-WW-NDnOTefp5MKlsjmdvqrScIP6zR4DkALI",
        });


        await fetch("https://crackheads-three.vercel.app/notification/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${localStorage.getItem("token")}`, 
            },
            body: JSON.stringify({ token }),
          });
          
        setShowSlider(false);
      } else {
        alert("Permission denied for notifications.");
      }
    } catch (error) {
      console.error("Notification permission error:", error);
    }
  };

  const handleClose = () => {
    setShowSlider(false);
  };

  if (!showSlider) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white shadow-xl p-4 rounded-2xl border border-gray-200 w-80 transition-transform duration-500 animate-slide-in">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">Enable Notifications</h3>
          <p className="text-sm text-gray-600 mt-1">
            Would you like to receive important updates?
          </p>
        </div>
        <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 ml-4">
          ✕
        </button>
      </div>
      <button
        onClick={handleEnableNotifications}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
      >
        Allow Notifications
      </button>
    </div>
  );
};

export default NotificationAlert;
