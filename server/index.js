require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

// Import routes
const summaryRoutes = require('./routes/summaryRoutes');
const shareRoutes = require('./routes/shareRoutes');

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/summaries', summaryRoutes);
app.use('/api/shares', shareRoutes);
app.get("/", (req, res) => {
  res.send("Server is up");
});


// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});