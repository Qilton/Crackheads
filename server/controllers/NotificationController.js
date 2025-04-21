const admin = require("../utils/firebase-admin");
const mongoose= require("mongoose");
const User = require("../models/user");
const fcmToken= async (req, res) => {
    const { token } = req.body;
    const userId = req.user._id; 
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (!user.fcmToken.includes(token)) {
      user.fcmToken.push(token);
      await user.save();
    }
  
    res.status(200).json({ message: "Token saved successfully" });
  };
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const sendRepeatedNotification = async (tokens, message) => {
    const payload = {
      notification: {
        title: "Help Alert!",
        body: message,
      },
      data: {
        title: "Help Alert!",
        body: message,
        click_action: "https://your-site.com/alert",
        audio: "some-audio-url"
      }
    };
  
    const options = {
      priority: 'high',
      timeToLive: 60 * 60 * 24 // 1 day in seconds
    };
  
    const sendNotification = async () => {
      try {
        const response = await admin.messaging().sendEachForMulticast({
          tokens,
          notification: payload.notification,
          data: payload.data,
          android: { priority: "high" },
          webpush: {
            headers: { Urgency: "high" },
          },
        });
  
        const failedTokens = [];
  
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            const token = tokens[idx];
            console.error(`❌ Token #${idx} failed:`, token, resp.error.message);
  
            const errorCode = resp.error.code;
            if (
              errorCode === "messaging/invalid-argument" ||
              errorCode === "messaging/registration-token-not-registered" ||
              resp.error.message.includes("Requested entity was not found")
            ) {
              failedTokens.push(token);
            }
          }
        });
  
        if (failedTokens.length > 0) {
          await User.updateMany(
            { fcmToken: { $in: failedTokens } },
            { $pull: { fcmToken: { $in: failedTokens } } }
          );
          console.log("✅ Removed invalid FCM tokens from database.");
        }
  
      } catch (error) {
        console.error("🚨 Error sending notification:", error);
      }
    };
  
    // Send the notification 5 times with 1-second delay
      for (let i = 0; i < 5; i++) {
    await sendNotification();
    await delay(1000); // wait 1 second between sends
  }
  };
  
  

  const alert = async (req, res) => {
    const { communityId, message } = req.body;
  const objectId = new mongoose.Types.ObjectId(communityId);

    const users = await User.find({ 'communities.communityId': objectId });

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