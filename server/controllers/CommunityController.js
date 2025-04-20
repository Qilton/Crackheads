const Community = require('../models/community'); 
const User = require('../models/user');
const  mongoose=require("mongoose")
const createCommunity = async (req, res) => {
  try {
    const { communityName, description } = req.body;
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
      $push: {
        communities: {
          communityId: newCommunity._id,
          role: 'admin'
        }
      }
    });
    

    return res.status(201).json({ message: 'Community created successfully', community: newCommunity });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const isAdminOfCommunity = (user, communityId) => {
  return user.communities.some((comm) => {
    console.log(comm.communityId)
    return (
      comm.communityId.toString() === communityId.toString() &&
      comm.role === 'admin'
    );
  });
};


const generateRandomCode=()=>{
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
}
const createCode=async(req,res)=>{
  try {
      const {communityId}=req.body
      const userId=req.user._id
      if(!communityId){
          return res.status(400).json({message:"Community ID is required"})
      }
      const community=await Community.findById(communityId)
      if(!community){
          return res.status(404).json({message:"Community not found"})
      }
      const user=await User.findById(userId)
      if(!user ||!isAdminOfCommunity(user,communityId)){
          return res.status(403).json({message:"You are not authorized to create a code for this community"})
      }
      const code=generateRandomCode()
      community.joinCodes.push(code)
      await community.save()
      return res.status(200).json({message:"Code created successfully",code})
     

  } catch (error) {
      console.error(error)
      return res.status(500).json({message:"Internal server error"})
  }
}

const joinCommunity=async(req,res)=>{
  try {
      const {communityName,code}=req.body
      const userId=req.user._id
      if(!communityName || !code){
          return res.status(400).json({message:"Community name and code are required"})
      }
      const community=await Community.findOne({name:communityName})
      console.log(community)
      if(!community){
          return res.status(404).json({message:"Community not found"})
      }
      const user=await User.findById(userId)
      if(!user){
          return res.status(404).json({message:"User not found"})
      }
      if(!community.joinCodes.includes(code)){
          return res.status(403).json({message:"Invalid code"})
      }
      const isMember=community.members.some((member)=>member.userId.toString()===userId.toString())
      if(isMember){
          return res.status(400).json({message:"You are already a member of this community"})
      }
      community.members.push({userId:userId,role:"member"})
      await community.save()
      await User.findByIdAndUpdate(userId,{
          $push:{
              communities:{
                  communityId:community._id,
                  role:"member"
              }
          }
      })
      community.joinCodes=community.joinCodes.filter((c)=>c!==code)
      return res.status(200).json({message:"Joined community successfully"})
      
    }
    
  catch (error) {
      console.error(error)
      return res.status(500).json({message:"Internal server error"})
  }
}

module.exports = { createCommunity,createCode,joinCommunity };
