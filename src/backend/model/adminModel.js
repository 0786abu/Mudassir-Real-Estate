import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const adminSchema = new Schema({
  name: {
    type: String,
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
  bio:{
    type:String
  },
  phone:{
    type:Number
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
    enum:["admin"]
  },
  gender:{
    type:String
  },
  DOB:{
    type:Date
  }
},{ timestamps: true });
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;