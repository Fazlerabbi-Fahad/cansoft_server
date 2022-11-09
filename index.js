const express = require('express');
const cors = require('cors');

//Add Dotenv
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middleware

app.use(cors());
app.use(express.json());




//server get and port

app.get('/', (req, res) => {
    res.send('PhotoGAL server is running');
});

app.listen(port, (req, res) => {
    console.log(`The server is running on ${port}`);
})