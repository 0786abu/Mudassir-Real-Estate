import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const subscribeEmailSchema = new Schema({
  email: {
    type: String,
    validate: [validator.isEmail, "Please enter a valid email"],
    required: true,
    unique: true,
  }
},{ timestamps: true });
const Email = mongoose.models.Email || mongoose.model("Email", subscribeEmailSchema);

export default Email;