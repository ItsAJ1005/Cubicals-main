const jwt = require('jsonwebtoken');

class AuthMiddleware {
    verifyToken(req, res, next) {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
            req.userId = decoded._id;
            req.role = decoded.role;
            next();
        } catch (error) {
            return res.status(403).json({ message: 'Invalid token' });
        }
    }
}

module.exports = new AuthMiddleware();
