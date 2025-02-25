const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./database/db'); // Ensure this path is correct for your db.js file
const User = require('./model/user'); // Ensure this path is correct for your User model
const path = require('path');

// Routes
const userRoute = require('./routes/userRoute');
const songRoutes = require('./routes/songRoutes');
const moodRoutes = require('./routes/moodRoutes');


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // JSON parsing middleware (no need for bodyParser.json() below)
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies

// Routes
app.use('/users', userRoute);
app.use('/moods', moodRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// Use routes for song upload
app.use("/api/", songRoutes);

// Database sync
sequelize.sync()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database sync error:', err));

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
