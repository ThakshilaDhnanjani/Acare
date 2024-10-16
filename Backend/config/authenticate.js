/*const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded.user; // Changed to `req.user` for better structure
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authenticate;*/



const { User } = require("./models/Hospital_login");

const Auth = (req, res, next) => {
    let token = req.header("x-auth-token") || req.header("Authorization");

    if(token) {
        if(token.startsWith("Bearer")) {
            token = token.slice(7, token.length);
        }

        User.findByToken(token, (err, user) => {
            if(err) throw err;

            if(!user) {
                res.status(400).json({
                    success: false,
                    message: "No valid token provided"
                });
            }

            req.token = token;
            req.user = username;
            
            next();
        });
    } else {
        res.status(400).json({
            success: false,
            message: "No valid token provided"
        });
    }
}

module.exports = authenticate;