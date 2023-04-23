const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect to database
connectDB();

app.use(express.json({ extended: false }));

// Define Route
app.use('/', require('./routes/url'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));