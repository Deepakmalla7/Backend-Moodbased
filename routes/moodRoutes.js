const express = require("express");
const { detectMood, getMoodHistory } = require("../controllers/moodController");

const router = express.Router();

router.post("/detect", detectMood);
router.get("/history/:userId", getMoodHistory);

module.exports = router;
