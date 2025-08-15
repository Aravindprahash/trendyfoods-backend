const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const productRoutes = require("./routes/ProductRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS Setup
app.use(cors({
    origin: "*", // Allow all origins for now
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Backend is working 🚀");
});

// Products Route
app.use("/api/products", productRoutes);

// MongoDB Connect & Start Server
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
});
