import mongoose from "mongoose";
const UserSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
     type:String,
     required:true
    },
    role:{
        type:String,
        enum:["student","eductor"],
        required:true
    },
    description:{
    type:String
    },
     photoUrl:{
        type:String,
        default:"",
    },
    enrolledCourses:{
        type:mongoose.Schema.ObjectId,
        ref:"courses"
    }


},{timestamps:true})

const  User=mongoose.model("User",UserSchema)
export default User;