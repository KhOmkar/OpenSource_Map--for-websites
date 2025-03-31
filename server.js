require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

console.log('Environment variables:', {
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    // add your MySQL connection details here
    host: '',
    user: '',
    password: '', 
    database: ''
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Register User
app.post('/register-user', (req, res) => {
    const { user_id, name, email, role } = req.body;

    // Validate required fields
    if (!user_id || !name || !email || !role) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // SQL query to insert user
    const insertQuery = `
        INSERT INTO markers 
        (user_id, name, email, role) 
        VALUES (?, ?, ?, ?)
    `;

    db.query(insertQuery, [user_id, name, email, role], (err, result) => {
        if (err) {
            console.error('Registration error:', err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Email already exists' });
            }
            return res.status(500).json({ error: 'Registration failed' });
        }

        res.status(201).json({ 
            message: 'User registered successfully',
            user_id: user_id 
        });
    });
});

// Update User Location
app.post('/update-user-location', (req, res) => {
    const { user_id, latitude, longitude } = req.body;
    
    // Validate required fields
    if (!user_id || !latitude || !longitude) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Update query to set latitude and longitude for specific user
    const updateQuery = `
        UPDATE markers 
        SET latitude = ?, longitude = ? 
        WHERE user_id = ?
    `;

    db.query(updateQuery, [latitude, longitude, user_id], (err, result) => {
        if (err) {
            console.error('Update error:', err);
            return res.status(500).json({ error: 'Database update failed' });
        }

        // Check if any row was actually updated
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ 
            message: 'Location updated successfully',
            user_id: user_id
        });
    });
});

// Get all users
app.get('/users', (req, res) => {
    const query = `
        SELECT user_id, name, latitude, longitude, email as url 
        FROM markers 
        WHERE latitude IS NOT NULL AND longitude IS NOT NULL
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));