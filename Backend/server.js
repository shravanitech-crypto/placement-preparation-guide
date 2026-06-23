// Load environment variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Import Routes
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const aptitudeRoutes = require("./routes/aptitudeTopics");
const aiRoutes = require("./routes/aiRoutes");   // ⭐ NEW

app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/aptitude", aptitudeRoutes);
app.use("/api/ai", aiRoutes);   // ⭐ NEW

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.log("❌ MongoDB Connection Error:");
    console.log(err);
});

// ✅ Test Route
app.get("/", (req, res) => {
    res.send("🚀 Server is running");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});