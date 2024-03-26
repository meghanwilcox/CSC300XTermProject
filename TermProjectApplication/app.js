const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const app = express();

app.use(cors());
app.use(bodyParser.json());

//getDBConnection: a function to establish a connection with the database
async function getDBConnection() {
    const db = await sqlite.open({
    filename: 'data/spartanSellersDatabase.db',
    driver: sqlite3.Database
    });
    return db;
}

// Root endpoint
app.get('/', function(req, res) {
    res.send('Hello World!');
});

// Start the server
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
