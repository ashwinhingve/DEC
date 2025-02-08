// import mysql from "mysql2/promise";

// const db = mysql.createPool({
//   host: "srv1740.hstgr.io",
//   user: "u436222305_auth_db", // Default XAMPP user
//   password: "u436222305_auth_db", // Default XAMPP password (leave empty)
//   database: "nextauth",
// });

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