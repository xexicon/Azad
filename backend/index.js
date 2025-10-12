require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes imports
const bookNowRoute = require('./routes/bookNowRoute');
const contactUsRoute = require('./routes/contactUsRoutes');
const newsLetterRoute = require('./routes/newsLetterRoutes');


const app = express();

// for parsing application/json
app.use(express.json());

// cors
const allowedOrigins = [
  'http://localhost:5173', 'https://azad-frontend.vercel.app', 'https://azad.ocullospace.com'
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// middleware Logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api', bookNowRoute);
app.use('/api', contactUsRoute);
app.use('/api', newsLetterRoute);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
