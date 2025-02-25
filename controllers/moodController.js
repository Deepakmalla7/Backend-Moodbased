const Mood = require("../model/Mood");

exports.detectMood = async (req, res) => {
    const { userId, mood } = req.body;
    const moodEntry = await Mood.create({ userId, mood });
    res.status(201).json(moodEntry);
};

exports.getMoodHistory = async (req, res) => {
    const moods = await Mood.findAll({ where: { userId: req.params.userId } });
    res.json(moods);
};
// module.exports = { detectMood, getMoodHistory };