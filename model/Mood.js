const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Mood = sequelize.define("Mood", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    mood: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Mood;
