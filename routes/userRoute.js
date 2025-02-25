// routes/user.js
const express = require('express');
const router = express.Router();
const upload = require("../middlewares/multerConfig")

// Import the UserController
const userController = require('../controllers/UserController'); // Ensure this path is correct

// Routes for User operations
router.get('/get_users', userController.getUsers);
router.put('/edit/:id', upload.single('profile_photo'), userController.updateUser); // 'profile_photo' is the field name in the form
router.delete('/delete_user/:id', userController.deleteUser);
router.get('/fetch-profile/:id', userController.getUserById);

// Auth routes
router.post('/signup', userController.createUser);  // Signup Route
router.post('/login', userController.loginUser);    // Login Route (Ensure loginUser is defined)

module.exports = router;
