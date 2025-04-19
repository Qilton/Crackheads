const UserModel=require("../models/user")

const updateUser=async(req,res)=>{
    try{
        const {name,address,phone,location}=req.body;
        if(!name || !address || !phone || !location){
            return res.status(400).json({message:"Please provide all the fields",success:false})
        }
        const id=req.params.id;
        const user=await UserModel.findById(id);
        if(!user){
            return res.status(404).json({message:"User not found",success:false})
        }
        await UserModel.findByIdAndUpdate(id,{name,address,phone,location},{new:true})
        res.status(200).json({message:"User updated successfully",success:true})
    }
    catch(err){
        res.status(500).json({message:"Internal Server Error",success:false})
    }
}

module.exports={updateUser}