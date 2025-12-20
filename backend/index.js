const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require("./config/db");

const PORT = process.env.PORT||5000;

const app = express();

app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

app.get('/',(req,res) => {
    res.send('Auth Backend is running ');
});

app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`)
});