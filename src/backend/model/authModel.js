import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: true,
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please enter a valid email"],
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: [8, "Password must be at least 8 characters long"],
    required: true,
    select:false
  },
  landline:{
    type:Number
  },
  bio:{
    type:String
  },
  phone:{
    type:Number
  },
  isEmailVerified:{
    type:Boolean,
    default:false
  },
  isPhoneVerified: {
    type:Boolean,
    default:false
  },
  otpCode: {
    type: Number,
  },
  otpExpiry: {
    type: Date,
  },
  city:{
    type:String
  },
  address: {
    type: String,
  },
  state:{
    type:String
  },
  profile: {
    public_id:String,
    url:String
  },
  role:{
    type:String,
    required:true,
    enum:["individual"]
  },
  gender:{
    type:String
  },
  DOB:{
    type:Date
  }
},{ timestamps: true });
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;