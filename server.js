require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change if needed
    password: '', // Change if needed
    database: 'mydbs'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// API: Get all markers
app.get('/markers', (req, res) => {
    db.query('SELECT * FROM markers', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// API: Add a new marker
app.post('/markers', (req, res) => {
    const { name, latitude, longitude, url } = req.body;
    if (!name || !latitude || !longitude || !url) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    db.query('INSERT INTO markers (name, latitude, longitude, url) VALUES (?, ?, ?, ?)', 
    [name, latitude, longitude, url], 
    (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, name, latitude, longitude, url });
    });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
