const express = require("express");
const router = express.Router();
const upload = require("../middlewares/songupload");
const {
  uploadSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong
} = require("../controllers/songController");

// Routes
router.post("/add-song", upload.single("song"), uploadSong); // Upload Song
router.get("/songs", getAllSongs);                         // Get All Songs
router.get("/songs/:id", getSongById);                     // Get Song by ID
router.put("/update-songs/:id", upload.single("song"),updateSong);                      // Update Song
router.delete("/songs/:id", deleteSong);                   // Delete Song

// const Song = require("./model/Song");

// GET route to fetch all songs
// router.get("/songs", async (req, res) => {
//   try {
//     const songs = await Song.findAll(); // Or use your Sequelize method here
//     res.json(songs); // Respond with the songs data
//   } catch (error) {
//     console.error("Error fetching songs:", error);
//     res.status(500).send("Error fetching songs");
//   }
// });

module.exports = router;
