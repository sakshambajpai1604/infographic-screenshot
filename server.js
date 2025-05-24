const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.post('/screenshot', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });

  const element = await page.$('#infographic');
  const screenshotBuffer = await element.screenshot({ type: 'png' });

  await browser.close();

  res.set({
    'Content-Type': 'image/png',
    'Content-Disposition': 'attachment; filename="infographic.png"',
  });

  res.send(screenshotBuffer);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
