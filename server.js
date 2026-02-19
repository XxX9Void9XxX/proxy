const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/render', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing url parameter');

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Get the full page content after JS execution
    const content = await page.content();

    await browser.close();

    res.send(content);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error rendering page');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
