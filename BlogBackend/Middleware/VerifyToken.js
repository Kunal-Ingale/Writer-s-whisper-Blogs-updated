const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;


    const token = authHeader?.split(' ')[1];

    if (!token) {
       
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
      
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('❌ Token verification failed:', err.message);
        res.status(403).json({ error: 'Token is not valid', details: err.message });
    }
};

module.exports = verifyToken;
