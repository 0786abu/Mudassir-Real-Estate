import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const agentSchema = new Schema({
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
  agencyProfile: {
    public_id:String,
    url:String
  },
  agencyName: {
    type:String
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
  role:{
    type:String,
    required:true,
    enum:["agent"]
  },
  gender:{
    type:String
  },
  DOB:{
    type:Date
  },
  socialMedia: {
  facebook: { type: String },
  instagram: { type: String },
  linkedin: { type: String },
  youtube: { type: String },
  website: { type: String },
},
numOfProperties:{
    type:Number,
    default:0
},
whatsappAPI:{
    type:String
}
},{ timestamps: true });
const Agent = mongoose.models.Agent || mongoose.model("Agent", agentSchema);

export default Agent;