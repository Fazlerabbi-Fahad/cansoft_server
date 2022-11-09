const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');

//Add Dotenv
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middleware

app.use(cors());
app.use(express.json());

//connect mongodb 

const uri = "mongodb+srv://<username>:<password>@cluster0.1bviphv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});



//server get and port

app.get('/', (req, res) => {
    res.send('PhotoGAL server is running');
});

app.listen(port, (req, res) => {
    console.log(`The server is running on ${port}`);
})