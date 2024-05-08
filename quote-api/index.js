const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors')

app.use(cors());
// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quote'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// API endpoint to get a random quote
app.get('/api/quote', (req, res) => {
    const query = 'SELECT * FROM quotes ORDER BY RAND() LIMIT 1';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching quote:', err);
            res.status(500).send({ message: 'Error fetching quote' });
        } else {
            res.send(results[0]);
        }
    });
});

// API endpoint to search for quotes by author
app.get('/api/search', (req, res) => {
    const author = req.query.author;
    const query = `SELECT * FROM quotes WHERE author LIKE '%${author}%'`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error searching for quotes:', err);
            res.status(500).send({ message: 'Error searching for quotes' });
        } else {
            res.send(results);
        }
    });
});

// Start server
const port = 3001;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});