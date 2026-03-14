const express = require("express");
const mongoose = require("mongoose");
const connectDB = require('./config/db');
const cors = require("cors");
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const globalLimiter = require('./middleware/ratelimiterMiddleware');


require("dotenv").config();

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Use Helmet early in the middleware stack
app.use(helmet());

// Apply to all routes
app.use(globalLimiter);

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);

app.use('/api/tasks', taskRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Production Awareness
if (process.env.NODE_ENV === 'production') {
    console.log('🚀 Running in Production Mode');
} else {
    console.log('🛠️ Running in Development Mode');
}


// Global Error Handler must be at the bottom
app.use(errorHandler);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`📡 Server is actually listening on port ${PORT}`);
});



