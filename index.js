const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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


async function run() {
    try {
        const servicesCollection = client.db('photoGal').collection('services');

        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray();
            const servicesReverse = await services.reverse();
            const limitedServices = await servicesReverse.slice(0, 3)
            res.send({ servicesReverse, limitedServices })
        })

        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const services = await servicesCollection.findOne(query);
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