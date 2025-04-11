const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path'); // Ekledik
require('dotenv').config();

const Movie = require('./models/Movie');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB bağlantısı başarılı');
})
.catch((err) => {
  console.error('MongoDB bağlantı hatası:', err);
});

// Routes
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/movies', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// React build dosyalarını sun (Render için)
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// React tarafındaki tüm route'ları yakala
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Server başlat
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
