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

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1bviphv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


function run() {
    try {
        const servicesCollection = client.db('photoGal').collection('services');

        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = servicesCollection.find(query)
            const services = await cursor.toArray();
            res.send(services)
        })

    }
    finally {

    }

}
run().catch(error => console.log(error))



//server get and port

app.get('/', (req, res) => {
    res.send('PhotoGAL server is running');
});

app.listen(port, (req, res) => {
    console.log(`The server is running on ${port}`);
})