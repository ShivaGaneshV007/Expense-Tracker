// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { updateUserProfile } = require('../controllers/userController');

// Change the import to pull out the 'protect' function
const { protect } = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

router.put(
  '/profile',
  protect, // Use 'protect' here instead of 'authMiddleware'
  upload.single('profilePic'), 
  updateUserProfile
);

module.exports = router;