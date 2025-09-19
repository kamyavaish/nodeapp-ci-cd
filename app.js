const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 8080;


const uri = 'mongodb://localhost:27017/nodeapp-cicd';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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
    console.log(`Server is running on http://localhost:${PORT}`);
});
