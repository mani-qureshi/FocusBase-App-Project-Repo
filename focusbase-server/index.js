const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorMiddleware');
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Global Error Handler must be at the bottom
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));

