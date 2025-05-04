require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConection } = require('./database/config');

// Create express server
const app = express();

// CORS configuration
app.use(cors());

// Read and parse of the body
app.use(express.json());

// Database
dbConection();

// Create express server
app.listen(process.env.PORT, () => {
    console.log('server running on server port ' + process.env.PORT);
});

// Routes
app.use('/api/users', require('./routes/user-routes'))

