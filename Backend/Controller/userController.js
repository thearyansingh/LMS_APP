import User from "../Modals/UserModal.js";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import genToken from "../config/token.js";
export const Register=async(req,res)=>{
    
    try {
        const {name,email,password,role}=req.body
         const userExist=await User.findOne({email})
         if(userExist){
            return res.status(400).json({message:"user already exist"})
         }
        if((!validator.isEmail(email))){
            return res.status(400).json({message:"email format is incorrect"})
        }
        if(password.length<8)
            return res.status(400).json({message:"enter password above 8 character"})

     const hashPassword=await bcrypt.hash(password,10)
     const UserData=await User.create({
    name,
    email,
    password:hashPassword,
    role
     })
     const token=genToken(UserData._id)
     res.cookie("token",token,{
        httpOnly:true,
        SameSite:"strict",
        secure:true,
        maxAge:7*24*60*60*1000
        
     })
     res.status(201).json({message:"User is Created",users:UserData})

    } catch (error) {
        res.status(500).json({message:"Internal server error is signUp user :",error})
    }

}




export const Login = async (req, res) => {
  try {
    const { email, password} = req.body;

    // 1. Check if all fields exist
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 4. Generate JWT token
    
const token=genToken(user._id)
    // 5. Send response

    console.log(token)
     res.cookie("token",token,{
        httpOnly:true,
        SameSite:"strict",
        secure:true,
        maxAge:7*24*60*60*1000
        
     })
     res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role:user.role
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error in login user",
      error,
    });
  }
};


