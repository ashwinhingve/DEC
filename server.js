
// export default db;
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db/mongoose');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Connect to Database
connectDB();