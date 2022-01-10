const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const express = require('express')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;

// dot env require 
require('dotenv').config();

// using middlewre here
app.use(express.json());
app.use(cors());

// mongodb uri and client here 
const uri = "mongodb+srv://books-react-native:s3u6pYOrf34IrpwC@cluster0.s74ce.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// main run function here 
async function run() {
    try {
        await client.connect();
        const booksReactNative = client.db('books-react-native');
        const booksCollection = booksReactNative.collection('books');
        const ordersCollection = booksReactNative.collection('orders');
        const freeBooks = booksReactNative.collection('freeBooks');

        // all the books get api here 
        app.get('/books', async (req, res) => {
            const cursor = booksCollection.find({});
            const result = await cursor.toArray();
            res.json(result)
        })

        // the match book with the id fro n client here 
        app.get('/book/:id', async (req, res) => {
            const query = { _id: ObjectId(req.params.id) }
            const result = await booksCollection.findOne(query);
            res.json(result);
        })

        // books post api here 
        app.post('/books', async (req, res) => {
            const cursor = await booksCollection.insertOne(req.body);
            res.json(cursor)
        })

        // orders post api here 
        app.post('/orders', async (req, res) => {
            const cursor = await ordersCollection.insertOne(req.body);
            res.json(cursor)
        })

        // orders get api here 
        app.get('/orders/:email', async (req, res) => {
            const cursor = await ordersCollection.find({ email: req.params.email }).toArray();
            res.json(cursor)
        })

        // order delete api here 
        app.delete('/orders/:id', async (req, res) => {
            const query = { _id: ObjectId(req.params.id) }
            const result = await ordersCollection.deleteOne(query)
            res.json(result);
        })

        // free book get api here 
        app.get('/poems', async (req, res) => {
            const cursor = freeBooks.find({});
            const result = await cursor.toArray();
            res.json(result)
        })
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir)

app.listen(port, () => console.log('Runing on port', port))