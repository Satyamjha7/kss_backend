require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

const app = express();
const corsOptions = {
    origin: ['http://localhost:3000', 'https://kosisevasadan.org/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

if (!process.env.MONGO_URI) {
    console.error('❌ MongoDB URI is not defined in .env');
    process.exit(1);
}

app.use('/api/subscriptions', subscriptionRoutes);

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
