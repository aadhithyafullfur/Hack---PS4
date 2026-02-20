const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const leadRoutes = require('./routes/leadRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

// Import ML prediction utilities
const { updateAllLeadsPredictions } = require('./utils/mlPrediction');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/auth-demo')
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

// Start server
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Set up automatic ML prediction updates (default: every 15 minutes, configurable via env)
const ML_PREDICTION_INTERVAL = parseInt(process.env.ML_PREDICTION_INTERVAL) || 900000; // 15 minutes in ms
console.log(`Setting up automatic ML prediction updates (interval: ${ML_PREDICTION_INTERVAL}ms)...`);
setInterval(async () => {
    try {
        console.log(`[${new Date().toISOString()}] Running automatic ML prediction update...`);
        await updateAllLeadsPredictions();
        console.log(`[${new Date().toISOString()}] Automatic ML prediction update completed`);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error in automatic ML prediction update:`, error.message);
    }
}, ML_PREDICTION_INTERVAL);

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});
