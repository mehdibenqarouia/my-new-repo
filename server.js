const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3002;

const apiKey = 'e4356ac60120a42764df9bad06e22836'; // Your Neocities API key
const siteName = 'csvpicturespy'; // Your Neocities site name

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/images', async (req, res) => {
    try {
        const response = await fetch(`https://neocities.org/api/list?sitename=${siteName}&key=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const images = data.files.filter(file => file.path.endsWith('.png') || file.path.endsWith('.jpg') || file.path.endsWith('.jpeg'));
        res.json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});