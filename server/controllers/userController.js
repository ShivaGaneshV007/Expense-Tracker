// controllers/userController.js

const User = require('../models/User');

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get fullName from the request body
    user.fullName = req.body.fullName || user.fullName;

    // Check if a new file was uploaded by multer
    if (req.file) {
      // Construct the URL path to the image
      // Example: '/uploads/profilePic-1678886400000.png'
      user.profileImageUrl = `/${req.file.path.replace(/\\/g, "/")}`; // Normalize path for web
    }

    const updatedUser = await user.save();

    // Send back the updated user data (without password)
    res.json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profileImageUrl: updatedUser.profileImageUrl,
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  updateUserProfile,
};