const Song = require("../model/Song"); // Assuming you have a Song model for your database

// Upload a song (already being handled by multer in routes)
const uploadSong = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    const newSong = await Song.create({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album || "Unknown Album",
      genre: req.body.genre || "Unknown Genre",
      mood: req.body.mood || "Neutral",
      filePath: `/uploads/${req.file.filename}`, // File path saved in the database
    });

    res.status(201).json({
      message: "Song uploaded successfully!",
      song: newSong,
      songUrl: `http://localhost:5000${newSong.filePath}`, // Song playback URL
    });
  } catch (error) {
    console.error("Error uploading song:", error);
    res.status(500).json({ message: "Error uploading song", error: error.message });
  }
};

// Get all songs
const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.findAll(); // Retrieve all songs from database
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching songs", error: error.message });
  }
};

// Get a song by ID
const getSongById = async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id); // Find song by ID
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: "Error fetching song", error: error.message });
  }
};

// Update a song
const updateSong = async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // Prepare an object to update fields
    const updatedFields = {};

    // Update text fields if provided
    if (req.body.title) updatedFields.title = req.body.title;
    if (req.body.artist) updatedFields.artist = req.body.artist;
    if (req.body.album) updatedFields.album = req.body.album;
    if (req.body.genre) updatedFields.genre = req.body.genre;
    if (req.body.mood) updatedFields.mood = req.body.mood;

    // If a new file is uploaded, update the file path
    if (req.file) {
      updatedFields.filePath = req.file.path;  // Ensure this matches the model's file path column
    }

    // Update the song with the provided fields
    const updatedSong = await song.update(updatedFields);

    res.status(200).json({ message: "Song updated successfully", song: updatedSong });
  } catch (error) {
    res.status(500).json({ message: "Error updating song", error: error.message });
  }
};

// Delete a song
const deleteSong = async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    await song.destroy();
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting song", error: error.message });
  }
};

module.exports = {
  uploadSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
};
