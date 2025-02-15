require('dotenv').config(); // Add this line
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

// Replace hardcoded values with these
const apiKey = process.env.NEO_API_KEY; // <-- Added here
const siteName = process.env.NEO_SITE_NAME; // Fixed spelling
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = 3002; // <-- Changed to 3002

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint
app.get('/api/images', async (req, res) => {
  try {
    const response = await fetch('https://neocities.org/api/list?sitename=csvpicturespy', {
      headers: { Authorization: 'Bearer e4356ac60120a42764df9bad06e22836' }
    });
    const data = await response.json();
    const images = data.files.filter(file => file.path.match(/\.(png|jpg|jpeg)$/i));
    res.json(images);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server error');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`); // <-- Now 3002
});