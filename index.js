require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

const app = express();

// ✅ Allow specific origins for CORS (for security)
const corsOptions = {
    origin: ['http://localhost:3000', 'https://yourfrontend.com'], // Add your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

// ✅ Validate MONGO_URI
if (!process.env.MONGO_URI) {
    console.error('❌ MongoDB URI is not defined in .env');
    process.exit(1);
}

app.use('/api/subscriptions', subscriptionRoutes);

// ✅ Improved MongoDB Connection Handling
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(5000, () => {
            console.log('✅ Server running on port 5000');
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1);
    });
