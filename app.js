require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8080;

// MongoDB connection using environment variables
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DATABASE = process.env.MONGODB_DATABASE;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: MONGODB_DATABASE
})
.then(() => console.log("Successfully connected to MongoDB"))
.catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        message: "Health Check !!",
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
