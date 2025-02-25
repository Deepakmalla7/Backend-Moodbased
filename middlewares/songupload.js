const multer = require("multer");
const path = require("path");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify where the file should be saved
  },
  filename: (req, file, cb) => {
    // Use the current timestamp as the filename to avoid name collisions
    cb(null, Date.now() + path.extname(file.originalname)); // .extname() to keep the file extension
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

// Export the upload middleware for use in routes
module.exports = upload;
