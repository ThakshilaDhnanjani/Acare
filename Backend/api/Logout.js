/*const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const blacklist = new Set(); // Store blacklisted tokens here

// Middleware to check if the token is blacklisted
function isTokenBlacklisted(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (blacklist.has(token)) {
        return res.status(401).json({ message: 'Token is blacklisted. Please sign in again.' });
    }
    next();
}

// Sign-out route
app.post('/signout', (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(400).json({ message: 'No token provided.' });
    }

    // Verify token (if needed for security)
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }
        
        // Add token to blacklist
        blacklist.add(token);
        res.json({ message: 'Signed out successfully.' });
    });
});

// Protected route as an example
app.get('/protected', isTokenBlacklisted, (req, res) => {
    res.json({ message: 'You have access to this route.' });
});

app.listen(3000, () => console.log('Server started on port 3000'));*/
