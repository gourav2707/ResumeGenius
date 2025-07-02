import React from 'react';
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import { useResume } from '../contexts/ResumeContext';

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    thumbnail: '/templates/classic-thumbnail.jpg',
    description: 'Clean and professional design'
  },
  {
    id: 'modern',
    name: 'Modern',
    thumbnail: '/templates/modern-thumbnail.jpg',
    description: 'Sleek contemporary layout'
  },
  {
    id: 'creative',
    name: 'Creative',
    thumbnail: '/templates/creative-thumbnail.jpg',
    description: 'Unique and artistic style'
  }
];

const TemplateSelector = () => {
  const { setTemplate } = useResume();

  const handleTemplateSelect = (templateId) => {
    setTemplate(templateId);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom align="center" style={{ marginBottom: '30px' }}>
        Choose a Resume Template
      </Typography>
      
      <Grid container spacing={4} justifyContent="center">
        {templates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <Card 
              sx={{ maxWidth: 345 }}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={template.thumbnail}
                  alt={template.name}
                />
                <div style={{ padding: '16px' }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {template.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {template.description}
                  </Typography>
                </div>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TemplateSelector;