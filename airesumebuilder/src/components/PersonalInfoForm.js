import React, { useState, useEffect } from 'react';
import { useResume } from '../contexts/ResumeContext';
import {
  TextField,
  Button,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  Avatar,
  Box
} from '@mui/material';
import { PhotoCamera, Save, Clear } from '@mui/icons-material';

const PersonalInfoForm = ({ onNext }) => {
  const { resume, updateResume } = useResume();
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    summary: '',
    photo: null,
    photoPreview: ''
  });

  useEffect(() => {
    if (resume.personalInfo) {
      setPersonalInfo({
        ...resume.personalInfo,
        photoPreview: resume.personalInfo.photo || ''
      });
    }
  }, [resume]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonalInfo(prev => ({
          ...prev,
          photo: file,
          photoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateResume({ personalInfo });
    if (onNext) onNext();
  };

  const handleReset = () => {
    setPersonalInfo({
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      address: '',
      website: '',
      summary: '',
      photo: null,
      photoPreview: ''
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Personal Information
      </Typography>
      
      <Grid container spacing={3}>
        {/* Photo Upload */}
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={personalInfo.photoPreview}
            sx={{ width: 80, height: 80 }}
          />
          <Box>
            <input
              accept="image/*"
              id="photo-upload"
              type="file"
              style={{ display: 'none' }}
              onChange={handlePhotoChange}
            />
            <label htmlFor="photo-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<PhotoCamera />}
              >
                Upload Photo
              </Button>
            </label>
            {personalInfo.photoPreview && (
              <Button
                color="error"
                onClick={() => setPersonalInfo(prev => ({ ...prev, photo: null, photoPreview: '' }))}
                sx={{ ml: 2 }}
              >
                Remove
              </Button>
            )}
          </Box>
        </Grid>

        {/* Basic Info Fields */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Full Name"
            name="fullName"
            value={personalInfo.fullName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Job Title"
            name="jobTitle"
            value={personalInfo.jobTitle}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={personalInfo.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">+</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={personalInfo.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Website/Portfolio"
            name="website"
            value={personalInfo.website}
            onChange={handleChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">https://</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Professional Summary"
            name="summary"
            value={personalInfo.summary}
            onChange={handleChange}
            multiline
            rows={4}
            helperText="Briefly describe your professional background and skills"
          />
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Clear />}
            onClick={handleReset}
          >
            Clear
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<Save />}
          >
            Save & Continue
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfoForm;