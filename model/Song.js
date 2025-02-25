// models/song.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db'); // Make sure db.js path is correct

const Song = sequelize.define('Song', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false
  },
  album: {
    type: DataTypes.STRING,
    defaultValue: 'Unknown Album'
  },
  genre: {
    type: DataTypes.STRING,
    defaultValue: 'Unknown Genre'
  },
  mood: {
    type: DataTypes.STRING,
    defaultValue: 'Neutral'
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Song;  // Ensure you are exporting it correctly
