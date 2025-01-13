const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json()); // Parses JSON request bodies
app.use(cors());         // Allows frontend-backend communication

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/blogDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/blogs', blogRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
