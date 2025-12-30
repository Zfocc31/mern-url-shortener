require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const shortId = require('shortid');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// ✅ CREATE SHORT URL
app.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  const existingUrl = await ShortUrl.findOne({ originalUrl });
  if (existingUrl) {
    return res.json(existingUrl);
  }

  const shortUrl = new ShortUrl({
    originalUrl,
    shortCode: shortId.generate()
  });

  const result = await shortUrl.save();
  res.json(result);
});

// ✅ GET ALL URLS (MOVE THIS UP)
app.get('/api/urls', async (req, res) => {
  const urls = await ShortUrl.find().sort({ createdAt: -1 });
  res.json(urls);
});

// ✅ REDIRECT (ALWAYS KEEP LAST)
app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  const url = await ShortUrl.findOne({ shortCode });

  if (url) {
    url.clicks++;
    await url.save();
    return res.redirect(url.originalUrl);
  }

  res.status(404).json({ error: 'URL not found' });
});

// ✅ Render-compatible port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
