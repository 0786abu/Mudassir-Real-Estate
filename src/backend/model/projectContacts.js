import mongoose from "mongoose";


const {Schema} = mongoose;

const projectLeadSchema = new Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },

  name: {
    type: String,
    required: true,
  },
  email: {
    type: String
  },
  phone: {
    type: Number,
    required: true,
  },

}, { timestamps: true });


const ProjectLead = mongoose.models.ProjectLead || mongoose.model("ProjectLead", projectLeadSchema);

export default ProjectLead;