const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User'); 

const server = express();
server.use(cors());
server.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://sayalids2107:Sayalids2107@sayali.yriwle5.mongodb.net/?retryWrites=true&w=majority&appName=Sayali', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Database Connected'))
.catch((err) => console.error('❌ DB Connection Error:', err));

// Registration Route
server.post('/register', async (req, res) => {
    try {
        const { fullname, username, age, password } = req.body;

        const userExist = await User.findOne({ username });
        if (userExist) {
            return res.json({
                status: false,
                message: 'User already exists'
            });
        }

        const newUser = new User({ fullname, username, age, password });
        await newUser.save();

        res.json({
            status: true,
            message: 'Registered successfully'
        });

    } catch (err) {
        res.json({
            status: false,
            message: `Error: ${err.message}`
        });
    }
});

// Login Route
server.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.json({
                status: false,
                message: 'User not found'
            });
        }

        if (password !== user.password) {
            return res.json({
                status: false,
                message: 'Incorrect password'
            });
        }

        res.json({
            status: true,
            message: 'Login successful'
        });

    } catch (err) {
        res.json({
            status: false,
            message: `Error: ${err.message}`
        });
    }
});

// Start the server
server.listen(8055, () => {
    console.log('🚀 Server started at http://localhost:8055');
});
