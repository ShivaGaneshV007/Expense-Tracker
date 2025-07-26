
const express = require("express");
const { protect } = require("../middleware/authMiddleware"); // Imports authentication middleware
const { getDashboardData } = require("../controllers/dashboardController"); // Imports dashboard data controller function

const router = express.Router(); // Creates an Express router instance

// Defines a GET route for the dashboard
// It uses the 'protect' middleware to ensure the user is authenticated
// then calls the 'getDashboardData' function to fetch and send dashboard data
router.get("/", protect, getDashboardData);

module.exports = router; // Exports the router to be used in the main application file