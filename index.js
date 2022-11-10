const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//Add Dotenv
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middleware

app.use(cors());
app.use(express.json());


// function verifyJwt(req, res, next) {
//     const authHeader = req.headers.authorization;
//     console.log(authHeader);
//     if (!authHeader) {
//         res.status(401).send({ message: 'unauthorized access' })
//     }

//     const token = authHeader;
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
//         if (err) {
//             res.status(401).send({ message: 'unauthorized access' })
//         }
//         req.decoded = decoded;
//         next()
//     })

// }

//connect mongodb 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1bviphv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const servicesCollection = client.db('photoGal').collection('services');
        const reviewsCollection = client.db('photoGal').collection('reviews');

        // app.post('/jwt', (req, res) => {
        //     const user = req.body;
        //     const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10days' })
        //     res.send({ token })
        // })

        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray();
            const servicesReverse = await services.reverse();
            const limitedServices = await servicesReverse.slice(0, 3)
            res.send({ servicesReverse, limitedServices })
        })

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const services = await servicesCollection.findOne(query);
            res.send(services)
        })

        app.post('/services', async (req, res) => {
            const query = req.body;
            const result = await servicesCollection.insertOne(query);
            res.send(result);
        })


        //reviewsCollection
        app.get('/reviews', async (req, res) => {
            // const decoded = req.decoded;
            // if (decoded.email !== req.query.email) {
            //     res.status(403).send({ message: 'unauthorized access' })
            // }

            // let query = {};
            // if (req.query.email) {
            //     query = {
            //         email: req.query.email
            //     }
            // }
            const query = {};
            const cursor = reviewsCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        })
        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const cursor = reviewsCollection.filter(query => id === _id);
            const results = await cursor.toArray();
            res.send(results)
        })


        app.post('/reviews', async (req, res) => {
            const query = req.body;
            const result = await reviewsCollection.insertOne(query);
            res.send(result)
        })

        app.delete('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await reviewsCollection.deleteOne(query);
            res.send(result);

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