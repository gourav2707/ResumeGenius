import express from "express";
import {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume
} from "../controllers/resume.controller.js";
import Resume from "../models/Resume.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();
 router.get('/public/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.json({ resume });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.use(authenticate);  

router.post("/create", createResume);
router.get("/fetch", getAllResumes);
router.get("/fetch/:id", getResumeById);
router.put("/update/:id", updateResume);
router.delete("/delete/:id", deleteResume);
 
 


 
router.put('/update-template/:id', async (req, res) => {
  const { id } = req.params;
  const { template } = req.body;

  try {
    const updatedResume = await Resume.findByIdAndUpdate(
      id,
      { template: template },
      { new: true } // returns updated document
    );

    if (!updatedResume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json({ success: true, resume: updatedResume });
  } catch (err) {
    console.error('Error updating template:', err);
    res.status(500).json({ error: 'Server error while updating template' });
  }
});



export default router;
