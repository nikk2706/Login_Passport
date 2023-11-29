// JWT Token
const jwt = require('jsonwebtoken');
const secretKey = 'secretkey';

const generateToken = (user) => {
    return jwt.sign({ useId: user.id }, secretKey, { expiresIn: '300s' });  
}

const auth_Token = (req, res, next) => {
    const token = req.header('authorization');
    if (!token) {
        return res.status(401).send("Token not found")
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token.");
    }
}
module.exports = { generateToken, auth_Token };
