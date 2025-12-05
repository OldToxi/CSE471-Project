const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mh_db_user:Ewc4kcG8KA3Ciih4@cluster7.i3akwjx.mongodb.net/?appName=Cluster7";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Database and Collection references
let userCollection;

// Connect to MongoDB
async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        userCollection = client.db("travel_db").collection("user_info");
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// Routes
app.get('/', (req, res) => {
    res.send('Server is running')
});

// Get all users from MongoDB
app.get('/users', async (req, res) => {
    try {
        const users = await userCollection.find().toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Current active port: ${port}`);
});