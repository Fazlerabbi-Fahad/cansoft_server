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
        const productsCollection = client.db('cansoft').collection('products');
        const usersCollection = client.db('cansoft').collection('users');


        app.get('/products', async (req, res) => {
            const query = {};
            const products = await productsCollection.find(query).toArray();
            res.send(products)
        })

        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const products = await productsCollection.findOne(query);
            res.send(products)
        })

        app.put('/products/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const product = req.body;
            const option = { upsert: true };
            const updateDoc = {
                $set: {
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    discountPercentage: product.discountPercentage,
                    rating: product.rating,
                    stock: product.stock,
                    brand: product.brand,
                    category: product.category
                }
            }
            const results = await productsCollection.updateOne(filter, updateDoc, option);
            res.send(results)
        })

        app.get('/users', async (req, res) => {
            const query = {};
            const users = await usersCollection.find(query).toArray();
            res.send(users)
        });

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const users = await usersCollection.findOne(query);
            res.send(users)
        });


        app.post('/users', async (req, res) => {
            const query = req.body;
            const users = await usersCollection.insertOne(query);
            res.send(users);
        })





    }
    finally {

    }

}
run().catch(error => console.log(error))



//server get and port

app.get('/', (req, res) => {
    res.send('CanSoft server is running');
});

app.listen(port, (req, res) => {
    console.log(`CanSoft server is running on ${port}`);
})