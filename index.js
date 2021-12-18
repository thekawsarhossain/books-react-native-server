const { MongoClient } = require('mongodb');
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

        // all the books get api here 
        app.get('/books', async (req, res) => {
            const cursor = booksCollection.find({});
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