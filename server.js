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
    password: 'Omkar@23-24', // Change if needed
    database: 'agritechecom'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL');
        // Create table if it doesn't exist
        db.query(`
            CREATE TABLE IF NOT EXISTS farmers (
                farmer_id INT AUTO_INCREMENT PRIMARY KEY,
                farm_name VARCHAR(255) NOT NULL,
                latitude DECIMAL(10, 8) NOT NULL,
                longitude DECIMAL(11, 8) NOT NULL,
                redirect_page VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `, (err) => {
            if (err) {
                console.error('Error creating table:', err);
            } else {
                console.log('Farmers table is ready');
            }
        });
    }
});

// API: Get all markers
app.get('/markers', (req, res) => {
    db.query('SELECT farmer_id, farm_name, latitude, longitude, redirect_page FROM farmers', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// API: Add a new marker
app.post('/farm-marker', (req, res) => {
    const { farm_name, latitude, longitude, redirect_page } = req.body;
    if (!farm_name || !latitude || !longitude || !redirect_page) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    db.query('INSERT INTO farmers (farm_name, latitude, longitude, redirect_page) VALUES (?, ?, ?, ?)', 
    [farm_name, latitude, longitude, redirect_page], 
    (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ 
            id: result.insertId, 
            farm_name, 
            latitude, 
            longitude, 
            redirect_page 
        });
    });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));