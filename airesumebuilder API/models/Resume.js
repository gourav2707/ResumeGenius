import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  fullName: { type: String, trim: true },
  email: { type: String, lowercase: true },
  phone: String,
  location: String,
  careerObjective: String,
  education: [
    {
      degree: String,
      institution: String,
      year: String,
    }
  ],
  experience: [
    {
      company: String,
      role: String,
      duration: String,
      description: String,
    }
  ],
  projects: [
    {
      title: String,
      description: String,
      link: String,
    }
  ],
  skills: [String],
  strengths: [String],
  certifications: [String],
  hobbies: [String],

  type: {
    type: String,
    enum: ["template", "custom"],
    default: "template",
    required: true
  },

  template: {
    type: String,
    enum: ["classic", "modern", "creative", "ats", "custom"],
    default: "classic"
  },

   
  customContent: {
    type: Array,
    default: []
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }

}, { timestamps: true });

export default mongoose.model("Resume", resumeSchema);



// import mongoose from "mongoose";

// const resumeSchema = new mongoose.Schema({
//   fullName: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     lowercase: true,
//   },
//   phone: {
//     type: String,
//   },
//   location: {
//     type: String,
//   },
//   careerObjective: {
//     type: String,
//   },
//   education: [
//     {
//       degree: String,
//       institution: String,
//       year: String,
//     }
//   ],
//   experience: [
//     {
//       company: String,
//       role: String,
//       duration: String,
//       description: String,
//     }
//   ],
//   projects: [
//     {
//       title: String,
//       description: String,
//       link: String,
//     }
//   ],
//   skills: [String],
//   strengths: [String],
//   certifications: [String],
//   hobbies: [String],
//    template: {
//     type: String,
//     required: true,
//     enum: ["classic", "modern", "creative", "ats"],
//     default: "classic",
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   }
// }, { timestamps: true });

// const Resume = mongoose.model("resume", resumeSchema);
// export default Resume;
