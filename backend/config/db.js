const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        client.connect()
            .then((client) => {
                dbConnection = client.db();
                return cb();
            })
            .catch(err => {
                console.log(err);
                return cb(err);
            });
    },
    getDb: () => dbConnection
};
