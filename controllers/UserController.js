// controllers/UserController.js
const User = require('../model/user');
const bcrypt = require('bcrypt'); // For password hashing

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

exports.createUser = async (req, res) => {
    const { name ,email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
             name,email,password:hashedPassword,
             profile_photo:null,
             });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: "Error creating user :",err });
    }
};


exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const profile_photo = req.file ? req.file.filename : null; // Assuming Multer is used

    try {
        // Check if the user exists
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Prepare an object with only provided fields
        let updateFields = {};

        if (name) updateFields.name = name;
        if (email) updateFields.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.password = hashedPassword;
        }
        if (profile_photo) {
            updateFields.profile_photo = `${req.protocol}://${req.get('host')}/uploads/profile_photo/${req.file.filename}`;
        }

        // Update only provided fields
        await User.update(updateFields, { where: { id } });

        res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error updating user", error: err.message });
    }
};



exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await User.destroy({ where: { id } });
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting user" });
    }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    
    // If user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare entered password with the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // If password is incorrect
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // If login is successful
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Error during login", error: err.message });
  }
};



exports.getUserById = async (req, res) => {
    const { id } = req.params; // Get the user ID from params
  
    try {
      // Find the user by ID
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Return the user data
      res.status(200).json({
        success:true,
        message: 'User retrieved successfully!',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          profile_photo: user.profile_photo,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving user, please try again later.' });
    }
  };
