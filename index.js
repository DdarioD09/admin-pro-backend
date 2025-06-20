require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path')

const { dbConection } = require('./database/config');

// Create express server
const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(cors());


// Public folder
app.use(express.static('public'));

// Read and parse of the body
app.use(express.json());

// Database
dbConection();

// Routes
// app.use('/api/users', require('./routes/user'));
app.use('/api/users', require('./routes/user'));
app.use('/api/hospitals', require('./routes/hospital'));
app.use('/api/doctors', require('./routes/doctor'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/login/google', require('./routes/auth'));
app.use('/api/all', require('./routes/search'));
app.use('/api/upload', require('./routes/upload-file'));

// SPA Fallback: serve index.html for any non-API route
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create express server
app.listen(PORT, () => {
    console.log('server running on server port ' + process.env.PORT);
});