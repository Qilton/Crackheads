const Community = require('../models/community'); 
const User = require('../models/user');
const  mongoose=require("mongoose")
const createCommunity = async (req, res) => {
  try {
    console.log("Create community request body:", req.body);
    const { communityName, description } = req.body;
    console.log(req.user)
    const userId = req.user._id;
    if (!communityName || !description) {
      return res.status(400).json({ message: 'Name and description are required.' });
    }
    const user= await User.findById(userId);
    if(!user){
      return res.status(404).json({message:"User not found"})
    }

    const newCommunity = new Community({
      name: communityName,
      description,
      admins: [userId], 
      members: [{userId:userId,role:"admin"}],
      joinCodes: [],
      createdAt: new Date(),
    });

    await newCommunity.save();

    await User.findByIdAndUpdate(userId, {
        $push: { communities: newCommunity._id },
        $set: { role: "admin" }, 
      });

    return res.status(201).json({ message: 'Community created successfully', community: newCommunity });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createCommunity };
