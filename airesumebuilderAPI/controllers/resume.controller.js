import Resume from "../models/Resume.js";  

 
export const createResume = async (req, res) => {
  try {
    const resumeData = req.body;

     
    resumeData.userId = req.user.userId;

     
    const resume = await Resume.create(resumeData);

    return res.status(201).json({
      message: "Resume created successfully",
      resume,
    });

  } catch (err) {
    console.error("Error creating resume:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
};



export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.userId }).sort({ updatedAt: -1 });;
    return res.status(200).json( {message: "Resume Fetched By id",resumes});  
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


 
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({ resume });  

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


 
export const updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const resumeData = req.body;

    const updated = await Resume.findByIdAndUpdate(id, resumeData, { new: true });
    res.status(200).json({ message: "Resume updated", resume: updated });
  } catch (err) {
    res.status(500).json({ error: "Update failed", details: err.message });
  }
};



 
export const deleteResume = async (req, res) => {
  try {
    const deleted = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });
    if (!deleted) return res.status(404).json({ message: "Resume not found" });
    res.json({ message: "Resume deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
