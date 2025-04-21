import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
  console.log("Foreground message received: ", payload);

  // Audio URL for the sound you want to play
  const audioUrl = 'https://commondatastorage.googleapis.com/codeskulptor-assets/jump.ogg'; // Example URL, replace with your own

  // Create an Audio object to play the sound
  const audio = new Audio(audioUrl);
  audio.play();

  toast.info(
    <div>
      <strong>{payload.notification.title}</strong>
      <div>{payload.notification.body}</div>
    </div>,
    {
      onClick: () => {
        const url = payload?.notification?.click_action || "/";
        window.open(url, "_blank");
      },
    }
  );
});

export { messaging, getToken, onMessage };
