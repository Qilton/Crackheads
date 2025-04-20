
const UserModel=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

require("../utils/db")

const signup= async (req,res) => {
  try {
    const{name,email,password}= req.body;
    const user=await UserModel.findOne({email})
    if(user){
       return res.status(409).json({message: "User already exists, you can login",success:false})
    }
    const userModel= new UserModel({name,email,password})
    userModel.password=await bcrypt.hash(password,10)
    await userModel.save()
    res.status(201).json({message:"Signup Succesfully",success:true})
  } catch (err) {
    res.status(500).json({message:"Internal Server Error",success:false})
  }
}




const login = async (req, res) => {
    try {
        console.log("Login request body:", req.body);
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            console.log("User not found");
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            console.log("Password not equal");
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        
    console.log("Password matched, generating token...");
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        console.log("Token generated successfully");
       return res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                id: user._id,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}
  

module.exports={signup,login}
