const admin = require("firebase-admin");
const mongoose= require("mongoose");
const User = require("../models/user");
const fcmToken= async (req, res) => {
    const { token } = req.body;
    const userId = req.user.id; 
    
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }
    
    const user = await User.findById(userId);
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (!user.fcmToken.includes(token)) {
      user.fcmToken.push(token);
      await user.save();
    }
  
    res.status(200).json({ message: "Token saved successfully" });
  };
const sendRepeatedNotification = async (tokens, message) => {
    const payload = {
      notification: {
        title: "Help Alert!",
        body: message,
        click_action: "https://your-site.com/alert",
      },
    };
  
    const sendNotification = async () => {
      try {
        const response = await admin.messaging().sendToDevice(tokens, payload);
        console.log("Notification sent:", response);
      } catch (error) {
        console.error("Error sending notification", error);
      }
    };
  
    for (let i = 0; i < 5; i++) {
      setTimeout(sendNotification, i * 1000); 
    }
  };
  

  const alert = async (req, res) => {
    const { communityId, message } = req.body;
  
  const objectId = new mongoose.Types.ObjectId("6804abda53c1eb14a4ab5317");

  
    const users = await User.find({ communities: objectId });
  
    const tokens = users.flatMap(user => user.fcmToken);
  
    if (tokens.length === 0) {
      return res.status(400).json({ message: "No users in the community have FCM tokens" });
    }
  
    await sendRepeatedNotification(tokens, message);
  
    res.status(200).json({ message: "Repeated notifications sent successfully" });
  };
  module.exports = {
    fcmToken,
    alert,
  };