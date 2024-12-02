const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const ffmpeg = require('fluent-ffmpeg');
const ffprobeStatic = require('ffprobe-static');
const path = require('path');
const userRoutes = require('./users'); // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files (audio, images, etc.) from the public directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Use user routes
app.use('/auth', userRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/spotify', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define schema and model for songs
const songSchema = new mongoose.Schema({
    name: String,
    artist: String,
    duration: String,
    path: String,
    image: String,
    language: String
});

const Song = mongoose.model('Song', songSchema);

// Get songs by language
app.get('/songs', async (req, res) => {
    const { lang } = req.query; // Get language from query
    try {
        const songs = await Song.find({ language: lang });
        res.json(songs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch songs" });
    }
});

const setDuration = (filePath, callback) => {
    ffmpeg.setFfprobePath(ffprobeStatic.path);
    ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
            console.error('Error calculating duration:', err);
            callback(null);
        } else {
            const durationInSeconds = metadata.format.duration;
            const minutes = Math.floor(durationInSeconds / 60);
            const seconds = Math.floor(durationInSeconds % 60);
            const duration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            console.log('Duration calculated:', duration); // Debugging
            callback(duration);
        }
    });
};

// Add a new song with specified language and calculate duration
app.post('/songs', async (req, res) => {
    const { name, artist, path, image, language } = req.body;
    setDuration(path, async (duration) => {
        if (duration) {
            const newSong = new Song({ name, artist, duration, path, image, language });
            await newSong.save();
            res.json(newSong);
        } else {
            res.status(500).json({ error: "Failed to calculate duration" });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
