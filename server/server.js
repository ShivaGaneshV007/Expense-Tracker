// server/app.js

require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const path = require("path"); // Node.js built-in module for working with file paths
const fs = require("fs");   // Node.js built-in module for file system operations

const connectDB = require("./config/db"); // Your database connection function
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// --- START: Code to create the uploads directory ---

// Define the absolute path to your uploads directory
// __dirname is the directory name of the current module (e.g., 'server/')
const uploadsDir = path.join(__dirname, 'uploads');

// Check if the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
    // If it doesn't exist, create it.
    // { recursive: true } ensures that if any parent directories
    // in the path (e.g., 'server/uploads/images') don't exist, they will also be created.
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Created uploads directory.');
} else {
    console.log('Uploads directory already exists.');
}

// --- END: Code to create the uploads directory ---


// Middleware setup
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*", // Allow requests from your client URL, or all (*)
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
        allowedHeaders: ["Content-Type", "Authorization"], // Allowed request headers
    })
);

app.use(express.json()); // Parses incoming JSON request bodies

// Connect to the database
connectDB();

// --- Routes ---
// Mount your API routes with their respective prefixes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Serve static files from the 'uploads' directory
// This makes uploaded files accessible via a URL like http://localhost:5000/uploads/your-image.png
app.use("/uploads", express.static(uploadsDir)); // Use the 'uploadsDir' variable for consistency


// --- Error Handling Middleware (Optional but Recommended) ---
// This is a basic error handler for Express. It catches errors thrown by your routes/middleware.
// You can make this more sophisticated based on your application's needs.
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // If status code is still 200 (default), set to 500
    res.status(statusCode).json({
        message: err.message,
        // In development, you might send the stack trace for more details
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access your server at http://localhost:${PORT}`);
});