import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const contactSchema = new Schema({
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
  phone:{
    type:Number,
    required:true
  },
  message:{
    type:String,
    required:true
  }
},{ timestamps: true });
const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;