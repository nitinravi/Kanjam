const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/Users');

// Create an Express app
const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://0.0.0.0:27017/Kanjam')
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server
        app.listen(5000, () => {
            console.log('Server started on port 5000');
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.post('/api/signup', async (req, res) => {
    User.create(req.body)
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            res.status(400).json({ message: error.message });
        })
});

app.post('/api/login', async (req, res) => {
    User.findOne({ username: req.body.username, password: req.body.password })
        .then((user) => {
            if (user) {
                res.json(user);
            } else {
                res.status(400).json({ message: 'Invalid credentials' });
            }
        })
        .catch((error) => {
            res.status(400).json({ message: error.message });
        })
});