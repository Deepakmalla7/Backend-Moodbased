const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100), // Matches VARCHAR(100)
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255), // Matches VARCHAR(255)
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255), // Matches VARCHAR(255)
        allowNull: false
    }
    ,   profile_photo: {
        type: DataTypes.STRING, // This will store the file path/filename
        allowNull: true, // Photo is optional
      },
}, {
    timestamps: true // Enables createdAt & updatedAt auto-management
});



module.exports = User;
