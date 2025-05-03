require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConection } = require('./database/config');

// Create express server
const app = express();

// Database
dbConection();

// Cors configuration
app.use(cors());

// Create express server
app.listen(process.env.PORT, () => {
    console.log('server running on server port ' + process.env.PORT);
});

// Routes
app.get('/', (req, res) => {
    res.json({
        ok: true,
        message: 'Hello world'
    })
});
