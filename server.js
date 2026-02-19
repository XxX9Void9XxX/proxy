const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/fetch', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('Missing url parameter');
  }
  try {
    const response = await axios.get(url);
    // Send the HTML content back
    res.send(response.data);
  } catch (err) {
    res.status(500).send('Error fetching URL');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
