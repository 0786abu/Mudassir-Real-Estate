const mongoose = require("mongoose");
const validator = require("validator");

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

module.exports = Email;