// server/routes/authRoutes.js
const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");

const upload = require('../middleware/uploadMiddleware');

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

// --- FIX THIS LINE: Change "image" to "profileImage" ---
router.post("/upload-image", upload.single("profileImage"), (req, res) => {
// --- END FIX ---
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded or invalid file type" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] === otp) {
    delete otpStore[email]; // One-time use
    res.json({ message: 'OTP verified' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

module.exports = router;